const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class BusinessBuyerController {
    constructor() {
        console.log('Business Buyer Controller Initialized!');
    }

    // Fetches all BusinessBuyers
    async BusinessBuyers(ctx) {
        console.log('Controller HIT: BusinessBuyerController::BusinessBuyers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BusinessBuyer';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.BusinessBuyer: ${err}`);
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

    // Fetches a single BusinessBuyer
    async BusinessBuyer(ctx) {
        console.log('Controller HIT: BusinessBuyerController::BusinessBuyer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM BusinessBuyer WHERE id = ?;';
            const bby = ctx.params.BusinessBuyer;

            chpConnection.query({
                sql: query,
                values: [bby]
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

    // Add a BusinessBuyer
    async addBusinessBuyer(ctx, next) {
        console.log('Controller HIT: BusinessBuyerController::addBusinessBuyer');
       return new Promise((resolve, reject) => {
           const newBBY = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO BusinessBuyer(id, Name, PhoneNumber, Street, City, State, ZipCode) VALUES (?, ?, ?, ?, ?, ?, ?);',
               values: [newBBY.id, newBBY.Name, newBBY.PhoneNumber, newBBY.Street, newBBY.City, newBBY.State, newBBY.ZipCode]
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

    // Update a BusinessBuyer
    async updateBusinessBuyer(ctx, next) {
        console.log('Controller HIT: BusinessBuyerController::updateBusinessBuyer');
        return new Promise((resolve, reject) => {
            const BBY = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE BusinessBuyer
                    SET
                        Name = ?,
                        PhoneNumber = ?
                        Street = ?,
                        City = ?,
                        State = ?,
                        ZipCode = ?
                        WHERE id = ?
                    `,
                values: [BBY.Name, BBY.PhoneNumber, BBY.Street, BBY.City, BBY.State, BBY.ZipCode, ctx.params.BusinessBuyer]
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

    //Delete a BusinessBuyer
    async deleteBusinessBuyer(ctx, next) {
        console.log('Controller HIT: BusinessBuyerController::deleteBusinessBuyer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM BusinessBuyer WHERE id = ?;`,
                values: [ctx.params.BusinessBuyer]
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

module.exports = BusinessBuyerController;

