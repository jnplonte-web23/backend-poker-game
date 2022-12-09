export class Timer {
	runningTime: any = {};

	constructor() {}

	getTimer(_roomId: any): number {
		return Number(this.runningTime[_roomId] || 0);
	}

	setTimer(_roomId: any, t: number) {
		if (t >= 0) {
			this.runningTime[_roomId] = t;
		}
	}
}
