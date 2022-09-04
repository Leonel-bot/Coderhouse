import { Router } from "express";
import ChatController from "../controller/chat"

const router = Router()

router.get('/', ChatController.get)
router.get('/:id', ChatController.get)
router.post('/', ChatController.save)
router.delete('/:id', ChatController.remove)



export default router