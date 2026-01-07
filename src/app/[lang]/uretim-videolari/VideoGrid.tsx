
"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import styles from "./page.module.css";

interface Video {
    id: string;
    youtubeUrl: string;
    title: string;
    description: string | null;
}

function getYoutubeId(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

export default function VideoGrid({ videos }: { videos: Video[] }) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    return (
        <div className={styles.grid}>
            {videos.map((video) => {
                const videoId = getYoutubeId(video.youtubeUrl);
                const isPlaying = playingId === video.id;

                if (!videoId) return null;

                return (
                    <div key={video.id} className={styles.videoCard}>
                        <div
                            className={styles.thumbnailWrapper}
                            onClick={() => setPlayingId(video.id)}
                        >
                            {!isPlaying ? (
                                <>
                                    <Image
                                        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                        alt={video.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className={styles.playButton}>
                                        <Play fill="currentColor" size={24} />
                                    </div>
                                </>
                            ) : (
                                <div className={styles.iframeWrapper}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.videoContent}>
                            <h2>{video.title}</h2>
                            {video.description && <p>{video.description}</p>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
