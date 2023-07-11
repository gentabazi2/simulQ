import React, { useEffect } from "react";
import "./style.scss";
import Editor from "../../atoms/Editor";

const DocumentContent = ({
  onChangeDocument,
  document,
  _id,
  onlineCollaborators,
  setOnlineCollaborators,
}) => {
  return (
    <div className="editor-container">
      <Editor
        doc={document}
        onChangeDocument={onChangeDocument}
        _id={_id}
        onlineCollaborators={onlineCollaborators}
        setOnlineCollaborators={setOnlineCollaborators}
      />
    </div>
  );
};

export default DocumentContent;
