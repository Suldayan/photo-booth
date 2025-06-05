import React, { useState, useRef, useEffect } from "react";
import { FILTER_OPTIONS } from "@/app/constants/filterOptions";
import { UserSelections } from "@/app/types/types";

interface PhotoSessionProps {
    userSelections: UserSelections;
    onNext: (photos: string[]) => void;
}

export default function PhotoSession({ onNext, userSelections = { stripType: '4x1' } }: PhotoSessionProps) {
    const { stripType } = userSelections;
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [photos, setPhotos] = useState<string[]>([]);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [autoNextPhoto, setAutoNextPhoto] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [showCaptureButton, setShowCaptureButton] = useState(true);
    const [showFilterSelection, setShowFilterSelection] = useState(true);
    const isStartingRef = useRef(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
    
    const getPhotoCount = (stripType: string): number => {
        const [rows, cols] = stripType.split('x').map(Number);
        return rows * cols;
    };
    const numberOfPhotos = getPhotoCount(stripType);

    useEffect(() => {
        if (autoNextPhoto) {
            console.log('[useEffect] Setting up auto photo timer', {
                photosLength: photos.length,
                numberOfPhotos,
                autoNextPhoto
            });
            
            const timer = setTimeout(() => {
                console.log('[useEffect] Auto photo timer fired');
                setAutoNextPhoto(false);
                startCountdown();
            }, 2500);
            
            return () => {
                console.log('[useEffect] Cleaning up timer');
                clearTimeout(timer);
            };
        }
    }, [autoNextPhoto]); 

    // Handle session completion
    useEffect(() => {
        if (photos.length >= numberOfPhotos && !sessionComplete) {
            setTimeout(() => {
                setSessionComplete(true);
                setIsCapturing(false);
                setAutoNextPhoto(false);
            }, 800);
        }
    }, [photos.length, numberOfPhotos, sessionComplete]);

    useEffect(() => {
        startCamera();
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            setCameraError(null);
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280, min: 640 },
                    height: { ideal: 720, min: 480 }
                },
                audio: false
            });
            
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.onloadedmetadata = () => {
                    setCameraReady(true);
                };
            }
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing camera:', error);
            setCameraError('Camera access denied.');
        }
    };

    const capturePhoto = () => {
        console.log('[capturePhoto] Function called');
        
        if (!videoRef.current) {
            console.error('[capturePhoto] Video reference is null');
            return;
        }
        
        if (!canvasRef.current) {
            console.error('[capturePhoto] Canvas reference is null');
            return;
        }
        
        if (!cameraReady) {
            console.warn('[capturePhoto] Camera is not ready yet');
            return;
        }
        
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext('2d');
        
        console.log('[capturePhoto] Video dimensions:', {
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState
        });
        
        if (!ctx) {
            console.error('[capturePhoto] Failed to get 2D context from canvas');
            return;
        }
        
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            console.error('[capturePhoto] Invalid video dimensions', {
                videoWidth: video.videoWidth,
                videoHeight: video.videoHeight
            });
            return;
        }
        
        try {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            console.log('[capturePhoto] Canvas dimensions set to:', {
                width: canvas.width,
                height: canvas.height
            });
            
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
            ctx.restore();
            
            console.log('[capturePhoto] Image drawn to canvas with mirror effect');
            
            // Capture and save the photo
            const photoDataUrl = canvas.toDataURL('image/jpeg', 0.95);
            const photoSizeKB = Math.round((photoDataUrl.length * 3/4) / 1024);
            
            console.log('[capturePhoto] Photo captured successfully', {
                dataUrlLength: photoDataUrl.length,
                estimatedSizeKB: photoSizeKB,
                format: 'image/jpeg',
                quality: 0.95
            });

            const newPhotoCount = photos.length + 1;
            setPhotos(prevPhotos => {
                const updatedPhotos = [...prevPhotos, photoDataUrl];
                console.log('[capturePhoto] Photo added to collection', {
                    previousCount: prevPhotos.length,
                    newCount: updatedPhotos.length,
                    totalTarget: numberOfPhotos
                });
                return updatedPhotos;
            });

            // Reset capturing state and trigger next photo if needed
            setTimeout(() => {
                console.log('[capturePhoto] Resetting capture state after 600ms delay');
                setIsCapturing(false);
                
                if (newPhotoCount < numberOfPhotos) {
                    console.log('[capturePhoto] Triggering next photo', {
                        currentCount: newPhotoCount,
                        targetCount: numberOfPhotos,
                        remaining: numberOfPhotos - newPhotoCount
                    });
                    setAutoNextPhoto(true);
                } else {
                    console.log('[capturePhoto] Photo sequence completed', {
                        totalCaptured: newPhotoCount,
                        targetCount: numberOfPhotos
                    });
                }
            }, 600);
            
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            const errorStack = error instanceof Error ? error.stack : undefined;
            
            console.error('[capturePhoto] Error during photo capture:', {
                error: errorMessage,
                stack: errorStack,
                errorType: typeof error,
                videoState: {
                    readyState: video.readyState,
                    videoWidth: video.videoWidth,
                    videoHeight: video.videoHeight
                }
            });
            setIsCapturing(false);
        }
    };

    const startCountdown = () => {
        console.log('[startCountdown] Called');
        
        if (isCapturing || sessionComplete || !cameraReady || isStartingRef.current || isCountingDown) {
            console.log('[startCountdown] Blocked by guards');
            return;
        }
        
        setIsCountingDown(true); 
        isStartingRef.current = true;
        setIsCapturing(true);
        setCountdown(3);
        
        console.log('[startCountdown] Starting countdown');
        
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                console.log('[countdown] Tick:', prev);
                
                if (prev === 1) {
                    clearInterval(countdownInterval);
                    setIsCountingDown(false); 
                    console.log('[countdown] Finished, capturing photo in 200ms');
                    
                    setTimeout(() => {
                        capturePhoto();
                        setCountdown(null);
                        isStartingRef.current = false; 
                    }, 200);
                    return null;
                }
                return prev ? prev - 1 : null;
            });
        }, 1000);
    };

    const handleCaptureClick = () => {
        console.log('[handleCaptureClick] Button clicked');
        setShowCaptureButton(false);
        setShowFilterSelection(false); 
        startCountdown(); 
    };

    const handleFilterChange = (filter: typeof FILTER_OPTIONS[0]) => {
        console.log('[handleFilterChange] Filter selected:', filter.name);
        setSelectedFilter(filter);
    };

    useEffect(() => {
        if (sessionComplete) {
            onNext(photos);
        }
    }, [sessionComplete]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-7xl flex gap-8 items-start">
                {/* Main Camera Section */}
                <div className="flex-1 max-w-4xl">
                    {/* Camera Container */}
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                        <div className="relative bg-gray-100">
                            {cameraError ? (
                                <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                    <div className="text-center p-8">
                                        <div className="text-6xl mb-4">📷</div>
                                        <p className="text-gray-600 font-medium">{cameraError}</p>
                                        <button 
                                            onClick={startCamera}
                                            className="mt-4 px-6 py-2 bg-pink-400 text-white rounded-full font-medium hover:bg-pink-500 transition-colors"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-[500px] object-cover transform scale-x-[-1]"
                                    style={{ filter: cameraReady ? selectedFilter.css : 'blur(2px)' }}
                                />
                            )}
                            
                            {/* Filter Overlay */}
                            {selectedFilter.overlay && cameraReady && (
                                <div 
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ 
                                        background: selectedFilter.overlay,
                                        mixBlendMode: selectedFilter.mixBlendMode || 'normal'
                                    }}
                                />
                            )}
                            
                            {/* Loading Overlay */}
                            {!cameraReady && !cameraError && (
                                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-400 rounded-full animate-spin mb-4"></div>
                                        <p className="text-gray-600 font-medium">PREPARING YOUR BOOTH...</p>
                                    </div>
                                </div>
                            )}
                            
                            {/* Countdown Overlay */}
                            {countdown && (
                                <div className="absolute inset-0 bg-transparent bg-opacity-50 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="text-8xl font-black text-white animate-bounce drop-shadow-2xl">
                                            {countdown}
                                        </div>
                                        <div className="absolute inset-0 text-8xl font-black text-pink-400 animate-ping opacity-40">
                                            {countdown}
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Status Indicators */}
                            <div className="absolute top-4 left-4 flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-full">
                                    <div className={`w-3 h-3 rounded-full ${cameraReady ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`}></div>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {photos.length}/{numberOfPhotos}
                                    </span>
                                </div>
                                
                                {/* Current Filter Indicator */}
                                {selectedFilter.name !== "None" && cameraReady && (
                                    <div className="bg-purple-500 bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-full">
                                        <span className="text-sm font-semibold text-white">
                                            {selectedFilter.name}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Photo taken indicator */}
                            {countdown === null && isCapturing && (
                                <div className="absolute inset-0 bg-white animate-pulse opacity-50 pointer-events-none"></div>
                            )}

                            {/* Next photo indicator */}
                            {autoNextPhoto && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-pink-400 text-white px-4 py-2 rounded-full font-medium animate-bounce">
                                        Get ready for the next photo!
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Control Bar */}
                        <div className="bg-white px-6 py-6 border-t border-gray-100">
                            <div className="flex justify-center">
                                {showCaptureButton && (
                                    <button
                                        onClick={handleCaptureClick}
                                        disabled={isCapturing || !cameraReady}
                                        className={`
                                            px-12 py-4 font-bold text-lg tracking-wide transition-all duration-300 transform rounded-full
                                            ${isCapturing || !cameraReady
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                                            }
                                        `}
                                    >
                                        📸 START
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filter Selection */}
                        {showFilterSelection && (
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-6 border-t border-gray-100">
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Choose Your Filter</h3>
                                    <p className="text-sm text-gray-600">Select a filter to enhance your photos</p>
                                </div>
                                
                                {/* Filter Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                                    {FILTER_OPTIONS.map((filter, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleFilterChange(filter)}
                                            disabled={!cameraReady}
                                            className={`
                                                relative p-3 rounded-xl border-2 transition-all duration-300 transform
                                                ${selectedFilter.name === filter.name
                                                    ? 'border-pink-400 bg-pink-50 scale-105 shadow-lg'
                                                    : 'border-gray-200 bg-white hover:border-pink-200 hover:scale-102'
                                                }
                                                ${!cameraReady ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
                                            `}
                                        >
                                            {/* Filter Preview Circle */}
                                            <div className="relative mb-2">
                                                <div 
                                                    className={`
                                                        w-12 h-12 mx-auto rounded-full border-2 border-gray-300 
                                                        ${filter.name === 'None' 
                                                            ? 'bg-gradient-to-br from-gray-100 to-gray-200' 
                                                            : 'bg-gradient-to-br from-pink-200 to-purple-200'
                                                        }
                                                    `}
                                                    style={{
                                                        filter: filter.css,
                                                        background: filter.overlay || undefined
                                                    }}
                                                />
                                                {selectedFilter.name === filter.name && (
                                                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Filter Name */}
                                            <div className="text-center">
                                                <div className="text-xs font-semibold text-gray-800 mb-1 leading-tight">
                                                    {filter.name}
                                                </div>
                                                <div className="text-xs text-gray-500 leading-tight">
                                                    {filter.description}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Selected Filter Info */}
                                <div className="mt-4 text-center">
                                    <div className="inline-block bg-white px-4 py-2 rounded-full border border-pink-200">
                                        <span className="text-sm font-medium text-gray-700">
                                            Selected: <span className="text-pink-600 font-semibold">{selectedFilter.name}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Photo Strip Preview */}
                <div className="w-80">
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 px-6 py-3 text-white font-bold rounded-full text-sm tracking-wide shadow-lg">
                                📷 PHOTO STRIP
                            </div>
                        </div>
                        
                        {/* Photo Grid */}
                        <div className={`
                            grid gap-3 mb-6
                            ${stripType === '4x1' ? 'grid-cols-1' : ''}
                            ${stripType === '3x2' ? 'grid-cols-2' : ''}
                            ${stripType === '6x1' ? 'grid-cols-1' : ''}
                        `}>
                            {Array.from({ length: numberOfPhotos }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`
                                        relative overflow-hidden transition-all duration-500 transform rounded-2xl
                                        ${stripType === '6x1' ? 'h-20' : 'h-24'}
                                        ${photos[index] 
                                            ? 'border-3 border-pink-300 shadow-lg scale-100 bg-white' 
                                            : index === photos.length
                                                ? 'border-3 border-dashed border-pink-300 bg-gradient-to-br from-pink-50 to-purple-50 animate-pulse scale-105'
                                                : 'border-3 border-gray-200 bg-gray-50 scale-95'
                                        }
                                        aspect-square
                                    `}
                                >
                                    {photos[index] ? (
                                        <>
                                            <img
                                                src={photos[index]}
                                                alt={`Photo ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-1 right-1 bg-pink-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                                {index + 1}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {index === photos.length ? (
                                                <div className="text-pink-400 text-2xl animate-bounce">📸</div>
                                            ) : (
                                                <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
}