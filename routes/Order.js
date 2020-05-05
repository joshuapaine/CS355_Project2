const OrderController = new (require('../controllers/OrderController'))();
const OrderRouter = require('koa-router')({
    prefix: '/Order'
});

OrderRouter.get('/', OrderController.Orders);
OrderRouter.get('/:Order', OrderController.Order);
OrderRouter.post('/', OrderController.addOrder, OrderController.Orders);
OrderRouter.put('/:Order', OrderController.updateOrder, OrderController.Order);
OrderRouter.delete('/:Order', OrderController.deleteOrder, OrderController.Orders);

module.exports = OrderRouter;
