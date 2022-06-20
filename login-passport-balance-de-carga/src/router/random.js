import { Router } from "express";
import { getRandom } from "../controller/random";


const router = Router()

router.get('/', getRandom)


export default router