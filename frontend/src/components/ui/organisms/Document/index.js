import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  Suspense,
  lazy,
} from "react";
import "./style.scss";
import DocumentContent from "../../molecules/DocumentContent";
import { useParams } from "react-router-dom";
import useRequest from "../../../../helpers/hooks/useRequest";
import { getUserData } from "../../../../helpers/auth/getUserData";
const SideNavBar = lazy(() => import("../../molecules/SideNavBar"));
const Document = () => {
  const { document } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [onlineCollaborators, setOnlineCollaborators] = useState([]);
  const [setPost, sendGet] = useRequest();
  const { _id } = getUserData();
  const resolver = async (data, error) => {
    if (error !== null) {
      return;
    }
    const docData = await data?.data;
    setDocumentData(docData);
  };

  useEffect(() => {
    if (document !== "create") {
      sendGet(`/v1/document/get/${document}`, resolver);
    }
  }, []);

  useEffect(() => {
  }, [documentData]);

  return (
    <div className="document-page">
      <Suspense fallback={<div>Loading...</div>}>
        <SideNavBar
          onlineCollaborators={onlineCollaborators}
          setOnlineCollaborators={setOnlineCollaborators}
          documentData={documentData}
          setDocumentData={setDocumentData}
        />
      </Suspense>
      <div className="document-content">
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentContent
            onlineCollaborators={onlineCollaborators}
            setOnlineCollaborators={setOnlineCollaborators}
            document={documentData}
            onChangeDocument={() => {}}
            _id={_id}
          />
        </Suspense>
      </div>
    </div>
  );
};

function Loading() {
  return <h2>🌀 Loading...</h2>;
}

export default Document;
