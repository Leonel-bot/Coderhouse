import Router from "koa-router";
import UserController from "../controller/user"
import { authMiddleware } from "../middleware";


const router = new Router({
    prefix: '/user'
})

router.get('/', UserController.get)
router.get('/:id', UserController.get)
router.post('/', UserController.save)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)


export default router.routes()