import { Router } from "express";
import CartController from "../controller/cart" 

const router = Router()

router.get('/', CartController.get)
router.post('/', CartController.save)
router.post('/', CartController.save)
router.get('/:id', CartController.get)
router.delete('/:id', CartController.remove)
router.post('/add_products/:id', CartController.addProducts)
router.delete('/remove_product/:id', CartController.removeProduct)

export default router