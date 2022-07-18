import { Router } from "express";
import { get, remove, save, update } from "../controller/products";
import { authMiddleware } from "../middleware";

const router = Router()

router.get('/', get)
router.get('/:id', get)
router.post('/', save)
router.put('/:id', update)
router.delete('/:id', remove)


export default router