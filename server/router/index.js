import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth-moddleware.js';

const router = new Router();

router.post(
    '/registration',
    body('nickname').isLength({ min: 3, max: 10 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 25 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

export default router;
