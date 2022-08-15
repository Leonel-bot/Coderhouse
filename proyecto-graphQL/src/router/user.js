import { Router } from "express";
import UserController from "../controller/user"
import { authMiddleware } from "../middleware";


const router = Router()

router.get('/create-order', authMiddleware, UserController.createOrder)
router.get('/', UserController.get)
router.get('/:id', UserController.get)
router.post('/', UserController.save)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)


export default router