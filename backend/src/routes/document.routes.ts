import { Router } from 'express';
import { body } from 'express-validator';
import * as controller from '../controllers/document.controller';
import auth from '../middlewares/auth';
import cache from '../middlewares/cache';
const router = Router();

router.post('/create',auth(), controller.createDocument);
router.get('/getAll',auth(), controller.getAllDocuments);
router.get('/get/:document', auth(), cache(), controller.getDocument);
router.get('/getCollaborators/:document',auth(),controller.getCollaborators)
router.get('/getAll/shared',auth(),controller.getAllDocumentsShared)
router.post('/addCollaborator', auth(), controller.addCollaborator);
router.post('/editDocument',auth(),controller.editDocument);
router.post('/saveDocument',auth(),controller.saveDocument)


export default router;