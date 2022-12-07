import { Helper } from '../app/services/helper/helper.service';
import { ApiResponse } from '../app/services/api-response/api-response.service';

export function setup(io, config) {
	const response = new ApiResponse(),
		helper = new Helper(config);

	const verifyUser = (socket, next) => {
		if (
			typeof socket.handshake.headers === 'undefined' ||
			helper.isEmpty(socket.handshake.headers[config.secretKey]) ||
			Buffer.from(socket.handshake.headers[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash
		) {
			next(new Error(helper.toString(response.failed({}, 'token', '', 401))));
			return;
		}

		next();
	};

	const ioName = io.of('v1/room/poker');
	ioName.use(verifyUser);

	ioName['userData'] = [];

	ioName.on('connection', (socket) => {
		const roomName: string = `ROOM:${socket.handshake.query.roomId}`;
		const walletId: string | null = socket.handshake.query.walletId || null;
		const userName: string | null = socket.handshake.query.userName || null;
		const playerNumber: number | null = Number(socket.handshake.query.playerNumber || 0);

		if (walletId) {
			socket.join(roomName);

			const room = socket.adapter.rooms.get(roomName);
			const usersOnRoom: string[] = [];
			if (room) {
				for (const clientId of room) {
					usersOnRoom.push(clientId);
				}
			}

			ioName['userData'].push({
				userId: socket.id,
				walletId: walletId,
				userName: userName,
				playerNumber: playerNumber,
			});

			ioName.in(roomName).emit('connected', {
				status: 'success',
				message: 'Connection Success',
				executionTime: 0,
				data: {
					userData: ioName['userData'].filter((uData) => usersOnRoom.includes(uData['userId'])),
				},
			});
			console.log('USER CONNECTED ON ROOM', roomName, usersOnRoom);
		}

		socket.on('disconnect', () => {
			const roomDc = socket.adapter.rooms.get(roomName);
			const usersOnRoomDc: string[] = [];
			if (roomDc) {
				for (const clientDcId of roomDc) {
					usersOnRoomDc.push(clientDcId);
				}
			}

			if (ioName['userData'].length >= 1) {
				ioName['userData'] = ioName['userData'].filter((uData) => usersOnRoomDc.includes(uData['userId']));
			}

			ioName.in(roomName).emit('connected', {
				status: 'success',
				message: 'Disconnection Success',
				executionTime: 0,
				data: {
					userData: ioName['userData'].filter((uData) => usersOnRoomDc.includes(uData['userId'])),
				},
			});
			console.log('USER DISCONNECTED ON ROOM', roomName, usersOnRoomDc);
		});
	});

	return ioName;
}
