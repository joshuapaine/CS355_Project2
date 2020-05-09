const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class DistributorController {
    constructor() {
        console.log('Distributor Controller Initialized!');
    }

    // Fetches all Distributors
    async Distributors(ctx) {
        console.log('Controller HIT: DistributorController::Distributors');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Distributor';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Distributor: ${err}`);
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

    // Fetches a single Distributor
    async Distributor(ctx) {
        console.log('Controller HIT: DistributorController::Distributor');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Distributor WHERE id = ?;';
            const dis = ctx.params.Distributor;

            chpConnection.query({
                sql: query,
                values: [dis]
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

    // Add a Distributor
    async addDistributor(ctx, next) {
        console.log('Controller HIT: DistributorController::addDistributor');
       return new Promise((resolve, reject) => {
           const newDIS = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Distributor(id, Name, PhoneNumber) VALUES (?, ?, ?);',
               values: [newDIS.id, newDIS.Name, newDIS.PhoneNumber]
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

    // Update a Distributor
    async updateDistributor(ctx, next) {
        console.log('Controller HIT: DistributorController::updateDistributor');
        return new Promise((resolve, reject) => {
            const DIS = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Distributor
                    SET
			Name = ?,
                        PhoneNumber = ?
			WHERE id = ?
                    `,
                values: [DIS.Name, DIS.PhoneNumber, ctx.params.Distributor]
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

    //Delete a Distributor
    async deleteDistributor(ctx, next) {
        console.log('Controller HIT: DistributorController::deleteDistributor');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Distributor WHERE id = ?;`,
                values: [ctx.params.Distributor]
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

module.exports = DistributorController;
