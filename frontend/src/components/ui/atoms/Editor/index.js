import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Editor as TextEditor } from "@tinymce/tinymce-react";
import "./style.scss";
import { useParams } from "react-router-dom";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { io } from "socket.io-client";
import useRequest from "../../../../helpers/hooks/useRequest";
import { SERVER_URL } from "../../../../config/config";
// import { handleJoinedRoom } from "../../../../socket/events";
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block", "clean"],
  ["clean"],
];

const Editor = ({ doc, _id, onlineCollaborators, setOnlineCollaborators }) => {
  const [sendPost] = useRequest();
  const [quill, setQuill] = useState();
  const [quillContents, setQuillContents] = useState(null);
  const quillContentsRef = useRef(quillContents);
  const [socket, setSocket] = useState();
  const [joinedRoom, setJoinedRoom] = useState(false);
  const docRef = useRef(doc);
  const onlineCollRef = useRef(onlineCollaborators);

  const handleJoinedRoom = (data) => {
    if (doc?.onlineCollaborators) {
      setOnlineCollaborators(doc?.onlineCollaborators);
    }
  };

  const handleLeavingRoom = (data) => {
    const index = onlineCollRef.current.findIndex((item) => item === data);
    if (index > -1) {
      const arrCopy = [...onlineCollRef.current];
      arrCopy.splice(index, 1);
      setOnlineCollaborators(arrCopy);
    }
  };

  const handleNewUserJoined = (data) => {
    setOnlineCollaborators((prev) => [...prev, data?.userId]);
  };

  const resolver = (data, error) => {
    if (error) {
      console.log(error);
      return;
    }
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    setQuill(q);
  }, []);

  useEffect(() => {
    docRef.current = doc;
    if (!quill) return;
    quill.setContents(doc?.data[0]?.document_data?.ops);
    if (!joinedRoom) {
      socket.emit("joinRoom", { documentId: doc?._id, userId: _id });
      setJoinedRoom(true);
    }
    if (doc?.onlineCollaborators) {
      setOnlineCollaborators(doc?.onlineCollaborators);
    }
  }, [doc]);

  useEffect(() => {
    quillContentsRef.current = quillContents;
  }, [quillContents]);

  useEffect(() => {
    const s = io(SERVER_URL);
    setSocket(s);
    return () => {
      s.disconnect();
      sendPost(
        "/v1/document/saveDocument",
        {
          name: docRef?.current?.name,
          documentId: docRef?.current?._id,
          version: docRef?.current?.data[0].version,
          data: quillContentsRef?.current,
        },
        resolver
      );
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handleQuill = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handleQuill);

    socket.on("joinedRoom", handleJoinedRoom);

    socket.on("newUserJoined", handleNewUserJoined);

    socket.on("leavingRoom", handleLeavingRoom);

    return () => {
      socket.off("receive-changes", handleQuill);
      socket.off("joinedRoom", handleJoinedRoom);
      socket.off("newUserJoined", handleNewUserJoined);
      socket.off("leavingRoom", handleLeavingRoom);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handleQuill = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
      setQuillContents(quill.getContents());
    };
    quill.on("text-change", handleQuill);

    return () => {
      quill.off("text-change", handleQuill);
    };
  }, [socket, quill]);

  useEffect(() => {
    onlineCollRef.current = onlineCollaborators;
  }, [onlineCollaborators]);

  return (
    <>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
};

export default Editor;
