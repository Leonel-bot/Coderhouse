import Router  from "koa-router";
import productsRouter from '../router/products'
import cartsRouter from '../router/carts'
import userRouter from '../router/user'

const router = new Router({
    prefix: '/api'
})

router.use(productsRouter)
router.use(cartsRouter)
router.use(userRouter)

export default router.routes()