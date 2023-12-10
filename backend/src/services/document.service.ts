import mongoose from "mongoose";
import config from "../configs/index";
import { FieldError } from "../handlers/errors/fieldError.error";
import { CustomError } from "../handlers/errors/custom.error";
import user, { IUser } from "../models/user";
import document, { IDocument } from "../models/document";
const User = mongoose.model<IUser>("User");
const Document = mongoose.model<IDocument>("Document");

export const getUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  return user;
};

export const createDocument = async (
  docData: any,
  user: IUser,
  userId: string
) => {
  const document = await Document.create({ name: docData.name, user: userId });
  document?.data.push({
    version: "1",
    document_data: "",
    date_created: Date.now().toString(),
    date_modified: Date.now().toString(),
  });
  await document.save();
  user.documents.push(document);
  await user.save();
  return {
    document,
  };
};
export const saveDocument = async (
  name: string,
  documentId: string,
  version: string,
  data: any
) => {
  const document = await getDocument(documentId);
  if (data !== null) {
    const docData = document.data;
    const curVer = docData[0];
    curVer.document_data = data;
    docData[0] = curVer;
    document.data = docData;
    document.save();
  }
  return document;
};

export const getDocuments = async (userId: string) => {
  const user = await User.findById(userId).populate("documents");
  return user?.documents;
};

export const getDocumentsSharedWith = async (userId: string) => {
  const user = await User.findById(userId).populate("sharedWith");
  return user?.sharedWith;
};

export const getDocument = async (documentId: string) => {
  const document = await Document.findById(documentId);
  if (!document) throw new Error("Document not found!");
  return document;
};

export const addCollaborator = async (
  userId: string,
  collab_email: string,
  documentId: string
) => {
  const collaborator = await User.findOne({ email: collab_email });
  if (!collaborator)
    throw new Error(
      "Collaborator not found, make sure you typed their email right!"
    );
  const document = await getDocument(documentId);
  document.collaborators.push(collaborator._id);
  collaborator.sharedWith.push(document);
  await document.save();
  await collaborator.save();
  const response = await getCollaborators(document._id);
  return response;
};

export const getCollaborators = async (document: string) => {
  const doc = await getDocument(document);
  const collaboratorsIds = doc.collaborators;
  const owner = await getUser(doc.user.toString());
  const ownerObj = {
    email: owner.email,
    full_name: owner.full_name,
    _id: owner._id,
  };
  if (collaboratorsIds.length > 0) {
    const userObjects = await User.find({ _id: { $in: collaboratorsIds } });
    const mapped = userObjects.map((userObject) => {
      return {
        email: userObject.email,
        full_name: userObject.full_name,
        _id: userObject._id,
      };
    });
    return { collaborators: mapped, owner: ownerObj };
  }
  return { collaborators: [], owner: ownerObj };
};

const hasAccess = (userId: string, document: IDocument) => {
  for (let i = 0; i < document.collaborators.length; i++) {
    if (userId === document.collaborators[i].toString()) {
      return true;
    }
  }
  return userId === document.user.toString();
};

export const editDocument = async (
  name: string,
  documentId: string,
  userId: string
) => {
  const document = await getDocument(documentId);
  if (!hasAccess(userId, document))
    throw new Error("No access to this document");
  document.name = name;
  document.save();
  return document;
};
