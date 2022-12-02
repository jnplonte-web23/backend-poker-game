import { Request, Response } from 'express';
import { BaseMiddleware } from '../base/base.middleware';

export class CoreMiddleware extends BaseMiddleware {
	constructor(app) {
		super(app);
	}

	get attributes(): any {
		return [];
	}

	get requiredParameters(): string[] {
		return [];
	}

	all(req: Request, res: Response): void {}

	get(req: Request, res: Response): void {}

	post(req: Request, res: Response): void {}

	put(req: Request, res: Response): void {}

	delete(req: Request, res: Response): void {}
}
