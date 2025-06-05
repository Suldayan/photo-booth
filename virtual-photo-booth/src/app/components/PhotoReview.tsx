import React from "react";

interface PhotoReviewProps {
  photos: string[];
}

export default function PhotoReview({ photos = [] }: PhotoReviewProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Photo Review ({photos.length} photos)</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <img 
              src={photo} 
              alt={`Photo ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-2 text-sm text-gray-600">
              Photo {index + 1}
            </div>
          </div>
        ))}
      </div>
      {photos.length === 0 && (
        <p className="text-gray-500 text-center py-8">No photos to display</p>
      )}
    </div>
  );
}