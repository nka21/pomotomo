import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { joinOrCreateRoom, ApiError } from "@/app/_lib/api";
import type { JoinedRoomResponse } from "@/types";

export function useJoinOrCreateRoom(onSuccess?: () => void) {
    const router = useRouter();

    return useMutation<JoinedRoomResponse, ApiError, string>({
        mutationFn: joinOrCreateRoom,
        onSuccess: ({ room }) => {
            router.push(`/room/${room.id}`);
            onSuccess?.();
        },
        onError: (error) => {
            console.error("部屋参加/作成エラー:", {
                message: error.message,
                status: error.status,
                code: error.code,
                details: error.details,
            });

            // ユーザー向けのエラーメッセージ
            let userMessage = error.message;
            if (error.code === "VALIDATION_ERROR") {
                userMessage = error.message; // バリデーションエラーはそのまま表示
            } else if (error.status >= 500) {
                userMessage =
                    "サーバーエラーが発生しました。しばらく待ってから再試行してください。";
            }

            alert(userMessage);
        },
    });
}
