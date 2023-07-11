import React from "react";
import "./style.scss";
import documentImage from "../../../../assets/images/docs.png";
import newDocumentImage from "../../../../assets/images/new-document.png";
import { useNavigate } from "react-router-dom";
import useRequest from "../../../../helpers/hooks/useRequest";

const DocumentItem = ({ create, name, id }) => {
  const navigate = useNavigate();
  const [sendPost] = useRequest();
  const resolveData = (data, error) => {
    if (error !== null) {
      console.log("error", error);
    } else {
      navigate(`/document/${data?.data?.document?._id}`);
    }
  };
  const handleNavigate = () => {
    if (!create) {
      navigate(`/document/${id}`);
    } else {
      sendPost(
        "/v1/document/create",
        { name: `Untitled-${Date.now()}` },
        resolveData
      );
    }
  };
  return (
    <div className="document-item" onClick={() => handleNavigate()}>
      <div className="document-image">
        {!create ? (
          <img src={documentImage} alt="document" />
        ) : (
          <img src={newDocumentImage} alt="document" />
        )}
      </div>
      <div className="document-name">{name}</div>
    </div>
  );
};

export default DocumentItem;
