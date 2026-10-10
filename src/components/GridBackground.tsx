import { useEffect, useRef } from 'react';

interface GridBackgroundProps {
  animate: boolean;
}

export default function GridBackground({ animate }: GridBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || !svgRef.current) return;
    const lines = svgRef.current.querySelectorAll<SVGLineElement | SVGPathElement>('[data-draw]');
    lines.forEach((el, i) => {
      const len = (el as SVGGeometryElement).getTotalLength?.() ?? 300;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.transition = `stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 0.1 + 0.2}s`;
      requestAnimationFrame(() => { el.style.strokeDashoffset = '0'; });
    });
  }, [animate]);

  return (
    <svg
      ref={svgRef}
      className="hero__grid"
      aria-hidden="true"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Horizontal guides */}
      <line data-draw x1="0" y1="178" x2="1280" y2="178" stroke="#242B32" strokeWidth="1" />
      <line data-draw x1="0" y1="356" x2="1280" y2="356" stroke="#242B32" strokeWidth="1" />
      <line data-draw x1="0" y1="534" x2="1280" y2="534" stroke="#242B32" strokeWidth="1" />

      {/* Vertical guides */}
      <line data-draw x1="64"  y1="0" x2="64"  y2="720" stroke="#242B32" strokeWidth="1" />
      <line data-draw x1="500" y1="0" x2="500" y2="720" stroke="#242B32" strokeWidth="1" />
      <line data-draw x1="780" y1="0" x2="780" y2="720" stroke="#242B32" strokeWidth="1" />
      <line data-draw x1="1216" y1="0" x2="1216" y2="720" stroke="#242B32" strokeWidth="1" />

      {/* Secondary verticals — right side */}
      <line data-draw x1="920" y1="80" x2="920" y2="640" stroke="#242B32" strokeWidth="0.6" opacity="0.5" />

      {/* Crosshair markers */}
      {[[500,178],[780,178],[500,356],[780,356],[500,534],[780,534]].map(([x,y],i)=>(
        <g key={i}>
          <line x1={x-7} y1={y} x2={x+7} y2={y} stroke="#343B43" strokeWidth="1.2" />
          <line x1={x} y1={y-7} x2={x} y2={y+7} stroke="#343B43" strokeWidth="1.2" />
        </g>
      ))}

      {/* Coral cross markers */}
      {[[920,178],[920,356]].map(([x,y],i)=>(
        <g key={`coral-${i}`}>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#FF8066" strokeWidth="1" opacity="0.5" />
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#FF8066" strokeWidth="1" opacity="0.5" />
        </g>
      ))}

      {/* Coral small squares */}
      <rect x="497" y="353" width="6" height="6" fill="#FF8066" opacity="0.35" />
      <rect x="777" y="531" width="6" height="6" fill="#FF8066" opacity="0.25" />

      {/* Row number labels on left */}
      <text x="40" y="184" fontFamily="IBM Plex Mono" fontSize="9" fill="#69717B" opacity="0.5">01</text>
      <text x="40" y="362" fontFamily="IBM Plex Mono" fontSize="9" fill="#69717B" opacity="0.5">02</text>
      <text x="40" y="540" fontFamily="IBM Plex Mono" fontSize="9" fill="#69717B" opacity="0.5">03</text>

      {/* Coordinate label */}
      <text x="786" y="172" fontFamily="IBM Plex Mono" fontSize="7" fill="#69717B" opacity="0.35">x:500 y:178</text>

      {/* Right far border line */}
      <line data-draw x1="1240" y1="0" x2="1240" y2="720" stroke="#242B32" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}
