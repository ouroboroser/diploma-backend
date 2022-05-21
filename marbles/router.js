const Router = require('koa-router');
const marblesController = require('./controller');

const marblesRouter = new Router({ prefix: '/marbles' });

marblesRouter.get('/', marblesController.getData);

module.exports = marblesRouter;