import { useEffect, useRef } from "react";

const smallR = "2";
const bigR = "6";

import React from "react";
export default function BgPattern({ xCount = 20, yCount = 10, svgWidth = 1800, svgHeight = 600 }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const slimeRot = [
      { transform: `rotate(0)` },
      { transform: `rotate(60deg)` },
      { transform: `rotate(120deg)` },
      { transform: `rotate(180deg)` },
      { transform: `rotate(240deg)` },
      { transform: `rotate(300deg)` },
      { transform: `rotate(360deg)` },
    ];
    const slimeMorph = [
      { rx: smallR, ry: smallR },
      { rx: bigR, ry: smallR },
      { rx: smallR, ry: smallR },
    ];
    const Timing = {
      duration: 4000,
      iterations: 3,
    };

    const svg = svgRef.current;
    if (!svg) return;
    const slimeGs = svg.querySelectorAll(".slimeG");
    slimeGs.forEach((slimeG) => {
      let animation = null;
      let animationG = null;
      const slime = slimeG.querySelector(".slime");

      slimeG.addEventListener("mouseenter", () => {
        if (animationG) animationG.cancel();
        animationG = slimeG.animate(slimeRot, Timing);
        if (animation) animation.cancel();
        animation = slime.animate(slimeMorph, Timing);
      });

    });
  }, []);

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 300 100"
      fill="#336666"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: xCount * yCount }).map((_, i) => {
        const x = (150 / xCount) + (i % xCount) * (300 / xCount);
        const y = (50 / yCount) + Math.floor(i / xCount) * (100 / yCount);
        return (
          <g className="slimeG" key={i} transformOrigin={`${x} ${y}`}>
            <ellipse
              rx={smallR}
              ry={smallR}
              cx={x}
              cy={y}
              style={{ fill: "none", stroke: "lightblue", strokeWidth: "0.5pt", strokeOpacity: "0.4"}}
              className="slime"
            />
          </g>
        );
      })}
    </svg>
  );
}