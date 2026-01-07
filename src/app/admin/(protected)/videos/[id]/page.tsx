
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import VideoForm from "./VideoForm";

interface VideoEditPageProps {
    params: Promise<{ id: string }>;
}

export const metadata = {
    title: "Video Düzenle | Admin",
};

export default async function VideoEditPage({ params }: VideoEditPageProps) {
    const { id } = await params;

    // Handle "new" case
    const isNew = id === "new";

    let video = null;
    if (!isNew) {
        video = await prisma.video.findUnique({
            where: { id },
        });

        if (!video) {
            notFound();
        }
    }

    return (
        <VideoForm
            video={video}
            isNew={isNew}
        />
    );
}
