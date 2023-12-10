import React, { useEffect, useState } from "react";
import "./style.scss";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import useRequest from "../../../../helpers/hooks/useRequest";
import { useNavigate } from "react-router-dom";
import offlineIcon from "../../../../assets/images/offline.png";
import onlineIcon from "../../../../assets/images/online.png";
import { getUserData } from "../../../../helpers/auth/getUserData";

const SideNavBar = ({ documentData, setDocumentData, onlineCollaborators }) => {
  const navigator = useNavigate();
  const user = getUserData();
  const [name, setName] = useState("");
  const [newCollaborator, setNewCollaborator] = useState("");
  const [collaboratorsTaken, setCollaboratorsTaken] = useState(false);
  const [collaborators, setCollaborators] = useState(null);
  const [owner, setOwner] = useState(null);
  const [sendPost, sendGet] = useRequest();
  const resolver = (data, error) => {
    if (error) {
    } else {
      if (data?.data?.collaborators && data?.data?.owner) {
        setCollaborators(data?.data?.collaborators);
        setOwner(data?.data?.owner);
        setCollaboratorsTaken(true);
        setNewCollaborator("");
      }
    }
  };
  const onNameChange = (name) => {
    if (!name) return;
    const editedDoc = { ...documentData };
    editedDoc.name = name;
    setDocumentData({ ...editedDoc });
  };
  const onCollaboratorAdded = (email) => {
    if (!email) return;
    const editedDoc = { ...documentData };
    setNewCollaborator(email);
    editedDoc.collaborators.push(email);
    setDocumentData({ ...editedDoc });
  };

  useEffect(() => {}, [onlineCollaborators, collaborators]);

  useEffect(() => {
    setName(documentData?.name);
    if (!collaboratorsTaken && documentData) {
      sendGet(`/v1/document/getCollaborators/${documentData?._id}`, resolver);
    }
    // eslint-disable-next-line
  }, [documentData]);

  return (
    <div className="side-nav-bar">
      <Button
        click={() => {
          navigator("/documents");
        }}
        text="Back"
        classname="side-nav-btn back"
      />
      <p>Name</p>
      <Input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        handleChange={(e) => onNameChange(e.target.value)}
      />
      <Button
        click={() => {
          sendPost(
            "/v1/document/editDocument",
            { name, documentId: documentData?._id },
            resolver
          );
        }}
        text="Save Name"
        classname="side-nav-btn"
      />

      {owner && (
        <p>Owner: {owner._id === user?._id ? "You" : owner.full_name}</p>
      )}
      <div className="collaborators-list">
        <p>Collaborators</p>
        {onlineCollaborators &&
          collaborators?.map((collaborator) => (
            <div key={collaborator._id} className="collaborator-item">
              <div className="collaborator-name">
                <p>
                  {collaborator._id === user?._id
                    ? collaborator.full_name + " (You)"
                    : collaborator.full_name}
                </p>
              </div>
              <div className="collaborator-toolbox">
                <img
                  alt=""
                  src={
                    user._id === collaborator._id ||
                    onlineCollaborators?.includes(collaborator._id)
                      ? onlineIcon
                      : offlineIcon
                  }
                  width={20}
                  height={20}
                />
                <p>-</p>
              </div>
            </div>
          ))}
      </div>
      <p>Add collaborator</p>
      <Input
        type="text"
        placeholder="Add Collaborator"
        name="collaborator"
        value={newCollaborator}
        handleChange={(e) => onCollaboratorAdded(e.target.value)}
      />
      <Button
        click={() => {
          sendPost(
            "/v1/document/addCollaborator",
            { collab_email: newCollaborator, documentId: documentData?._id },
            resolver
          );
        }}
        text="Add collaborator"
        classname="side-nav-btn"
      />
    </div>
  );
};

export default SideNavBar;
