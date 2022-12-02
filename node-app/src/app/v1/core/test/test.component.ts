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

	/**
	 * @api {get} /main/test test
	 * @apiVersion 1.0.0
	 * @apiName test
	 * @apiGroup MAIN
	 * @apiPermission all
	 *
	 * @apiDescription test api
	 */
	test(req: Request, res: Response): void {
		return this.response.success(res, 'test', '');
	}
}
