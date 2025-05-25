import React from "react";

interface PhotoSessionProps {
    userSelections: {
        stripType: '4x1' | '3x2' | '6x1';
        background?: string;
        filter?: string;
    };
}

export default function PhotoSession({ userSelections }: PhotoSessionProps) {
    const { stripType } = userSelections;
    const getPhotoCount = (stripType: string): number => {
        const [rows, cols] = stripType.split('x').map(Number);
        return rows * cols;
    };
    const numberOfPhotos = getPhotoCount(stripType);
    
    return (
        <div className="photo-session">
            <h1>Photo Session - {stripType} Layout</h1>
            <p>Total photos to take: {numberOfPhotos}</p>
        </div>
    );
}