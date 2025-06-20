import express from 'express';
import { getUserProfile, userLogin, userRegister } from '../controllers/UserController.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/:id', getUserProfile);

export default router;