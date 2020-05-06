const ViewController = new (require('../controllers/ViewController'))();
const ViewRouter = require('koa-router')({
    prefix: '/View'
});

ViewRouter.get('/', ViewController.View);

module.exports = ViewRouter;
