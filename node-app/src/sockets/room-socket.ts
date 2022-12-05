import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Mongo } from '../app/services/mongo/mongo.service';
import { Helper } from '../app/services/helper/helper.service';

// import { Test } from '../app/v1/core/test/test.component';
import { UsersRoom } from '../app/v1/core/users/users-room.component';

export function setup(app, io, config, mongoModels): void {
	const response = new ApiResponse(),
		helper = new Helper(config),
		mongo = new Mongo(config);

	const roomIO = io.of('/room');

	roomIO['users'] = {};
	roomIO['usersRoom'] = {};

	roomIO
		.use((socket, next) => {
			if (typeof socket.handshake.query === 'undefined' || helper.isEmpty(socket.handshake.query[config.secretKey])) {
				return next(new Error('Invalid Authentication Token'));
			}

			if (Buffer.from(socket.handshake.query[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash) {
				return next(new Error('Invalid Authentication Token'));
			}

			roomIO['users'] = {
				roomId: socket.handshake.query['roomId'] || null,
				walletId: socket.handshake.query['walletId'] || null,
				userName: socket.handshake.query['userName'] || null,
			};

			if (!roomIO['users']['roomId'] || !roomIO['users']['walletId'] || !roomIO['users']['userName']) {
				return next(new Error('Invalid Authentication Token'));
			}

			next();
		})
		.on('connection', (socket) => {
			roomIO['usersRoom'][roomIO['users']['walletId'] || 'NONE'] = socket.id;

			if (socket.handshake.query['roomId']) {
				const roomNumber: string = socket.handshake.query['roomId'];
				socket.join(`ROOM${decodeURIComponent(roomNumber)}`);
			}

			socket.on('disconnect', function () {
				delete roomIO['usersRoom'][roomIO['users']['walletId'] || 'NONE'];
			});
		});

	app.version('v1/room', (appCore) => {
		appCore.use((req, res, next) => {
			res.startTime = new Date().getTime();

			if (
				typeof req.headers === 'undefined' ||
				helper.isEmpty(req.headers[config.secretKey]) ||
				Buffer.from(req.headers[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash
			) {
				return response.failed(res, 'token', '', 401);
			}

			req.mongoModels = mongoModels;

			if (!req.mongoModels) {
				return response.failed(res, 'model', '', 500);
			}

			next();
		});

		// new Test(appCore, response);
		new UsersRoom(appCore, response, helper, mongo, roomIO);
	});

	return app;
}
