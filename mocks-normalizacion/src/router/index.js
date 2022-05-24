import { Router } from "express";
import productRouter from './product'

const router = Router()

router.use('/productos-test', productRouter)

export default router