import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture } from 'three';

// Soft round sprite so stars render as glowing dots instead of squares.
function makeDotTexture() {
  const size = 64;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.8)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new CanvasTexture(c);
}

function Stars({ count }) {
  const ref = useRef();
  const dot = useMemo(makeDotTexture, []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    // white, cyan, purple (linear RGB)
    const palette = [[1, 1, 1], [0.13, 0.81, 0.93], [0.53, 0.23, 0.97]];
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      col.set(palette[Math.random() < 0.8 ? 0 : Math.random() < 0.5 ? 1 : 2], i * 3);
    }
    return [pos, col];
  }, [count]);

  const still = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useFrame((state, delta) => {
    if (!ref.current || still) return;
    ref.current.rotation.y += delta * 0.015;
    ref.current.rotation.x += delta * 0.004;
    // gentle parallax toward the pointer
    const { x, y } = state.pointer;
    ref.current.position.x += (x * 0.4 - ref.current.position.x) * 0.02;
    ref.current.position.y += (y * 0.4 - ref.current.position.y) * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial map={dot} alphaTest={0.01} size={0.07} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

// Fixed, click-through star background shared by desktop and mobile.
export default function Starfield() {
  const small = typeof window !== 'undefined' && window.innerWidth < 768;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
      >
        <Stars count={small ? 1200 : 2500} />
      </Canvas>
    </div>
  );
}
