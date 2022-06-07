import { Router } from "express";
import { get } from "../controller/products";

const router = Router()

router.get('/', get)

export default router