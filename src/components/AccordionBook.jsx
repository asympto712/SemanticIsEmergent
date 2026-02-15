import React, { useEffect, useRef } from "react";

const svgWidth = 800;
const svgHeight = 800;
const pageHeight = 14; // in the scale of 0-100
const pageWidth = 80; // in the scale of 0-100

// Props: list = [{ title: string, date: Date, link: string }]
export default function AccordionBook({ list }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    // Remove any previous pages
    Array.from(svg.querySelectorAll('.pageG')).forEach(g => g.remove());

    const patan = [
      { transform: "scale(1,-1)" },
      { transform: "scale(1,-0.6)", offset: 0.5 },
      { transform: "scale(1,-0.2)", offset: 0.75 },
      { transform: "scale(1,0)", offset: 0.825 },
      { transform: "scale(1,0.2)", offset: 0.875 },
      { transform: "scale(1,0.6)", offset: 0.95 },
      { transform: "scale(1,1)" }
    ];
    const patanTiming = {
      duration: 1000,
      iterations: 1,
      easing: "ease-in",
      fill: "forwards"
    };
    const fillColChange1 = [
      { fill: "#00ffff50" },
      { fill: "#00ffff50", offset: 0.825 },
      { fill: "#ff00ff50", offset: 0.826 },
      { fill: "#ff00ff50" }
    ];
    const fillColChange2 = [
      { fill: "#ff00ff50" },
      { fill: "#ff00ff50", offset: 0.825 },
      { fill: "#00ffff50", offset: 0.826 },
      { fill: "#00ffff50" }
    ];

    async function animatePages() {
      let flipped = false;
      const yOffset = 5;
      for (let i = 0; i < list.length; i++) {
        const n = i;
        // Create group for page
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'pageG');
        g.setAttribute('id', `g${n}`);
        g.setAttribute('transform-origin', `0 ${String(yOffset + (n) * pageHeight)}`);
        // Create rect
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('id', `rect${n}`);
        const theta = Math.PI / 6;
        const y = yOffset + (n) * pageHeight;
        let x = 10;
        if (flipped) x = 10 + pageHeight * Math.tan(theta);
        rect.setAttribute('transform-origin', `0 ${String(yOffset + (n) * pageHeight)}`);
        rect.setAttribute('x', String(x));
        rect.setAttribute('y', String(y));
        rect.setAttribute('width', String(pageWidth));
        rect.setAttribute('height', String(pageHeight));
        if (flipped) {
          rect.setAttribute('transform', 'skewX(-30)');
          rect.setAttribute('style', 'fill:#00ffff50;stroke:#aaa;stroke-width:0.2;');
        } else {
          rect.setAttribute('transform', 'skewX(30)');
          rect.setAttribute('style', 'fill:#ff00ff50;stroke:#666;stroke-width:0.2;');
        }
        g.appendChild(rect);
        // Create foreignObject for HTML content
        const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        fo.setAttribute('x', String(x));
        fo.setAttribute('y', String(y));
        fo.setAttribute('width', String(pageWidth));
        fo.setAttribute('height', String(pageHeight));
        fo.innerHTML = `<div style='display:flex;flex-direction:column;align-items:center;justify-content:center;width:80%;height:80%;font-size:2px;'>
          <a href='${list[i].link}' style='text-decoration:none;'>${list[i].title}</a> <br/>
          <span>${new Date(list[i].date).toLocaleDateString()}</span>
        </div>`;
        g.appendChild(fo);
        svg.appendChild(g);
        // Animate
        const anim = g.animate(patan, patanTiming);
        let colorChange;
        if (flipped) colorChange = rect.animate(fillColChange2, patanTiming);
        else colorChange = rect.animate(fillColChange1, patanTiming);
        flipped = !flipped;
        await anim.finished;
      }
    }
    animatePages();
  }, [list]);

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ border: '1px solid #333' }}
    >
      {/* Pages will be rendered dynamically */}
    </svg>
  );
}
