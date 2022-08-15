import { Router } from "express";
import passport from 'passport';
import AuthController from "../controller/auth"


const router = Router()

const passportOptions = { badRequestMessage: 'Falta username / password' };
router.post('/login', passport.authenticate('login', passportOptions), AuthController.login)

router.post('/logout', AuthController.logout)


export default router
