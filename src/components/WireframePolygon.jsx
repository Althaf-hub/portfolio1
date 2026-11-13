export default function WireframePolygon({ style = {}, className = "", size = 130, showAxis = false }) {
  return (
    <div
      className={`wireframe-polygon-wrap ${className}`}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {showAxis && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-15%',
            right: '-15%',
            height: '1px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.45)',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* 3D Wireframe Polyhedral Cube */}
      <svg
        viewBox="0 0 200 200"
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: 'center center',
          overflow: 'visible',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
        }}
      >
        <defs>
          <radialGradient id="cubeCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central aura glow */}
        <circle cx="100" cy="100" r="42" fill="url(#cubeCoreGlow)" />

        {/* Outer Irregular Silhouette Polygon (Matching Neutomni signature) */}
        <polygon
          points="100,20 175,65 155,160 45,150 25,75"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 3D Wireframe Facet Lines to Central Hub */}
        <line x1="100" y1="20" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" />
        <line x1="175" y1="65" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" />
        <line x1="155" y1="160" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" />
        <line x1="45" y1="150" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" />
        <line x1="25" y1="75" x2="100" y2="100" stroke="#ffffff" strokeWidth="1.6" />

        {/* Diagonal Depth Struts */}
        <line x1="25" y1="75" x2="155" y2="160" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="175" y1="65" x2="45" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Center Glowing Hub */}
        <circle cx="100" cy="100" r="4" fill="#ffffff" />

        {/* Corner Vertex Anchor Points */}
        <circle cx="100" cy="20" r="2.8" fill="#ffffff" />
        <circle cx="175" cy="65" r="2.8" fill="#ffffff" />
        <circle cx="155" cy="160" r="2.8" fill="#ffffff" />
        <circle cx="45" cy="150" r="2.8" fill="#ffffff" />
        <circle cx="25" cy="75" r="2.8" fill="#ffffff" />
      </svg>
    </div>
  )
}
