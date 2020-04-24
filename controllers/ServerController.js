const chpConnection = require('../database/CHPConnection');

//Controller that interacts with database to retrieve data.
class ServerController {
	constructor() {
		console.log('Server Controller Initialized!!!');
	}

	//Fetches all servers
	async Servers(ctx) {
		console.log('Controller HIT: ServerController::Servers');
		return new Promise((resolve, reject) => {
			const query = 'SELECT * FROM L6_Server;';

			chpConnection.query(query, (err, res) => {
				if(err) {
					reject(`Error querying CHP.L6_Server: ${err}`);
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


	//Fetches a single Server
	async Server(ctx) {
		console.log('Controller HIT: ServerController::Server');
		return new Promise((resolve, reuect) => {
			const query = 'SELECT * FROM L6_Server WHERE id = ?;';
			const ser = ctx.params.server;

			chpConnection.query({
				sql: query,
				values: [ser]
			}, (err,res) => {
				if (err) {
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


	//Add a new Server
	async addServer(ctx,next) {
		console.log('Controller HIT: ServerController::addServer');
		return new Promise((resolve, reject) => {
			const newSER = ctx.request.body;
			chpConnection.query({
				sql: 'INSERT INTO L6_Server(id, hostName, L6_DataCenter, installedON, powerOnAt) VALUES (?,?,?,?,?);',
				values: [newSER.id, newSER.hostName, newSER.L6_DataCenter, newSER.installedOn, newSER.powerOnAt]
			}, (err,res) => {
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


	//Update a Server
	async updateServer(ctx, next) {
		console.log('Controller HIT: ServerController::updateServer');
		return new Promise((resolve, reject) => {
			const ser = ctx.request.body;
			chpConnection.query({
				sql:`
					UPDATE L6_Server
					SET
						hostName = ?,
						L6_DataCenter = ?,
						installedOn = ?,
						powerOnAt = ?
					WHERE id =?`,
				values: [ser.hostName, ser.L6_DataCenter, serinstalledOn, ser.powerOnAt, ctx.params.server]
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

	
	//Delete a Server
	async deleteServer(ctx,next) {
		console.log('Controller HIT: ServerController::deleteServer');
		return new Promise((resolve, reject) => {
			chpConnection.query({
				sql: `DELETE FROM L6_Server WHERE id = ?;`,
				values: [ctx.params.server]
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

module.exports = ServerController;
