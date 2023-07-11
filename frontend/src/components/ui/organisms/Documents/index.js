import React, { useEffect, useState, lazy, Suspense } from "react";
import "./style.scss";
import useRequest from "../../../../helpers/hooks/useRequest";
const DocumentList = lazy(() => import("../../molecules/DocumentList"));

const Documents = () => {
  const [sendPost, sendGet] = useRequest();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    sendGet("/v1/document/getAll", handleDocuments);
  }, []);

  const handleDocuments = (data, error) => {
    if (error !== null) {
    } else {
      setDocuments(data?.data);
    }
  };
  return (
    <div className="documents-wrapper">
      <div className="document-content-wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <DocumentList documents={documents} />
        </Suspense>
      </div>
    </div>
  );
};

export default Documents;
