export class PlayerTurn {
	totalNumberOfPlayer: any = {};
	playerTurn: any = {};

	constructor() {}

	getTotalNumberOfPlayer(_roomId: any): number {
		return Number(this.playerTurn[_roomId] || 0);
	}

	setTotalNumberOfPlayer(_roomId: any, t: number) {
		this.playerTurn[_roomId] = t;
	}

	getPlayerTurn(_roomId: any): number {
		return Number(this.playerTurn[_roomId] || 0);
	}

	setPlayerTurn(_roomId: any, t: number) {
		this.playerTurn[_roomId] = t;
	}
}
