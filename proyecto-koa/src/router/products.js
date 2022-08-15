import Router  from "koa-router";
import ProductController from "../controller/product"
import { authMiddleware } from "../middleware";

const router = new Router({
    prefix: '/product'
})

router.get('/', ProductController.get)
router.get('/:id', ProductController.get)
router.post('/', ProductController.save)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.remove)



export default router.routes()