import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { CreateRoomResponse } from "@/types";

type CreateRoomRequest = {
	name: string;
};

type ErrorResponse = {
	error: string;
	code?: string;
	details?: unknown;
};

export async function POST(request: NextRequest): Promise<NextResponse<CreateRoomResponse | ErrorResponse>> {
	try {
		const body: CreateRoomRequest = await request.json();

		if (!body.name || typeof body.name !== "string") {
			return NextResponse.json(
				{ 
					error: "部屋名は必須です",
					code: "VALIDATION_ERROR"
				},
				{ status: 400 }
			);
		}

		const roomName = body.name.trim();
		if (roomName.length === 0) {
			return NextResponse.json(
				{ 
					error: "部屋名を入力してください",
					code: "VALIDATION_ERROR"
				},
				{ status: 400 }
			);
		}

		if (roomName.length > 20) {
			return NextResponse.json(
				{ 
					error: "部屋名は20文字以内で入力してください",
					code: "VALIDATION_ERROR"
				},
				{ status: 400 }
			);
		}

		// 部屋を作成
		const { data: room, error: roomError } = await supabase
			.from("rooms")
			.insert({ name: roomName })
			.select()
			.single();

		if (roomError) {
			console.error("部屋作成エラー:", roomError);
			return NextResponse.json(
				{ 
					error: "部屋の作成に失敗しました",
					code: "DATABASE_ERROR",
					details: process.env.NODE_ENV === 'development' ? {
						message: roomError.message,
						code: roomError.code,
						hint: roomError.hint,
					} : undefined
				},
				{ status: 500 }
			);
		}

		// 初期タイマーを作成（作業フェーズから開始）
		const { error: timerError } = await supabase
			.from("timers")
			.insert({
				room_id: room.id,
				phase: "work",
				started_at: new Date().toISOString(),
				cycle_count: 1,
			});

		if (timerError) {
			console.error("タイマー作成エラー:", timerError);
			if (process.env.NODE_ENV === 'development') {
				console.error("タイマー作成エラー詳細:", {
					message: timerError.message,
					code: timerError.code,
					hint: timerError.hint,
				});
			}
		}

		return NextResponse.json(
			{ room },
			{ 
				status: 201,
				headers: {
					'Cache-Control': 'no-cache, no-store, must-revalidate',
				}
			}
		);

	} catch (error) {
		console.error("予期しないエラー:", error);
		return NextResponse.json(
			{ 
				error: "予期しないエラーが発生しました",
				code: "INTERNAL_ERROR"
			},
			{ status: 500 }
		);
	}
} 