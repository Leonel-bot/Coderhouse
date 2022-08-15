import Koa from "koa"
import router from "../router/index";
import koaBody from "koa-body"


const app = new Koa();
app.use(koaBody())

app.use(router)

export default app