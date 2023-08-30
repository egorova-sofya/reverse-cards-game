import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import "./CircularProgress.css";
interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: number;
}

const CircularProgress: FC<Props> = ({ value, ...props }) => {
  return (
    <div {...props}>
      <svg
        className="progress__svg"
        width="80"
        height="80"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#5c03bc"></stop>
            <stop offset="70%" stopColor="#e536ab"></stop>
            <stop offset="100%" stopColor="#f4e5f0"></stop>
          </linearGradient>
        </defs>
        <circle
          className="progress__circle"
          style={{ animation: `grow ${value}ms linear forwards` }}
          cx="40"
          cy="40"
          r="30"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CircularProgress;
