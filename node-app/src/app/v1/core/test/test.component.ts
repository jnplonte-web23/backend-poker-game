import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

export class Test extends CoreMiddleware {
	constructor(app, private response) {
		super(app);
	}

	get services() {
		return {
			'GET /test': 'test',
		};
	}

	test(req: Request, res: Response): void {
		return this.response.success(res, 'test', '');
	}
}
