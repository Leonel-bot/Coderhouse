import { Router } from "express";
import productsRouter from '../router/products'
import cartsRouter from '../router/carts'
import userRouter from '../router/user'
import authRouter from "../router/auth"

const router = Router()

router.use('/product', productsRouter)
router.use('/cart', cartsRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)

export default router