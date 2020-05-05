const ServerController = new (require('../controllers/ServerController'))();
const serverRouter = require('koa-router')({
    prefix: '/server'
});

serverRouter.get('/', ServerController.Servers);
serverRouter.get('/:Server', ServerController.Server);
serverRouter.post('/', ServerController.addServer, ServerController.Servers);
serverRouter.put('/:Server', ServerController.updateServer, ServerController.Server);
serverRouter.delete('/:Server', ServerController.deleteServer, ServerController.Servers);

module.exports = serverRouter;
