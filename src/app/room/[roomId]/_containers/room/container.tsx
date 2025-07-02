import { RoomPresentation } from "./presentation";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

type RoomContainerProps = {
	roomId: string;
};

export async function RoomContainer({ roomId }: RoomContainerProps) {
	// 部屋情報を取得
	const { data: room, error } = await supabase
		.from("rooms")
		.select("*")
		.eq("id", roomId)
		.single();

	if (error || !room) {
		notFound();
	}

	// タイマー情報を取得
	const { data: timer } = await supabase
		.from("timers")
		.select("*")
		.eq("room_id", roomId)
		.order("updated_at", { ascending: false })
		.limit(1)
		.single();

	// TODO: 実際のタイマー計算とリアルタイム参加者数の実装
	const mockData = {
		roomName: room.name,
		currentTime: "24:32",
		status: (timer?.phase === "work" ? "作業中" : "休憩中") as "作業中" | "休憩中",
		currentCycle: timer?.cycle_count || 1,
		totalCycles: 4,
		participantCount: 3,
	};

	return <RoomPresentation {...mockData} />;
} 