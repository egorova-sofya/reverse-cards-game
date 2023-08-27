import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import "./CircularProgress.css";
interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: number;
}

const CircularProgress: FC<Props> = ({ value, ...props }) => {
  const percentOfCircleFilling = 250 - 250 * value * 0.01;

  const style = {
    "--circle-shift": percentOfCircleFilling,
  } as React.CSSProperties;

  return (
    <div style={style} {...props}>
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
