const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class OrderController {
    constructor() {
        console.log('Order Controller Initialized!');
    }

    // Fetches all Orders
    async Orders(ctx) {
        console.log('Controller HIT: OrderController::Orders');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Order`';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Order: ${err}`);
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

    // Fetches a single Order
    async Order(ctx) {
        console.log('Controller HIT: OrderController::Order');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Order` WHERE id = ?;';
            const ord = ctx.params.Order;

            chpConnection.query({
                sql: query,
                values: [ord]
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

    // Add a Order
    async addOrder(ctx, next) {
        console.log('Controller HIT: OrderController::addOrder');
       return new Promise((resolve, reject) => {
           const newORD = ctx.request.body;
	       console.log(newORD);
           chpConnection.query({
               sql: 'INSERT INTO `Order`(id, Distributor, Buyer, FName, LName) VALUES (?, ?, ?, ?,?);',
               values: [newORD.id, newORD.Distributor, newORD.Buyer, newORD.FName, newORD.LName]
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

    // Update a Order
    async updateOrder(ctx, next) {
        console.log('Controller HIT: OrderController::updateOrder');
        return new Promise((resolve, reject) => {
            const ORD = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Order
                    SET
			Distributor = ?,
			Buyer = ?,
                        FName = ?,
			LName = ?
                    WHERE id = ?
                    `,
                values: [ORD.Distributor, ORD.Buyer, ORD.FName, ORD.LName, ctx.params.Order]
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

    //Delete a Order
    async deleteOrder(ctx, next) {
        console.log('Controller HIT: OrderController::deleteOrder');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Order WHERE id = ?;`,
                values: [ctx.params.Order]
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

module.exports = OrderController;
