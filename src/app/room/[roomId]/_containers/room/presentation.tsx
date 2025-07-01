"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";

type RoomPresentationProps = {
    roomName: string;
    currentTime: string;
    status: "作業中" | "休憩中";
    currentCycle: number;
    totalCycles: number;
    participantCount: number;
};

export const RoomPresentation = memo((props: RoomPresentationProps) => {
    const {
        roomName,
        currentTime,
        status,
        currentCycle,
        totalCycles,
        participantCount,
    } = props;

    const router = useRouter();

    const handleExit = useCallback(() => {
        router.push("/");
    }, []);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
            <div className="flex flex-col items-center space-y-8">
                {/* ステータスバッジ */}
                <div className="flex items-center space-x-2 rounded-full bg-white px-6 py-3 shadow-sm">
                    <div
                        className={`h-3 w-3 rounded-full ${
                            status === "作業中"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                        }`}
                    />
                    <span className="font-medium text-gray-700">{status}</span>
                </div>

                {/* タイマー表示 */}
                <div className="text-8xl font-bold text-gray-800 tabular-nums">
                    {currentTime}
                </div>

                {/* サイクル情報と参加人数 */}
                <div className="flex w-full items-center justify-between text-gray-600">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl font-bold">
                            {currentCycle}
                        </span>
                        <span className="text-sm">
                            / {totalCycles} サイクル
                        </span>
                    </div>
                    <div className="h-16 w-px bg-gray-300" />
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                            <svg
                                className="h-6 w-6 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            <span className="text-2xl font-bold">
                                {participantCount}
                            </span>
                        </div>
                        <span className="text-sm">人が作業中</span>
                    </div>
                </div>

                {/* 部屋名 */}
                <div className="w-full mb-6 rounded-lg bg-white px-4 py-2 shadow-sm text-center">
                    <span className="text-gray-600">部屋：</span>
                    <span className="font-medium text-gray-800">
                        {roomName}
                    </span>
                </div>

                {/* 退出ボタン */}
                <button
                    onClick={handleExit}
                    className="mt-8 flex cursor-pointer items-center space-x-2 rounded-full bg-white px-8 py-4 text-gray-700 shadow-sm transition-shadow hover:shadow-md"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                    <span>退出</span>
                </button>
            </div>
        </div>
    );
});

RoomPresentation.displayName = "RoomPresentation";
