export interface RoomLogsAttributes {
	contractId?: string;

	message?: string;
	data?: object;

	updatedAt?: Date;
	createdAt?: Date;
}

export default function roomLogsModel(mongoose) {
	const roomLogSchema = mongoose.Schema(
		{
			contractId: {
				type: String,
				required: true,
				unique: true,
			},

			message: {
				type: String,
			},
			data: {
				type: Object,
				default: {},
			},

			updatedAt: {
				type: Date,
				default: new Date(),
			},
			createdAt: {
				type: Date,
				default: new Date(),
			},
		},
		{ collation: { locale: 'en_US', strength: 2 } }
	);

	roomLogSchema.index({ contractId: 1 });

	return {
		name: 'roomLogs',
		model: mongoose.model('roomLogs', roomLogSchema),
	};
}
