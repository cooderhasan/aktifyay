"use client";

import { YouTubeEmbed } from "@next/third-parties/google";
import styles from "./VideoSection.module.css";

interface VideoSectionProps {
    videoUrl: string | null;
    embedded?: boolean;
}

export default function VideoSection({ videoUrl, embedded = false }: VideoSectionProps) {
    if (!videoUrl) return null;

    // Extract Video ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);

    if (!videoId) return null;

    const sectionClass = embedded ? styles.embeddedSection : styles.section;
    const containerClass = embedded ? styles.embeddedContainer : styles.container;

    return (
        <section className={sectionClass}>
            <div className={containerClass}>
                <div className={styles.videoWrapper}>
                    <YouTubeEmbed videoid={videoId} params="rel=0" />
                </div>
            </div>
        </section>
    );
}
