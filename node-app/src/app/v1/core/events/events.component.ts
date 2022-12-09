import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

export class Events extends CoreMiddleware {
	constructor(app, private response, private helper, private timer, private io, private mongo) {
		super(app);
	}

	get services() {
		return {
			'POST /events/startgame': 'startGame',
			'POST /events/endgame': 'endGame',
			'POST /events/bet': 'bet',
			'POST /events/call': 'call',
			'POST /events/fold': 'fold',
			'POST /events/allin': 'allIn',
		};
	}

	startGame(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 101);
		this.io.to(roomName).emit('start-game', this.response.success({}, 'start-game', req.body['data']));

		// DB logic here

		return this.response.success(res, 'start-game', req.body['data']);
	}

	endGame(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 0);
		this.io.to(roomName).emit('end-game', this.response.success({}, 'end-game', req.body['data']));

		// DB logic here

		return this.response.success(res, 'end-game', req.body['data']);
	}

	bet(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 31);
		this.io.to(roomName).emit('bet', this.response.success({}, 'bet', req.body['data']));

		// DB logic here

		return this.response.success(res, 'bet', req.body['data']);
	}

	call(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 31);
		this.io.to(roomName).emit('call', this.response.success({}, 'call', req.body['data']));

		// DB logic here

		return this.response.success(res, 'call', req.body['data']);
	}

	fold(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 31);
		this.io.to(roomName).emit('fold', this.response.success({}, 'fold', req.body['data']));

		// DB logic here

		return this.response.success(res, 'fold', req.body['data']);
	}

	allIn(req: Request, res: Response): void {
		const reqParameters = ['data', 'roomId'];
		if (!this.helper.validateData(req.body, reqParameters)) {
			return this.response.failed(res, 'data', reqParameters);
		}

		const roomName: string = `ROOM:${req.body['roomId']}`;

		this.timer.setTimer(roomName, 31);
		this.io.to(roomName).emit('all-in', this.response.success({}, 'all-in', req.body['data']));

		// DB logic here

		return this.response.success(res, 'all-in', req.body['data']);
	}
}
