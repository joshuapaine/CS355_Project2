const dataCenterRouter = require('./datacenter');
const serverRouter = require('./server');
const ManufacturerRouter = require('./Manufacturer');
const StockItemRouter = require('./StockItem');
const DistributorRouter = require('./Distributor');
const OrderRouter = require('./Order');
const BusinessBuyerRouter = require('./BusinessBuyer');
const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    dataCenterRouter.routes(),
    serverRouter.routes(),
    ManufacturerRouter.routes(),
    StockItemRouter.routes(),
    DistributorRouter.routes(),
    OrderRouter.routes(),
    BusinessBuyerRouter.routes(),
);

module.export = api => {
    api.use(defaultRouter.routes());
};

