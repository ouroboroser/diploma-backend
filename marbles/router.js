const Router = require('koa-router');
const marblesController = require('./controller');

const marblesRouter = new Router({ prefix: '/marbles' });

marblesRouter.post('/', marblesController.getData);

module.exports = marblesRouter;