import { Router } from "express";
import CategoryController from "../controller/category"

const router = Router()

router.get('/', CategoryController.get)
router.get('/:id', CategoryController.get)
router.post('/', CategoryController.save)
router.put('/:id', CategoryController.update)
router.delete('/:category', CategoryController.remove)



export default router

