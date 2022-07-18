import { Router } from "express";
import {save, get, createOrder} from '../controller/user'
import { authMiddleware } from "../middleware";


const router = Router()

router.get('/', get)
router.get('/create-order', authMiddleware, createOrder)
router.get('/:id', get)
router.post('/', save)


export default router