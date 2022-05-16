import { Router } from "express";
import productsRouter from '../router/products'
import cartsRouter from '../router/carts'

const router = Router()

router.use('/productos', productsRouter)
router.use('/carrito', cartsRouter)

export default router