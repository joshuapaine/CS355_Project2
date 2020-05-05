const ManufacturerController = new (require('../controllers/ManufacturerController'))();
const ManufacturerRouter = require('koa-router')({
    prefix: '/Manufacturer'
});

ManufacturerRouter.get('/', ManufacturerController.Manufacturers);
ManufacturerRouter.get('/:Manufacturer', ManufacturerController.Manufacturer);
ManufacturerRouter.post('/', ManufacturerController.addManufacturer, ManufacturerController.Manufacturers);
ManufacturerRouter.put('/:Manufacturer', ManufacturerController.updateManufacturer, ManufacturerController.Manufacturer);
ManufacturerRouter.delete('/:Manufacturer', ManufacturerController.deleteManufacturer, ManufacturerController.Manufacturers);

module.exports = ManufacturerRouter;
