"use client";

import styles from "./VideoSection.module.css";

interface VideoSectionProps {
    videoUrl: string | null;
}

export default function VideoSection({ videoUrl }: VideoSectionProps) {
    if (!videoUrl) return null;

    // Extract Video ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = getYouTubeId(videoUrl);

    if (!videoId) return null;

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title="Tanıtım Filmi"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
}
