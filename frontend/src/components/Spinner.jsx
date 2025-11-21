import React from 'react';


export default function Spinner({size = 48, color = '#555'}) {
  const strokeWidth = 4;
  const center = size / 2;
  const radius = center - strokeWidth;

  
return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="presentation"
    >
      <g fill="none" strokeWidth={strokeWidth} strokeLinecap="round">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          opacity={0.15}
        />
        <path
          d={`M ${center} ${center} m 0 -${radius} a ${radius} ${radius} 0 0 1 0 ${
            radius * 2
          }`}
          stroke={color}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${center} ${center}`}
            to={`360 ${center} ${center}`}
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </svg>
  );
}

