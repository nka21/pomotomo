"use client";

import { memo, useCallback, useState, KeyboardEvent } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const MAX_LENGTH = 20;

type RoomInputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (roomName: string) => void;
};

export const RoomInputModal = memo((props: RoomInputModalProps) => {
    const { isOpen, onClose, onSubmit } = props;

    const [roomName, setRoomName] = useState("");

    /**
     * 部屋名を入力してOKボタンを押したときの処理
     */
    const handleSubmit = useCallback(() => {
        if (roomName.trim()) {
            onSubmit(roomName.trim());
            setRoomName("");
            onClose();
        }
    }, [roomName, onSubmit, onClose]);

    /**
     * キャンセルボタンを押したときの処理
     */
    const handleCancel = useCallback(() => {
        setRoomName("");
        onClose();
    }, [onClose]);

    /**
     * 部屋名を入力したときの処理
     */
    const handleRoomNameChange = useCallback((value: string) => {
        setRoomName(value);
    }, []);

    /**
     * Enterキーが押されたときの処理
     */
    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            // Enterキーが押され、かつOKボタンが押せる状態（入力が空でない）の場合
            if (e.key === "Enter" && roomName.trim()) {
                // デフォルトのイベント（あれば）をキャンセル
                e.preventDefault();
                // OKボタンの処理を呼び出す
                handleSubmit();
            }
        },
        [roomName, handleSubmit],
    );

    return (
        <Modal isOpen={isOpen} onClose={handleCancel}>
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <h2 className="mb-2 text-center text-xl font-bold text-gray-800">
                    部屋名を入力
                </h2>
                <p className="mb-6 text-center text-gray-600">
                    友達と同じ部屋名を入力してください
                </p>

                <div className="mb-6">
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => handleRoomNameChange(e.target.value)}
                        placeholder="部屋名を入力（20文字まで）"
                        maxLength={MAX_LENGTH}
                        onKeyDown={handleKeyDown}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                        autoFocus
                    />
                    <div className="mt-2 text-right text-sm text-gray-500">
                        {roomName.length}/{MAX_LENGTH}
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary" onClick={handleCancel}>
                        キャンセル
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={!roomName.trim()}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    );
});
