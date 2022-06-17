import { Router } from "express";
import { getRandom, getBlocker, getNotBlocker } from "../controller/random";


const router = Router()

router.get('/', getRandom)
router.get('/calculo', getNotBlocker)
router.get('/blocker', getBlocker)


export default router