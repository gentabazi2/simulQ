import { Router } from 'express';
import { body } from 'express-validator';
import checkValidation from '../handlers/checkValidation';
import * as controller from '../controllers/auth.controller';
import auth from '../middlewares/auth';
const router = Router();

router.post(
  '/login',
  body('email', 'Valid email is required').isEmail().notEmpty(),
  body('password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }),
  checkValidation,
  controller.login
);

router.post(
  '/register',
  body('password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }),
  body('full_name', 'Full name is required').notEmpty(),
  body('email', 'Valid email is required').isEmail().notEmpty(),
  checkValidation,
  controller.register
);

router.post(
  '/change_password',
  body('old_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }),
  body('new_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }),
  checkValidation,
  auth(),
  controller.changePassword
);
router.post(
  '/send_resetCode',
  body('email', 'Enter valid Email').notEmpty(),
  // checkValidation,  
  controller.sendResetCode
);
router.post(
  '/reset_password',
  body('resetCode', 'Enter Reset Code Sent to your Email').notEmpty(),
  body('email', 'Enter valid Email').notEmpty(),
  body('new_password', 'Password must be atleast 8 character')
    .notEmpty()
    .isLength({ min: 8 }),
  // checkValidation,
  controller.resetPassword
);
export default router;
