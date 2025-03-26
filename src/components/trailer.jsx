import React from "react";

const Trailer = ({ videoKey }) => {
  if (!videoKey) return null;
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4">Trailer</h3>
      <div className="relative" style={{ paddingBottom: "56.25%", height: 0 }}>
        <iframe
          title="Trailer"
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
