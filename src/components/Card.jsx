import React from "react";

const Card = ({ title, desc }) => {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-dm-surface border shadow-sm">
      <h3 className="text-lg font-semibold text-dark dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-dm-muted">{desc}</p>
    </div>
  );
};

export default Card;
