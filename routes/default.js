const ManufacturerRouter = require('./Manufacturer');
const StockItemRouter = require('./StockItem');
const DistributorRouter = require('./Distributor');
const OrderRouter = require('./Order');
const BusinessBuyerRouter = require('./BusinessBuyer');
const ViewRouter = require('./View');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    ManufacturerRouter.routes(),
    StockItemRouter.routes(),
    DistributorRouter.routes(),
    OrderRouter.routes(),
    BusinessBuyerRouter.routes(),
    ViewRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};

