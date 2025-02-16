import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Text, useGLTF, OrthographicCamera } from "@react-three/drei";
import { TypeAnimation } from "react-type-animation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaShippingFast, FaLock, FaGlobe } from "react-icons/fa";

const FloatingDocument = () => {
  const ref = useRef();
  const textRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(ref.current.position, 
      { y: -1 }, 
      { y: 1.5, duration: 2, ease: "power2.out" }
    )
    .to(ref.current.position, {
      y: "+=0.01",
      repeat: 1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    })
    .to(ref.current.position, {
      y: -1,
      duration: 0,
    });
  }, []);

  return (
    <mesh ref={ref} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} >
      <planeGeometry args={[1.1, 1.5]} />
      <meshStandardMaterial color="#F4C753" emissive="#F4C753" emissiveIntensity={0.5} transparent opacity={0.9} />
      <Text
        ref={textRef}
        position={[0, 0, 0.01]}
        fontSize={0.1}
        color="#131C24"
        anchorX="center"
        anchorY="middle"
      >
        Secure Document
      </Text>
    </mesh>
  );
};

export function Printer(props) {
  const { nodes, materials } = useGLTF('/printer.gltf');
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <OrthographicCamera makeDefault={false} far={100000} near={0} position={[0, 0, 1000.3]} />
        <group position={[30.157, 174.491, -2.647]} scale={[1.623, 1.064, 1.519]}>
          <mesh
            geometry={nodes.Cube_6.geometry}
            material={nodes.Cube_6.material}
            position={[-19.716, 18.235, -1.466]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.348, 0.526, 0.348]}
          />
          <mesh
            geometry={nodes.cover_1.geometry}
            material={nodes.cover_1.material}
            position={[0.05, -0.112, 0]}
            rotation={[0, -0.002, 0]}
            scale={[0.827, 0.689, 1.509]}
          />
        </group>
        <mesh
          geometry={nodes.screen.geometry}
          material={nodes.screen.material}
          position={[-50.082, 223.812, 6.143]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.529, 0.799, 0.529]}
        />
        <group position={[-37.374, 232.062, -10.947]} scale={1.519}>
          <mesh
            geometry={nodes.Cube_8.geometry}
            material={nodes.Cube_8.material}
            position={[0, -0.619, 21.042]}
            rotation={[-0.01, 0, 0]}
            scale={[0.689, 0.174, 0.689]}
          />
          <mesh
            geometry={nodes.Cube_7.geometry}
            material={nodes.Cube_7.material}
            position={[0, 2.885, -8.846]}
            rotation={[-1.581, 0, 0]}
            scale={0.689}
          />
          <mesh
            geometry={nodes.Cube_5.geometry}
            material={nodes.Cube_5.material}
            position={[0.107, -3.886, -11.119]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.689}
          />
          <mesh
            geometry={nodes.Cube_3.geometry}
            material={nodes.Cube_3.material}
            position={[0, -7.249, 11.249]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={0.689}
          />
        </group>
        <mesh
          geometry={nodes.body.geometry}
          material={nodes.body.material}
          position={[0.268, 77.708, -2.568]}
          rotation={[0, -0.002, 0]}
          scale={[1.257, 1.046, 1.2]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/printer.gltf');

const CameraAnimation = () => {
  const { camera } = useThree();
  useGSAP(() => {
    gsap.fromTo(camera.position, 
      { y: 30, z: 15 }, 
      { y: 2, z: 5, duration: 3, ease: "power2.out" }
    );
  }, [camera]);
  return null;
};

const HeroSection = () => {
  const textRef = useRef();
  const featuresRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
      delay:1.5,
    })
    .from(featuresRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.out",
    }, "-=0.5");
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-[#131C24] text-white flex flex-col items-center justify-center overflow-hidden">
      <Canvas camera={{ position: [0, 10, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Stars 
          radius={50} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          color="#F4C753"
        />
        <FloatingDocument />
        <Printer position={[0, -2, 0]} />
        <OrbitControls enableZoom={false} enableRotate={true} />
        <CameraAnimation />
      </Canvas>
      
      <div ref={textRef} className="absolute top-8 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-[#F8F9FB]">
          Welcome to <span className="text-[#F4C753]">Printify</span>
        </h1>
        <div className="text-lg md:text-2xl text-[#F4C753] font-bold mb-8 h-12">
          <TypeAnimation
            sequence={[
              "Blockchain-Secured Delivery",
              2000,
              "Real-Time Package Tracking",
              2000,
              "Smart Contract Integration",
              2000
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>
        
        <div className="mt-8 flex absolute top-[60vh] left-[10vw] gap-4 justify-center">
          <button className="px-6 py-3 bg-[#F4C753] text-[#131C24] rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
            Get Started
          </button>
          <button className="px-6 py-3 bg-[#29374C] text-[#F8F9FB] rounded-xl font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      <div ref={featuresRef} className="absolute bottom-3 w-full px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {[
            { 
              label: "Fast Delivery", 
              icon: <FaShippingFast size={40} className="text-[#F4C753] transition-colors duration-300 hover:text-[#f5d47d]" /> 
            },
            { 
              label: "Secure Transactions", 
              icon: <FaLock size={40} className="text-[#F4C753] transition-colors duration-300 hover:text-[#f5d47d]" /> 
            },
            { 
              label: "Global Reach", 
              icon: <FaGlobe size={40} className="text-[#F4C753] transition-colors duration-300 hover:text-[#f5d47d]" /> 
            }
          ].map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-2 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <div className="text-sm text-[#A3AED0] group-hover:text-[#F4C753] transition-colors duration-300">
                {feature.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
