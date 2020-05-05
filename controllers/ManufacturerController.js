const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ManufacturerController {
    constructor() {
        console.log('Manufacturer Controller Initialized!');
    }

    // Fetches all Manufacturers
    async Manufacturers(ctx) {
        console.log('Controller HIT: ManufacturerController::Manufacturers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Manufacturer';

            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Manufacturer: ${err}`);
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

    // Fetches a single Manufacturer
    async Manufacturer(ctx) {
        console.log('Controller HIT: ManufacturerController::Manufacturer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Manufacturer WHERE Name = ?;';
            const man = ctx.params.Manufacturer;

            chpConnection.query({
                sql: query,
                values: [man]
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

    // Add a Manufacturer
    async addManufacturer(ctx, next) {
        console.log('Controller HIT: ManufacturerController::addManufacturer');
       return new Promise((resolve, reject) => {
           const newMAN = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Manufacturer(Name, PhoneNumber, Street, City, State, ZipCode) VALUES (?, ?, ?, ?, ?, ?);',
               values: [newMAN.Name, newMAN.PhoneNumber, newMAN.Street, newMAN.City, newMAN.State, newMAN.ZipCode]
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

    // Update a Manufacturer
    async updateManufacturer(ctx, next) {
        console.log('Controller HIT: ManufacturerController::updateManufacturer');
        return new Promise((resolve, reject) => {
            const MAN = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Manufacturer
                    SET
			PhoneNumber = ?,
			Street = ?,
                        City = ?,
                        State = ?,
			ZipCode = ?
                    WHERE Name = ?
                    `,
                values: [MAN.PhoneNumber, MAN.Street, MAN.City, MAN.State, MAN.ZipCode, ctx.params.Manufacturer]
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

    //Delete a Manufacturer
    async deleteManufacturer(ctx, next) {
        console.log('Controller HIT: ManufacturerController::deleteManufacturer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Manufacturer WHERE Name = ?;`,
                values: [ctx.params.Manufacturer]
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

module.exports = ManufacturerController;
