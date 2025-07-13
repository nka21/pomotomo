import type { JoinedRoomResponse } from "@/types";

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public code?: string,
        public details?: unknown,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export const joinOrCreateRoom = async (
    name: string,
): Promise<JoinedRoomResponse> => {
    const response = await fetch("/api/rooms/join-or-create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            data.error || "API呼び出しに失敗しました",
            response.status,
            data.code,
            data.details,
        );
    }

    return data;
};

// 今後追加予定のAPI関数
// export const getRoomInfo = async (roomId: string) => { ... };
// export const updateTimer = async (roomId: string, timerData: TimerData) => { ... };
