'use client';

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  Cylinder,
  Box,
  Plane,
  Text,
  Decal,
  useTexture
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';
import React from 'react';

// Typing Text Effect for Premium Process Animation
function WritingText({ text, position, fontSize, color, anchorX, anchorY = "middle", maxWidth, delay, onComplete, fontStyle, fontWeight }: any) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeoutId: any;
    let i = 0;
    const startWriting = () => {
      timeoutId = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(timeoutId);
          if (onComplete) onComplete();
        }
      }, 15); // Faster typing speed to keep animation brisk
    };

    const initialDelay = setTimeout(startWriting, delay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeoutId);
    };
  }, [text, delay, onComplete]);

  return (
    <Text
      position={position}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY={anchorY}
      maxWidth={maxWidth}
      lineHeight={1.4}
      fontStyle={fontStyle}
      fontWeight={fontWeight}
      outlineWidth={0.001}
      outlineColor={color}
    >
      {displayedText}
    </Text>
  );
}

// The Flying Government Document
function FlyingDocument({ onSettled, onFinishedWriting, isApproved, showRedStamp }: { onSettled: () => void, onFinishedWriting: () => void, isApproved: boolean, showRedStamp: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const [phase, setPhase] = useState<'flying' | 'settled'>('flying');
  const startTime = useRef(Date.now());

  const { viewport } = useThree();
  const isMobile = viewport.width < 8; // Safely catches mobile/tablet portrait bounds where layout would clip

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;

    if (phase === 'flying') {
      const flightDuration = 2.0;
      const t = Math.min(elapsed / flightDuration, 1);

      const easeOut = 1 - Math.pow(1 - t, 3);

      const startX = -6;
      const endX = isMobile ? 0 : 3.0; // Center safely on mobile, push right on desktop
      const startY = 4;
      const endY = isMobile ? 0 : 0.5; // Center vertically on mobile

      const currentX = THREE.MathUtils.lerp(startX, endX, easeOut);
      const currentY = THREE.MathUtils.lerp(startY, endY, easeOut) + Math.sin(t * Math.PI) * 1.5;
      const currentZ = Math.sin(t * Math.PI) * 2 - t;

      meshRef.current.position.set(currentX, currentY, currentZ);

      const targetRotX = 0;
      const targetRotY = -0.10;
      const targetRotZ = 0;

      const rotY = THREE.MathUtils.lerp(Math.PI * -2, targetRotY, easeOut);
      const rotX = THREE.MathUtils.lerp(Math.PI * 4, targetRotX, easeOut);
      const rotZ = THREE.MathUtils.lerp(Math.PI, targetRotZ, easeOut);

      meshRef.current.rotation.set(rotX, rotY, rotZ);

      // Dynamic scaling: small when flying, much larger when landing
      const startScale = 0.42;
      const endScale = isMobile ? 1.25 : 1.30; // Increased mobile sizing slightly to look bigger 
      const currentScale = THREE.MathUtils.lerp(startScale, endScale, easeOut);
      meshRef.current.scale.set(currentScale, currentScale, currentScale);

      if (t >= 1) {
        setPhase('settled');
        onSettled();
        startTime.current = Date.now();
      }
    } else {
      // Settled visually perfectly static (no post-attach bobbing animation)
      const endY = isMobile ? 0 : 0.5;
      meshRef.current.position.y = endY;
      meshRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={meshRef} scale={0.42}>
      <mesh castShadow receiveShadow>
        <Plane args={[2.1, 2.97]}>
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
        </Plane>
      </mesh>

      {/* Decorative Golden Border replacing wireframe diagonal lines */}
      <mesh position={[0, 1.38, 0.01]}>
        <Plane args={[1.90, 0.01]}><meshBasicMaterial color="#d4af37" /></Plane>
      </mesh>
      <mesh position={[0, -1.38, 0.01]}>
        <Plane args={[1.90, 0.01]}><meshBasicMaterial color="#d4af37" /></Plane>
      </mesh>
      <mesh position={[0.95, 0, 0.01]}>
        <Plane args={[0.01, 2.76]}><meshBasicMaterial color="#d4af37" /></Plane>
      </mesh>
      <mesh position={[-0.95, 0, 0.01]}>
        <Plane args={[0.01, 2.76]}><meshBasicMaterial color="#d4af37" /></Plane>
      </mesh>

      {/* Realistic Document Content Reveal */}
      {phase === 'settled' && (
        <group position={[0, 0, 0.02]}>
          {/* Ashoka Chakra / Logo Placeholder */}
          <group position={[0, 1.15, 0]}>
            <mesh>
              <circleGeometry args={[0.12, 32]} />
              <meshBasicMaterial color="#d4b254" />
            </mesh>
            <mesh position={[0, 0, 0.001]}>
              <circleGeometry args={[0.09, 32]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          <WritingText
            text="GOVERNMENT OF INDIA"
            position={[0, 0.9, 0]}
            fontSize={0.08}
            color="#0f172a"
            anchorX="center"
            fontWeight="bold"
            delay={200}
          />
          <WritingText
            text="MINISTRY OF CORPORATE AFFAIRS"
            position={[0, 0.82, 0]}
            fontSize={0.05}
            color="#334155"
            anchorX="center"
            delay={500}
          />

          <mesh position={[0, 0.72, 0]}>
            <Plane args={[1.5, 0.005]}>
              <meshBasicMaterial color="#e2e8f0" />
            </Plane>
          </mesh>

          <WritingText
            text="CERTIFICATE OF REGISTRATION"
            position={[0, 0.6, 0]}
            fontSize={0.09}
            color="#1e293b"
            anchorX="center"
            fontWeight="bold"
            delay={900}
          />

          <WritingText
            text={"Registration No.  : LS-2026-X92\nDate of Issue      : Acknowledged\nCategory           : Business Operations"}
            position={[-0.8, 0.35, 0]}
            fontSize={0.055}
            color="#334155"
            anchorX="left"
            delay={1400}
          />

          <WritingText
            text={"This is to certify that the business entity has been\nduly registered and verified in accordance with the\nprovisions of the law."}
            position={[-0.8, 0.0, 0]}
            fontSize={0.05}
            color="#475569"
            anchorX="left"
            delay={2000}
          />

          <WritingText
            text={"The digital signature validates this document\nunder the Digital India initiative."}
            position={[-0.8, -0.3, 0]}
            fontSize={0.045}
            color="#64748b"
            anchorX="left"
            delay={2600}
          />

          <WritingText
            text="Authorized Signatory"
            position={[0.55, -0.9, 0]}
            fontSize={0.045}
            color="#0f172a"
            anchorX="center"
            fontWeight="bold"
            delay={3100}
            onComplete={onFinishedWriting}
          />
          <mesh position={[0.55, -0.8, 0]}>
            <Plane args={[0.5, 0.002]}>
              <meshBasicMaterial color="#94a3b8" />
            </Plane>
          </mesh>

          {/* Nest the APPROVED seal exactly over the signature so it scales and floats with the paper */}
          {showRedStamp && (
            <group position={[0.55, -0.9, 0.02]} scale={0.4}>
              <mesh rotation={[0, 0, 0.3]}>
                <ringGeometry args={[0.7, 0.8, 32]} />
                <meshBasicMaterial color="#dc2626" opacity={0.85} transparent />
              </mesh>
              <mesh rotation={[0, 0, 0.3]}>
                <Plane args={[1.5, 0.4]}>
                  <meshBasicMaterial transparent opacity={0.0} color="#dc2626" />
                </Plane>
                <Text fontSize={0.22} color="#dc2626" position={[0, 0, 0.01]} fontStyle="italic" fontWeight="bold">APPROVED</Text>
                <Text fontSize={0.05} color="#dc2626" position={[0, -0.18, 0.01]}>DIGITAL SIGNATURE SECURED</Text>
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
}

// The Premium Gold/Brass Government Stamp (Smaller and removes itself)
function LegalStamp({ trigger, onHit }: { trigger: boolean, onHit: () => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [stamped, setStamped] = useState(false);
  const startTime = useRef(0);

  const { viewport } = useThree();
  const isMobile = viewport.width < 8; // Sync threshold to ensure Stamp logic drops correctly centered
  const endX = isMobile ? 0 : 3.0; // Safe sync with FlyingDocument 
  const endY = isMobile ? 0 : 0.5;
  const scale = isMobile ? 1.25 : 1.30;

  // Dynamically calculate drop coordinates mapped exactly to the paper position
  // 0.55 local offset mapped to World X space. Shifted slightly left visually to perfectly hit the center of the text bounds
  const targetX = endX + (0.55 * scale * Math.cos(-0.10)) - 0.15;
  const targetY = endY + (-0.9 * scale);

  useFrame((state) => {
    if (!groupRef.current || !trigger) return;
    if (startTime.current === 0) startTime.current = state.clock.elapsedTime;

    const t = (state.clock.elapsedTime - startTime.current);

    // Pure Drop -> Hit -> Instant Fly away sequence 
    if (t < 0.3) {
      // Fast straight fall directly onto coordinates
      const progress = t / 0.3;
      groupRef.current.position.y = THREE.MathUtils.lerp(12, targetY, Math.pow(progress, 3));
      groupRef.current.position.x = targetX;
      groupRef.current.rotation.set(0, -0.15, 0); // locked straight alignment
    } else if (t < 0.5) {
      // Instant Impact locking (Hit!)
      groupRef.current.position.y = targetY;
      groupRef.current.position.x = targetX;
      if (!stamped) {
        setStamped(true);
        onHit(); // Only trigger the red text to appear perfectly on impact!
      }
    } else {
      // Instant zing away exactly as requested ("lgne k baad me hi htni chahiyea")
      const progress = Math.min((t - 0.5) / 0.3, 1);
      groupRef.current.position.y = THREE.MathUtils.lerp(targetY, 15, Math.pow(progress, 2));
      groupRef.current.position.x = THREE.MathUtils.lerp(targetX, targetX + 5.0, Math.pow(progress, 2));
    }
  });

  return (
    <group ref={groupRef} position={[targetX, 8, 0.6]} rotation={[0, -0.15, 0]} scale={isMobile ? 0.12 : 0.15}>
      {/* Handle Grip */}
      <Cylinder args={[0.2, 0.3, 0.8, 32]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#111" roughness={0.3} metalness={0.8} />
      </Cylinder>
      {/* Brass Neck */}
      <Cylinder args={[0.3, 0.5, 0.4, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
      </Cylinder>
      {/* Brass Base Layer 1 */}
      <Cylinder args={[0.5, 0.6, 0.1, 32]} position={[0, -0.25, 0]}>
        <meshStandardMaterial color="#daa520" metalness={0.9} roughness={0.3} />
      </Cylinder>
      {/* Final Flat Stamp Plate */}
      <Cylinder args={[0.65, 0.65, 0.1, 32]} position={[0, -0.35, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.8} />
      </Cylinder>
    </group>
  );
}

function SceneContent() {
  const { size } = useThree();
  const [isSettled, setIsSettled] = useState(false);
  const [isWritingFinished, setIsWritingFinished] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [stampHit, setStampHit] = useState(false); // Explicit hit tracker
  const { theme, resolvedTheme } = useTheme();

  const isDark = (resolvedTheme || theme) === 'dark';

  useEffect(() => {
    if (isWritingFinished) {
      // Stamp arrives shortly after writing finishes
      const timer = setTimeout(() => setIsApproved(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [isWritingFinished]);

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 1} color="#fff" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#4f46e5" />
      <spotLight position={[0, 10, 20]} angle={0.2} penumbra={1} intensity={2} castShadow color={isDark ? "#8b5cf6" : "#ffffff"} />

      <FlyingDocument
        onSettled={() => setIsSettled(true)}
        onFinishedWriting={() => setIsWritingFinished(true)}
        isApproved={isApproved}
        showRedStamp={stampHit}
      />

      <LegalStamp trigger={isApproved} onHit={() => setStampHit(true)} />

      <Environment preset={isDark ? "city" : "studio"} />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={40} blur={2.5} far={10} color={isDark ? "#000000" : "#1e293b"} />
    </>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]} shadows={{ type: THREE.PCFShadowMap }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
