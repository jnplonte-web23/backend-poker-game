import { Request, Response } from 'express';
import { CoreMiddleware } from '../../../middlewares/core/core.middleware';

export class UsersRoom extends CoreMiddleware {
	constructor(app, private response, private helper, private mongo, private io) {
		super(app);
	}

	get services() {
		return {
			'GET /users': 'all',
		};
	}

	/**
	 * @api {get} /room/users get all user
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
