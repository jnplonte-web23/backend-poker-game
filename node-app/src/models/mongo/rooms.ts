export interface RoomsAttributes {
	contractId?: string;
	name?: string;
	description?: string;

	players?: number;
	coins?: number;
	data?: object;

	active?: boolean;

	updatedAt?: Date;
	createdAt?: Date;
}

export default function roomsModel(mongoose) {
	const roomSchema = mongoose.Schema(
		{
			contractId: {
				type: String,
				required: true,
				unique: true,
			},
			name: {
				type: String,
			},
			description: {
				type: String,
			},

			players: {
				type: Number,
				default: 0,
			},
			coins: {
				type: Number,
				default: 0,
			},
			data: {
				type: Object,
				default: {},
			},

			active: {
				type: Boolean,
				default: true,
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

	roomSchema.index({ contractId: 1 });

	return {
		name: 'rooms',
		model: mongoose.model('rooms', roomSchema),
	};
}
