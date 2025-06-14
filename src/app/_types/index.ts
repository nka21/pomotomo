/**
 * タイマーのフェーズ
 * - work: 作業時間 25分
 * - short_break: 短い休憩時間 5分
 * - long_break: 長い休憩時間 15分
 */
export type TimerPhase = 'work' | 'short_break' | 'long_break'

/**
 * タイマー情報
 * - phase: タイマーのフェーズ
 * - startedAt: タイマーが開始された時刻
 * - cycle: タイマーのサイクル数
 * - remainingTime: タイマーの残り時間
 */
export type TimerState = {
	phase: TimerPhase
	startedAt: string
	cycle: number
	remainingTime: number // ミリ秒
}

/**
 * 部屋情報
 */
export type RoomState = {
	id: string
	name: string
	createdAt: string
}

/**
 * 部屋参加者情報
 * - id: 参加者のID
 * - joinedAt: 参加者が部屋に参加した時刻
 */
export type RoomParticipant = {
	id: string
	joinedAt: string
}

/**
 * 部屋作成レスポンス
 * - roomId: 部屋のID
 * - roomName: 部屋の名前
 * - isNew: 部屋が新規作成されたかどうか
 */
export type CreateRoomResponse = {
	roomId: string
	roomName: string
	isNew: boolean
}

/**
 * 部屋情報取得レスポンス
 * - exists: 部屋が存在するかどうか
 * - participantsCount: 部屋に参加している人数
 */
export type RoomInfoResponse = {
	exists: boolean
	participantsCount: number
}

/**
 * WebSocket Event
 */
export type TimerStateEvent = {
	type: 'TIMER_STATE'
	payload: TimerState
}

/**
 * WebSocket Event
 */
export type PresenceEvent = {
	type: 'PRESENCE'
	event: 'sync' | 'join' | 'leave'
	payload: RoomParticipant[]
}
