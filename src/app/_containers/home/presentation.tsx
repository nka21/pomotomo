"use client";

import { memo, useCallback, useRef, useState } from "react";
import { RoomInputModal } from "./room-input-modal";
import { HomeContent } from "./home-content";
import { useJoinOrCreateRoom } from "./use-join-or-create-room";

type HomePresentationProps = {};

export const HomePresentation = memo((props: HomePresentationProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const startButtonRef = useRef<HTMLButtonElement>(null);

    const handleSuccess = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const { mutate: joinOrCreateRoom, isPending } =
        useJoinOrCreateRoom(handleSuccess);

    const handleStartWork = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsModalOpen(false);
        if (startButtonRef.current) {
            startButtonRef.current.blur();
        }
    }, []);

    const handleRoomSubmit = useCallback(
        (roomName: string) => {
            joinOrCreateRoom(roomName);
        },
        [joinOrCreateRoom],
    );

    return (
        <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-pink-50 to-red-50 p-4 pt-[24vh]">
            <HomeContent
                onStartWork={handleStartWork}
                modalTriggerRef={startButtonRef}
            />
            <RoomInputModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleRoomSubmit}
                isPending={isPending}
            />
        </div>
    );
});
