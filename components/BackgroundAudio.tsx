import React, { useEffect, useRef, useState } from 'react';

const BackgroundAudio: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audio1Ref = useRef<HTMLAudioElement | null>(null);
    const audio2Ref = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Initialize standard volume (Mid volume as requested)
        if (audio1Ref.current) audio1Ref.current.volume = 0.5;
        if (audio2Ref.current) audio2Ref.current.volume = 0.5;

        // Attempt auto-play on mount
        const playAudio = async () => {
            try {
                if (audio1Ref.current) await audio1Ref.current.play();
                if (audio2Ref.current) await audio2Ref.current.play();
                setIsPlaying(true);
            } catch (err) {
                // Auto-play policies might block this; user interaction required
                console.log("Audio auto-play blocked by browser policy. Waiting for user interaction.");
                setIsPlaying(false);
            }
        };

        playAudio();
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audio1Ref.current?.pause();
            audio2Ref.current?.pause();
        } else {
            audio1Ref.current?.play();
            audio2Ref.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {/* Hidden Audio Elements */}
            <audio ref={audio1Ref} loop src="/audio/track-1.mp4" />
            <audio ref={audio2Ref} loop src="/audio/track-2.mp4" />

            {/* Subtle Floating Control */}
            <button
                onClick={togglePlay}
                className="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-tan hover:scale-110 transition-transform duration-300 border border-charcoal/5 group"
                aria-label={isPlaying ? "Mute Background Audio" : "Play Background Audio"}
            >
                {isPlaying ? (
                    <div className="relative">
                        {/* Sound Wave Animation */}
                        <div className="absolute -top-3 -right-3 w-2 h-2 bg-tan/40 rounded-full animate-ping"></div>
                        <svg className="w-5 h-5 text-tan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </div>
                ) : (
                    <svg className="w-5 h-5 text-charcoal/40 group-hover:text-charcoal transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                )}
            </button>
        </>
    );
};

export default BackgroundAudio;
