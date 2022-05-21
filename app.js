require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const marblesRouter = require('./marbles/router');

router.get('/', async (ctx) => {
    ctx.body = 'OK';
});

app.use(router.routes()).use(router.allowedMethods());

app.use(marblesRouter.routes());

app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port: ${process.env.PORT}`);
});