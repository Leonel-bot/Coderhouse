import { Router } from "express";
import ProductController from "../controller/product"
import { authMiddleware } from "../middleware";
import multer from "multer"
import path from "path";


const filePath = './public/images'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, filePath)
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({dest: filePath, storage: storage})

const router = Router()

router.get('/', ProductController.get)
router.get('/:id', ProductController.get)
router.post('/', upload.single('image') ,ProductController.save)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.remove)
router.get('/category/:categoryId', ProductController.productsByCategoryId)



export default router