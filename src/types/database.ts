export type Room = {
	id: string;
	name: string;
	created_at: string;
};

export type Timer = {
	room_id: string;
	phase: "work" | "short_break" | "long_break";
	started_at: string;
	cycle_count: number;
	updated_at: string;
};

export type Database = {
	public: {
		Tables: {
			rooms: {
				Row: Room;
				Insert: Omit<Room, "id" | "created_at">;
				Update: Partial<Omit<Room, "id" | "created_at">>;
			};
			timers: {
				Row: Timer;
				Insert: Omit<Timer, "updated_at">;
				Update: Partial<Omit<Timer, "room_id">>;
			};
		};
	};
};