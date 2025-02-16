import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Sphere } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function LoginOption({ position, title, onClick, color = "#29374C", hoverColor = "#F4C753" }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [scale, setScale] = useState([2.5, 3.5, 0.15]);
  const [fontSize, setFontSize] = useState(0.35);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) { // Mobile
        setScale([1.8, 2.5, 0.15]);
        setFontSize(0.25);
      } else if (width <= 1024) { // Tablet
        setScale([2.2, 3.0, 0.15]);
        setFontSize(0.3);
      } else { // Desktop
        setScale([2.5, 3.5, 0.15]);
        setFontSize(0.35);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state) => {
    if (meshRef.current && textRef.current) {
      const time = state.clock.elapsedTime;
      
      // Smooth hover transition
      const targetRotationX = hovered ? -0.2 : 0;
      const targetRotationY = hovered ? 0.1 : 0;
      const targetPositionY = position[1] + (hovered ? 0.3 : 0);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX + Math.sin(time * 2) * 0.03,
        0.1
      );
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY + Math.sin(time * 2) * 0.03,
        0.1
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetPositionY,
        0.1
      );

      // Shiny surface effect
      if (meshRef.current.material) {
        meshRef.current.material.roughness = THREE.MathUtils.lerp(
          meshRef.current.material.roughness,
          hovered ? 0.3 : 0.6,
          0.1
        );
        meshRef.current.material.metalness = THREE.MathUtils.lerp(
          meshRef.current.material.metalness,
          hovered ? 0.9 : 0.7,
          0.1
        );
      }

      // Text animation
      if (textRef.current) {
        textRef.current.position.z = 0.2 + (hovered ? 0.1 : 0);
        textRef.current.material.opacity = hovered ? 1 : 0.9;
      }
    }
  });

  const handleClick = () => {
    setClicked(true);
    meshRef.current.scale.set(0.95, 0.95, 0.95);
    setTimeout(() => {
      meshRef.current.scale.set(1, 1, 1);
      onClick();
    }, 200);
  };

  return (
    <group ref={groupRef} position={position}>
      <group
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Main card with glossy effect */}
        <mesh>
          <boxGeometry args={scale} />
          <meshPhysicalMaterial
            color={hovered ? hoverColor : color}
            metalness={0.7}
            roughness={0.6}
            clearcoat={1.0}
            clearcoatRoughness={0.2}
            reflectivity={1}
            envMapIntensity={2}
          />
        </mesh>

        {/* Front Text */}
        <Text
          ref={textRef}
          position={[0, 0, 0.08]}
          fontSize={fontSize}
          maxWidth={scale[0] - 0.5}
          color="#F8F9FB"
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
        >
          {title}
        </Text>

        {/* Back Text */}
        <Text
          position={[0, 0, -0.08]}
          fontSize={0.35}
          maxWidth={2}
          color="#F8F9FB"
          anchorX="center"
          anchorY="middle"
          depthOffset={1}
          rotation={[0, Math.PI, 0]} // Rotate 180 degrees around Y axis
        >
          {title}
        </Text>

        {/* Additional text for front side */}
        <Text
          position={[0, -0.8, 0.08]}
          fontSize={0.2}
          maxWidth={2}
          color="#F8F9FB"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
        >
          Click to proceed
        </Text>

        {/* Additional text for back side */}
        <Text
          position={[0, -0.8, -0.08]}
          fontSize={0.2}
          maxWidth={2}
          color="#F8F9FB"
          anchorX="center"
          anchorY="middle"
          opacity={0.7}
          rotation={[0, Math.PI, 0]}
        >
          Welcome
        </Text>

        {/* Subtle highlight strip */}
        <mesh position={[0, 1.2, 0.08]}>
          <planeGeometry args={[2, 0.03]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={hovered ? 0.4 : 0.2}
          />
        </mesh>

        {/* Mirror the decorative element on back */}
        <mesh position={[0, 1.2, -0.08]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2, 0.03]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={hovered ? 0.4 : 0.2}
          />
        </mesh>

        {/* Bottom accent lines on both sides */}
        <mesh position={[0, -1.2, 0.08]}>
          <planeGeometry args={[1.5, 0.02]} />
          <meshBasicMaterial
            color={hoverColor}
            transparent
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>
        <mesh position={[0, -1.2, -0.08]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.5, 0.02]} />
          <meshBasicMaterial
            color={hoverColor}
            transparent
            opacity={hovered ? 0.8 : 0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

function Background() {
  const groupRef = useRef();
  const particlesCount = 200;
  const particlePositions = useRef(
    Array.from({ length: particlesCount }, () => ({
      position: new THREE.Vector3(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      ),
      velocity: new THREE.Vector3(
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01,
        Math.random() * 0.02 - 0.01
      )
    }))
  ).current;

  useFrame((state) => {
    particlePositions.forEach((particle) => {
      particle.position.add(particle.velocity);
      
      // Bounce off boundaries
      ['x', 'y', 'z'].forEach((axis) => {
        if (Math.abs(particle.position[axis]) > 10) {
          particle.velocity[axis] *= -1;
        }
      });
    });
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {particlePositions.map((particle, i) => (
        <mesh key={i} position={particle.position}>
          <sphereGeometry args={[0.05]} />
          <meshBasicMaterial color="#F4C753" transparent opacity={0.6} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial 
          color="#1D2A36" 
          side={THREE.BackSide}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Add new Ground component
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -9, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshPhysicalMaterial
        color="#1D2A36"
        metalness={0.9}
        roughness={0.1}
        reflectivity={0.5}
        clearcoat={0.5}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function Scene() {
  const navigate = useNavigate();
  const [cameraPosition, setCameraPosition] = useState([0, 2, 12]);
  const [cardPositions, setCardPositions] = useState({
    customer: [-5, -1, 0],
    store: [0, -1, 0],
    captain: [5, -1, 0]
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) { // Mobile
        setCameraPosition([0, 2, 15]);
        setCardPositions({
          customer: [0, 2, 0],
          store: [0, -1, 0],
          captain: [0, -4, 0]
        });
      } else if (width <= 1024) { // Tablet
        setCameraPosition([0, 2, 14]);
        setCardPositions({
          customer: [-3, -1, 0],
          store: [0, -1, 0],
          captain: [3, -1, 0]
        });
      } else { // Desktop
        setCameraPosition([0, 2, 12]);
        setCardPositions({
          customer: [-5, -1, 0],
          store: [0, -1, 0],
          captain: [5, -1, 0]
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (type) => {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.5s ease';
      overlay.style.opacity = '1';
      
      setTimeout(() => {
        navigate(`/${type}`);
      }, 500);
    }
  };

  return (
    <>
      <Background />
      <Ground />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <LoginOption
        position={cardPositions.customer}
        title="Customer Login"
        onClick={() => handleLogin('userLogin')}
      />
      <LoginOption
        position={cardPositions.store}
        title="Store Login"
        onClick={() => handleLogin('storeLogin')}
      />
      <LoginOption
        position={cardPositions.captain}
        title="Captain Login"
        onClick={() => handleLogin('captainLogin')}
      />
    </>
  );
}

function LoginRedirect() {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'translateY(50px)';
      containerRef.current.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
      
      requestAnimationFrame(() => {
        containerRef.current.style.opacity = '1';
        containerRef.current.style.transform = 'translateY(0)';
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-screen bg-gradient-to-b from-[#131C24] to-[#1D2A36] relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 text-center z-10">
        <h1 className="text-[#F8F9FB] text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          Choose Your Login Type
        </h1>
        <p className="text-[#F8F9FB] text-base md:text-lg opacity-80">
          Select how you want to interact with Xerox
        </p>
      </div>

      <Canvas 
        shadows
        camera={{ position: [0, 2, 12], fov: window.innerWidth <= 640 ? 75 : 50 }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#131C24']} />
        <Scene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      <div 
        className="overlay absolute inset-0 bg-gradient-to-b from-[#131C24] to-[#1D2A36] opacity-0 pointer-events-none"
        style={{ transition: 'opacity 0.5s ease' }}
      />
    </div>
  );
}

export default LoginRedirect;
