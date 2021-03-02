import React from "react";

const Arrow = ({ className }) => {
  return (
    <svg
      className={className}
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.5 1L6.5 9L12.5 1" stroke="white" />
    </svg>
  );
};

export default Arrow;
