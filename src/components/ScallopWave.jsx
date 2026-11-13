export default function ScallopWave({ color = "#cc1b29", stroke = "#ffffff", height = 20, className = "" }) {
  return (
    <div className={`scallop-wave-wrapper ${className}`} style={{ width: '100%', height: `${height}px`, overflow: 'hidden', lineHeight: 0 }}>
      <svg
        viewBox="0 0 600 20"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        {/* Underneath solid fill */}
        <path
          d="M 0,0 C 25,18 75,18 100,0 C 125,18 175,18 200,0 C 225,18 275,18 300,0 C 325,18 375,18 400,0 C 425,18 475,18 500,0 C 525,18 575,18 600,0 L 600,22 L 0,22 Z"
          fill={color}
        />
        {/* Crisp white accent stroke line */}
        <path
          d="M 0,0 C 25,18 75,18 100,0 C 125,18 175,18 200,0 C 225,18 275,18 300,0 C 325,18 375,18 400,0 C 425,18 475,18 500,0 C 525,18 575,18 600,0"
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
