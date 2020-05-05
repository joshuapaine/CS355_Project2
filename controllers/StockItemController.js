const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class StockItemController {
    constructor() {
        console.log('Stock Item Controller Initialized!');
    }

    // Fetches all StockItems
    async StockItems(ctx) {
        console.log('Controller HIT: StockItemController::StockItems');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM StockItem';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.StockItem: ${err}`);
                }

                ctx.body = res;
                ctx.status = 200;

                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single StockItem
    async StockItem(ctx) {
        console.log('Controller HIT: StockItemController::StockItem');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM StockItem WHERE id = ?;';
            const stk = ctx.params.StockItem;

            chpConnection.query({
                sql: query,
                values: [stk]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a StockItem
    async addStockItem(ctx, next) {
        console.log('Controller HIT: StockItemController::addStockItem');
       return new Promise((resolve, reject) => {
           const newSTK = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO StockItem(id, Name, Cost$, List$) VALUES (?, ?, ?, ?);',
               values: [newSTK.id, newMAN.Name, newMAN.Cost$, newMAN.List$]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });

       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a StockItem
    async updateStockItem(ctx, next) {
        console.log('Controller HIT: StockItemController::updateStockItem');
        return new Promise((resolve, reject) => {
            const STK = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE StockItem
                    SET
			Name = ?,
                        Cost$ = ?,
			List$ = ?
                    WHERE id = ?
                    `,
                values: [STK.Name, STK.Cost$, STK.List$, ctx.params.StockItem]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    //Delete a StockItem
    async deleteStockItem(ctx, next) {
        console.log('Controller HIT: StockItemController::deleteStockItem');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM StockItem WHERE id = ?;`,
                values: [ctx.params.StockItem]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = StockItemController;
