import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createRoom, ApiError } from "@/app/_lib/api";
import type { CreateRoomResponse } from "@/types";

export function useCreateRoom(onSuccess?: () => void) {
	const router = useRouter();

	return useMutation<CreateRoomResponse, ApiError, string>({
		mutationFn: createRoom,
		onSuccess: ({ room }) => {
			router.push(`/room/${room.id}`);
			onSuccess?.();
		},
		onError: (error) => {
			console.error("部屋作成エラー:", {
				message: error.message,
				status: error.status,
				code: error.code,
				details: error.details,
			});

			// ユーザー向けのエラーメッセージ
            // TODO: より良いエラー通知（トーストなど）
			let userMessage = error.message;
			if (error.code === "VALIDATION_ERROR") {
				userMessage = error.message; // バリデーションエラーはそのまま表示
			} else if (error.status >= 500) {
				userMessage = "サーバーエラーが発生しました。しばらく待ってから再試行してください。";
			}

			alert(userMessage);
		},
	});
} 