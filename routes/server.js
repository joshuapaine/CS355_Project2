const ServerController = new (require('../controllers/ServerController'))();
const serverRouter = require('koa-router')({
    prefix: '/server'
});

serverRouter.get('/', ServerController.Servers);
serverRouter.get('/:server', ServerController.Server);
serverRouter.post('/', ServerController.addServer, ServerController.Servers);
serverRouter.put('/:server', ServerController.updateServer, ServerController.Server);
serverRouter.delete('/:server', ServerController.deleteServer, ServerController.Servers);

module.exports = serverRouter;
