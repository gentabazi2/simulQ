import React, { Suspense, lazy } from "react";
import "./style.scss";
// import DocumentItem from "../../atoms/DocumentItem";
const DocumentItem = lazy(() => import("../../atoms/DocumentItem"));
const DocumentList = ({ documents }) => {
  return (
    <div className="document-list">
      <Suspense fallback={<div>Loading...</div>}>
        {documents?.map((document, key) => (
          <DocumentItem key={key} name={document.name} id={document._id} />
        ))}
        <DocumentItem create={true} name="New Document" />
      </Suspense>
    </div>
  );
};

export default DocumentList;
