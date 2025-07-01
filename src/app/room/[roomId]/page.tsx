import { RoomContainer } from "./_containers/room/container";

type PageProps = {
	params: Promise<{ roomId: string }>;
};

export default async function RoomPage({ params }: PageProps) {
	const { roomId } = await params;

	return <RoomContainer roomId={roomId} />;
} 