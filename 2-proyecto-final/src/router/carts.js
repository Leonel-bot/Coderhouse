import { Router } from "express";
import { get, save, remove, addProducts, getProducts, removeProduct } from "../controller/cart";

const router = Router()

router.get('/', get)
router.post('/', save)
router.post('/:id/productos', addProducts)
router.delete('/:id', remove)
router.get('/:id/productos', getProducts)
router.delete('/:id/productos/:id_prod', removeProduct)

export default router