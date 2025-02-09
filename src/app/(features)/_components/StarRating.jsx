

import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-500" />
        ))}

      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
        ))}
    </div>
  );
};

export default StarRating;
