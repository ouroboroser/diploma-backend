const Router = require('koa-router');
const marblesController = require('./controller');

const marblesRouter = new Router({ prefix: '/marbles' });

marblesRouter.get('/', marblesController.getData);
marblesRouter.post('/', marblesController.saveDiagramToS3);

module.exports = marblesRouter;