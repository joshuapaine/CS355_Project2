const StockItemController = new (require('../controllers/StockItemController'))();
const StockItemRouter = require('koa-router')({
    prefix: '/StockItem'
});

StockItemRouter.get('/', StockItemController.StockItems);
StockItemRouter.get('/:StockItem', StockItemController.StockItem);
StockItemRouter.post('/', StockItemController.addStockItem, StockItemController.StockItems);
StockItemRouter.put('/:StockItem', StockItemController.updateStockItem, StockItemController.StockItem);
StockItemRouter.delete('/:StockItem', StockItemController.deleteStockItem, StockItemController.StockItems);

module.exports = StockItemRouter;
