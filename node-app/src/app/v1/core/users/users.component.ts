import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

export class Users extends CoreMiddleware {
	constructor(app, private response, private helper, private io, private mongo) {
		super(app);
	}

	get services() {
		return {
			'GET /users': 'all',
		};
	}

	/**
	 * @api {get} /core/users get all user
	 * @apiVersion 1.0.0
	 * @apiName getAll
	 * @apiGroup CORE
	 * @apiPermission all
	 *
	 * @apiDescription get all user
	 */
	all(req: Request, res: Response): void {
		return this.response.success(res, 'wip', '');
	}
}
