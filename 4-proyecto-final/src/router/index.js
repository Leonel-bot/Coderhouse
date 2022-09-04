import { Router } from "express";
import productsRouter from '../router/products'
import cartsRouter from '../router/carts'
import userRouter from '../router/user'
import authRouter from "../router/auth"
import categoryRouter from  "../router/category"
import chatRouter from  "../router/chat"

const router = Router()

router.use('/product', productsRouter)
router.use('/category', categoryRouter)
router.use('/cart', cartsRouter)
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/chat', chatRouter)

export default router