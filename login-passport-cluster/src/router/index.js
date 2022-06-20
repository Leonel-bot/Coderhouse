import { Router } from "express";
import productRouter from './product'
import randomRouter from './random'

const router = Router()

router.use('/productos-test', productRouter)
router.use('/random', randomRouter)

export default router