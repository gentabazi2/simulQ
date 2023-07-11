import { NextFunction, Request, Response } from "express";
import { ModifiedExpressRequest } from "../declarations/auth";
import * as service from "../services/document.service";
export const createDocument = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, content } = req.body;
    const { _id } = req.payload;
    const currUser = await service.getUser(_id);
    const document = await service.createDocument({ name }, currUser, _id);
    res.json(document);
  } catch (error) {
    next(error);
  }
};

export const editDocument = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, documentId } = req.body;
    const { _id } = req.payload;
    const document = await service.editDocument(name, documentId, _id);
    res.json(document);
  } catch (error) {
    next(error);
  }
};

export const saveDocument = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, documentId, version, data } = req.body;
    const response = await service.saveDocument(
      name,
      documentId,
      version,
      data
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllDocuments = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.payload;
    const userDocuments = await service.getDocuments(_id);
    res.json(userDocuments);
  } catch (error) {
    next(error);
  }
};

export const getAllDocumentsShared = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.payload;
    const userDocuments = await service.getDocumentsSharedWith(_id);
    res.json(userDocuments);
  } catch (error) {
    next(error);
  }
};
//getCollaborators

export const getCollaborators = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.payload;
    const { document } = req.params;
    const collaborators = await service.getCollaborators(document);
    // const response = await service.addCollaborator(_id, collab_email, documentId);
    res.json(collaborators);
  } catch (error) {
    next(error);
  }
};

export const addCollaborator = async (
  req: ModifiedExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.payload;
    const { collab_email, documentId } = req.body;
    const response = await service.addCollaborator(
      _id,
      collab_email,
      documentId
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getDocument = async (
  req: ModifiedExpressRequest,
  res: Response | any,
  next: NextFunction
) => {
  try {
    const { document } = req.params;
    const documentFound = await service.getDocument(document);
    res.json(documentFound);
  } catch (error) {
    next(error);
  }
};
