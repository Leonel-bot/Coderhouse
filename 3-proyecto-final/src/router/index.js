import { Router } from "express";
import productsRouter from '../router/products'
import cartsRouter from '../router/carts'
import userRouter from '../router/user'

const router = Router()

router.use('/productos', productsRouter)
router.use('/carrito', cartsRouter)
router.use('/usuario', userRouter)

export default router