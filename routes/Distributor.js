const DistributorController = new (require('../controllers/DistributorController'))();
const DistributorRouter = require('koa-router')({
    prefix: '/Distributor'
});

DistributorRouter.get('/', DistributorController.Distributors);
DistributorRouter.get('/:Distributor', DistributorController.Distributor);
DistributorRouter.post('/', DistributorController.addDistributor, DistributorController.Distributors);
DistributorRouter.put('/:Distributor', DistributorController.updateDistributor, DistributorController.Distributor);
DistributorRouter.delete('/:Distributor', DistributorController.deleteDistributor, DistributorController.Distributors);

module.exports = DistributorRouter;
