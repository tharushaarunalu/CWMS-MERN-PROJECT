import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Stylized Low-Poly Car ── */
function Car() {
    const carGroup = useRef();

    useFrame(({ clock }) => {
        if (carGroup.current) {
            // Gentle floating and tilting
            carGroup.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.2;
            carGroup.current.rotation.y = Math.PI / 4 + Math.sin(clock.elapsedTime * 0.3) * 0.1;
            carGroup.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.05;
        }
    });

    return (
        <group ref={carGroup} position={[0, -0.5, 0]} scale={1.2}>
            {/* Main Body */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[4, 0.6, 2]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Cabin */}
            <mesh position={[-0.2, 0.9, 0]} castShadow>
                <boxGeometry args={[2.2, 0.5, 1.6]} />
                <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Windows (Glass) */}
            <mesh position={[-0.2, 0.9, 0]}>
                <boxGeometry args={[2.22, 0.45, 1.62]} />
                <meshStandardMaterial color="#7dd3fc" transparent opacity={0.6} metalness={1} />
            </mesh>

            {/* Wheels */}
            {[
                [-1.2, 0.2, 0.9], [1.2, 0.2, 0.9],
                [-1.2, 0.2, -0.9], [1.2, 0.2, -0.9]
            ].map((pos, i) => (
                <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 0.4, 16]} />
                    <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
                </mesh>
            ))}

            {/* Headlights (Front is Positive X) */}
            <mesh position={[2, 0.45, 0.6]}>
                <boxGeometry args={[0.1, 0.2, 0.4]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>
            <mesh position={[2, 0.45, -0.6]}>
                <boxGeometry args={[0.1, 0.2, 0.4]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
            </mesh>

            {/* Taillights */}
            <mesh position={[-2, 0.45, 0.7]}>
                <boxGeometry args={[0.1, 0.15, 0.4]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-2, 0.45, -0.7]}>
                <boxGeometry args={[0.1, 0.15, 0.4]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
            </mesh>
        </group>
    );
}

/* ── Neon Speed Lines ── */
function SpeedLines({ count = 20 }) {
    const lines = useMemo(() => {
        return new Array(count).fill().map(() => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ],
            length: Math.random() * 4 + 2,
            speed: Math.random() * 0.2 + 0.1,
            color: Math.random() > 0.5 ? '#0ea5e9' : '#8b5cf6'
        }));
    }, [count]);

    return (
        <group>
            {lines.map((line, i) => (
                <SpeedLine key={i} {...line} />
            ))}
        </group>
    );
}

function SpeedLine({ position, length, speed, color }) {
    const lineRef = useRef();
    useFrame(() => {
        if (lineRef.current) {
            lineRef.current.position.x -= speed;
            if (lineRef.current.position.x < -10) {
                lineRef.current.position.x = 10;
            }
        }
    });

    return (
        <mesh ref={lineRef} position={position} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, length, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
    );
}

/* ── Floating Bubble Particles (Water/Soap) ── */
function Bubbles({ count = 30 }) {
    const points = useMemo(() => {
        return new Array(count).fill().map(() => ({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            ],
            size: Math.random() * 0.3 + 0.1,
            speed: Math.random() * 0.02 + 0.01
        }));
    }, [count]);

    return (
        <group>
            {points.map((bubble, i) => (
                <mesh key={i} position={bubble.position}>
                    <sphereGeometry args={[bubble.size, 16, 16]} />
                    <MeshDistortMaterial
                        color="#7dd3fc"
                        distort={0.4}
                        speed={2}
                        transparent
                        opacity={0.3}
                        roughness={0}
                        metalness={1}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ── Main Scene ── */
const ThreeScene = () => {
    return (
        <Canvas
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            gl={{ antialias: true, alpha: true }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={60} />

            {/* Lights */}
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#0ea5e9" />
            <pointLight position={[-5, -5, -5]} intensity={1} color="#8b5cf6" />
            <spotLight position={[0, 10, 0]} intensity={1} color="#fff" />

            {/* Stars/Background */}
            <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

            {/* The Styled Car */}
            <Car />

            {/* Dynamic Elements */}
            <SpeedLines count={25} />
            <Bubbles count={20} />

            <fog attach="fog" args={['#080a0f', 5, 20]} />
        </Canvas>
    );
};

export default ThreeScene;
