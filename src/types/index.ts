import type { Room, Timer } from "./database";

/**
 * タイマーのフェーズ
 * work: 作業（25分）
 * short_break: 短い休憩（5分）
 * long_break: 長い休憩（15分、4サイクルごと）
 */
export type TimerPhase = Timer["phase"];

/**
 * クライアント側のタイマー状態
 * データベースの情報に加えて、計算された値を含む
 */
export type ClientTimerState = Timer & {
	remainingTime: number; // ミリ秒
	progress: number; // 0-100のパーセンテージ
};

/**
 * 部屋参加者情報
 * リアルタイムで管理される情報
 */
export type RoomParticipant = {
	id: string;
	joinedAt: string;
};

/**
 * クライアント側の部屋状態
 * データベース情報 + リアルタイム情報
 */
export type ClientRoomState = Room & {
	participants: RoomParticipant[];
	currentTimer?: ClientTimerState;
};

/**
 * API: 部屋作成レスポンス
 */
export type CreateRoomResponse = {
	room: Room;
};

/**
 * API: 部屋情報取得レスポンス
 */
export type RoomInfoResponse = {
	room: Room;
	timer: Timer | null;
	participantsCount: number;
};

/**
 * WebSocket: タイマー状態更新イベント
 */
export type TimerUpdateEvent = {
	type: "TIMER_UPDATE";
	payload: Timer;
};

/**
 * WebSocket: 参加者の出入りイベント
 */
export type PresenceEvent = {
	type: "PRESENCE";
	event: "sync" | "join" | "leave";
	payload: RoomParticipant[];
};

/**
 * タイマーの設定値（定数）
 */
export const TIMER_DURATIONS = {
	work: 25 * 60 * 1000, // 25分
	short_break: 5 * 60 * 1000, // 5分  
	long_break: 15 * 60 * 1000, // 15分
} as const;
