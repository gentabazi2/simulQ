import React, { useEffect, useState } from "react";
import "./style.scss";
import useRequest from "../../../../helpers/hooks/useRequest";
import DocumentList from "../../molecules/DocumentList";

const SharedDocuments = () => {
  const [sendPost, sendGet] = useRequest();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    sendGet("/v1/document/getAll/shared", handleDocuments);
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
        <DocumentList documents={documents} />
      </div>
    </div>
  );
};

export default SharedDocuments;
