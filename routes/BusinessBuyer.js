const BusinessBuyerController = new (require('../controllers/BusinessBuyerController'))();
const BusinessBuyerRouter = require('koa-router')({
    prefix: '/BusinessBuyer'
});

BusinessBuyerRouter.get('/', BusinessBuyerController.BusinessBuyers);
BusinessBuyerRouter.get('/:BusinessBuyer', BusinessBuyerController.BusinessBuyer);
BusinessBuyerRouter.post('/', BusinessBuyerController.addBusinessBuyer, BusinessBuyerController.BusinessBuyers);
BusinessBuyerRouter.put('/:BusinessBuyer', BusinessBuyerController.updateBusinessBuyer, BusinessBuyerController.BusinessBuyer);
BusinessBuyerRouter.delete('/:BusinessBuyer', BusinessBuyerController.deleteBusinessBuyer, BusinessBuyerController.BusinessBuyers);

module.exports = BusinessBuyerRouter;
