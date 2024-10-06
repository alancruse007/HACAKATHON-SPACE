import '../App.css'; // Importing main CSS styles
import React, { useState, useRef } from 'react'; // Importing necessary React hooks and components
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'; // Three.js integration for React
import { Environment, useScroll, Image as ImageImpl, Scroll, ScrollControls } from "@react-three/drei"; // Extra helper components for Three.js
import { OrbitControls, Text } from "@react-three/drei"; // Orbit controls and text component
import * as THREE from 'three'; // Three.js library
import { Bloom, BrightnessContrast, EffectComposer, Vignette } from '@react-three/postprocessing'; // Post-processing effects for Three.js
import { UnrealBloomPass } from 'three-stdlib'; // Additional bloom effect from Three.js
import p1 from '../assets/img/Planets/super earth/image.png'; // Importing image assets
import p2 from '../assets/img/Planets/super earth/image 2.png';
import p3 from '../assets/img/Planets/super earth/image3.png';
import p4 from '../assets/img/Planets/super earth/image4.png';
import p5 from '../assets/img/Planets/super earth/image5.png';

// Extend the Three.js library to include custom controls
extend({ OrbitControls, UnrealBloomPass });

// Component for rendering images with hover effect
const Image = ({ c = new THREE.Color(), ...props }) => {
  const ref = useRef(); // Create a reference for the image
  const [hovered, hover] = useState(false); // State to track hover status
  useFrame(() => {
    // Animation frame function to change color on hover
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.08);
  });
  return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />;
};

// Component for rendering text with specific properties
const TextComponent = ({ position, children, fontSize, maxWidth , font}) => (
  <Text
    position={position}
    fontSize={fontSize}
    color="white"
    font={font} // Custom font
    letterSpacing="0"
    scale={[1, 1, 1]}
    maxWidth={maxWidth}
    textAlign='justify' // Align the text to justify
  >
    {children}
  </Text>
);

// Component that renders a group of images with information
const Images = () => {
  const { width, height } = useThree((state) => state.viewport); // Get viewport dimensions
  const data = useScroll(); // Get scroll data for effects
  const group = useRef(); // Reference for the group of images

  useFrame(({ camera }) => {
    // Update rotation of images based on camera rotation
    if (group.current) {
      group.current.rotation.copy(camera.rotation);
    }
    const zoomFactor = data.range(1 / 1, 1 / 1) / 1; // Calculate zoom factor
    group.current.children.forEach((child, index) => {
      // Update zoom level of images based on index
      child.material.zoom = index === 0 ? 0 + zoomFactor : 1 + zoomFactor;  
    });
  });

  // Array containing information about different types of exoplanets
const createExoplanet = (url, title, description, planetRadius, planetMass, discoveryMethod, orbitalRadius, orbitalPeriod) => {
    return {
        url,
        title,
        description,
        points: [{
            planet_radius: planetRadius,
            planet_type: 'Super Earth',
            planet_mass: planetMass,
            discovery_method: discoveryMethod,
            orbital_radius: orbitalRadius,
            orbital_period: orbitalPeriod
        }]
    };
};

const elements = [
    createExoplanet(
        p1,
        "TOI-286 c",
        "TOI-286 c is a super Earth exoplanet that orbits a K-type star. Its mass is 3.72 Earths, it takes 39.4 days to complete one orbit of its star and is 0.213 AU from its star. Its discovery was announced in 2024.",
        '1.88 x Earth',
        '3.72 Earths',
        'Transit',
        '0.213 AU',
        '39.4 days'
    ),

    createExoplanet(
        p2,
        "TOI-286b",
        "TOI-286 b is a super Earth exoplanet that orbits a K-type star. Its mass is 4.53 Earths, it takes 4.5 days to complete one orbit of its star and is 0.0503 AU from its star. Its discovery was announced in 2024.",
        '1.42 x Earth',
        '4.53 Earths',
        'Transit',
        '0.0503 AU',
        '4.5 days'
    ),
    
    createExoplanet(
        p3,
        "TOI-6255 b",
        "TOI-6255 b is a super Earth exoplanet that orbits a M-type star. Its mass is 1.44 Earths, it takes 0.2 days to complete one orbit of its star and is 0.005299448185078 AU from its star. Its discovery was announced in 2024.",
        '1.079 x Earth',
        '1.44 Earths',
        'Transit',
        'Unknown',
        '0.2 days'
    ),

    createExoplanet(
        p4,
        "TOI-1408c",
        "TOI-1408 c is a super Earth exoplanet that orbits a F-type star. Its mass is 7.6 Earths, it takes 2.2 days to complete one orbit of its star, and is 0.03587 AU from its star. Its discovery was announced in 2024.",
        '2.22 x Earth',
        '7.6 Earths ',
        'Transit Timing Variations',
        '0.03587 AU',
        '2.2 days'
    ),
    
    createExoplanet(
        p5,
        "TOI-1798.02",
        "OI-1798.02 is a super Earth exoplanet that orbits a K-type star. Its mass is 5.6 Earths, it takes 0.4 days to complete one orbit of its star, and is 0.0107 AU from its star. Its discovery was announced in 2024.",
        '1.399 x Earth',
        '5.6 Earths',
        'Transit',
        '0.0107 AU',
        '0.4 days'
    ),
];


return (
    <group ref={group}>
    {/* Title for types of exoplanets */}
    <TextComponent position={[-width / 50, -height / 15, 0]} fontSize={2} font={"fonts/MerseyCowboy.otf"}>
    Super Earth
    </TextComponent>
    {elements.map((el, index) => {
        const posX = -width / 5 * (index % 2 === 0 ? 1 : -1);
        const basePositionY = -height - (index * 7);
        
        return (
            <React.Fragment key={index}>
                <Image position={[posX, basePositionY, 0]} scale={[3, 3, 1]} url={el.url} />
                <TextComponent position={[posX, basePositionY - 1.8, 0]} fontSize={1} font={"fonts/MerseyCowboy.otf"}>
                    {el.title}
                </TextComponent>
                <TextComponent position={[posX, basePositionY - 2.7, 0]} fontSize={0.2} maxWidth={6}>
                    {el.description}
                </TextComponent>
                {el.points && el.points.map((point, pointIndex) => (
                    <React.Fragment key={pointIndex}>
                        {[
                            { label: 'Planet Radius', value: point.planet_radius },
                            { label: 'Planet Type', value: point.planet_type },
                            { label: 'Planet Mass', value: point.planet_mass },
                            { label: 'Discovery Method', value: point.discovery_method },
                            { label: 'Orbital Radius', value: point.orbital_radius },
                            { label: 'Orbital Period', value: point.orbital_period }
                        ].map((item, idx) => (
                            <TextComponent key={idx} position={[posX, basePositionY - (3.5 + 0.3 * idx), 0]} fontSize={0.2} maxWidth={6}>
                                {item.label}: {item.value}
                            </TextComponent>
                        ))}
                    </React.Fragment>
                ))}
            </React.Fragment>
        );
    })}
</group>

);
}


// Main component that renders the 3D scene
const Body = () => {
  const groupRef = useRef();
  const starCount = 500; // Number of stars to generate
  const positions = [...Array(starCount)].map(() => ({
    // Generate random positions for stars within a certain spread
    x: THREE.MathUtils.randFloatSpread(40),
    y: THREE.MathUtils.randFloatSpread(40),
    z: THREE.MathUtils.randFloatSpread(40),
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas className="canvas" gl={{ alpha: true, clearColor: 'transparent', sortObjects: true }}>
        <Environment files="./hdr/misty2.hdr" /> {/* Add environment lighting */}
        {/* Add orbit controls for navigating the scene */}
        <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <ScrollControls damping={1.2} pages={6}> {/* Scroll controls for smooth scrolling effects */}
          <Scroll>
            {Array.from({ length: 2 }).map((_, index) => (
              <group key={index} ref={groupRef} position={[0, -40 * index, 10]}>
                {positions.map((pos, i) => (
                  // Create stars in random positions
                  <mesh key={i} position={[pos.x, pos.y, pos.z]}>
                    <sphereGeometry args={[index === 0 ? 0.005 : 0.008, index === 0 ? 2 : 1, 2]} />
                    <meshBasicMaterial color="#ffffff" /> {/* Basic white material for stars */}
                  </mesh>
                ))}
              </group>
            ))}
            <Images /> {/* Render images component */}
          </Scroll>
        </ScrollControls>
        {/* Post-processing effects for the scene */}
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur radius={0.75} luminanceThreshold={1} />
          <Vignette eskil={false} offset={1.0} darkness={0.0} />
          <BrightnessContrast brightness={0} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

// Export the body component as default
export default Body;
