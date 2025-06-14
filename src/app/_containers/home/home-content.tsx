"use client";

import { memo } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

type HomeContentProps = {
    onStartWork: () => void;
    ref: React.RefObject<HTMLButtonElement>;
};

export const HomeContent = memo((props: HomeContentProps) => {
    const { onStartWork, ref } = props;

    return (
        <>
            <div className="w-full max-w-md text-center">
                <Image
                    src={logo}
                    alt="logo"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
                <h1 className="mb-4 text-4xl font-bold text-gray-800">
                    ポモとも！
                </h1>
                <p className="mb-12 text-lg text-gray-600">
                    友達と一緒にポモドーロタイマー
                </p>
                <button
                    onClick={onStartWork}
                    ref={ref}
                    className="w-full max-w-xs transform cursor-pointer rounded-full bg-red-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors duration-200 hover:scale-105 hover:bg-red-600"
                >
                    作業を開始する
                </button>
            </div>
            <div className="flex items-center justify-center pb-[4vh] text-sm text-gray-500">
                <span>🍅</span>
                <span className="ml-2">友達と同じ部屋で集中しよう</span>
            </div>
        </>
    );
});
