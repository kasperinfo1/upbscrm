import React from 'react';
import "./CircularProgressBar.css";

const CircularProgressBar = ({ percentage, color, background }) => {
  const radius = 50;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="circular-progress-bar"
    >
      <defs>
        <filter id="inset-shadow">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feFlood floodColor="black" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        className="background-circle"
        stroke="rgba(255,255,255,.8)"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="progress-circle"
        stroke={background}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        filter="url(#inset-shadow)"
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="20px"
        fill={color}
        className="progress-text"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
