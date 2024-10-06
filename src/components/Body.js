import '../App.css';
import React, { useState, useRef } from 'react';
import { Canvas, extend, useThree, useFrame, useLoader } from '@react-three/fiber';
import { Environment, useScroll, Image as ImageImpl, Scroll, ScrollControls, MeshTransmissionMaterial } from "@react-three/drei"
import { Html, OrbitControls, Text } from "@react-three/drei";
import * as THREE from 'three';
import { Bloom, BrightnessContrast, EffectComposer, Vignette } from '@react-three/postprocessing'
import { UnrealBloomPass } from 'three-stdlib'
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useNavigate } from 'react-router-dom';
import gas from '../assets/img/Gasgiant.png';
import trr from '../assets/img/Terr.png';
import un from '../assets/img/unknown.png';
import nep from '../assets/img/Neptunelike.png';
import sup from '../assets/img/superearth.png';

extend({ OrbitControls, UnrealBloomPass });

// allows for hover effects on an image
function Image({ c = new THREE.Color(), ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  useFrame(() => {
    ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.4 : 0.08)
  })
  return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props} />
}

//Loader component
// function Loader() {
//   return (
//     <div style={{
//       position: 'fixed', 
//       top: 0, 
//       left: 0, 
//       width: '100%', 
//       height: '100%', 
//       background: 'white', 
//       display: 'flex', 
//       alignItems: 'center', 
//       justifyContent: 'center'
//     }}>
//       <h1 style={{ color: 'black' }}>Loading...</h1>
//     </div>
//   );
// }

// Custom text components
const CustomText = ({ position, fontSize, font, children }) => (
  <Text
    position={position}
    fontSize={fontSize}
    color="white"
    font={font}
    letterSpacing="0"
    scale={[1, 1, 1]}
  >
    {children}
  </Text>
);

const Text1 = (props) => <CustomText {...props} fontSize={2} font="fonts/MerseyCowboy.otf" />;
const Text2 = (props) => <CustomText {...props} fontSize={1} font="fonts/MerseyCowboy.otf" />;
const Text3 = ({ position, children }) => (
  <Text
    position={position}
    fontSize={0.2}
    color="white"
    letterSpacing="0"
    maxWidth={5.5}
    textAlign='justify'
  >
    {children}
  </Text>
);
const Text4 = ({ position, children }) => (
  <Text
    position={position}
    fontSize={0.5}
    color="white"
    font="fonts/chise.regular.ttf"
    letterSpacing="0"
    maxWidth={50}
    textAlign='justify'
  >
    {children}
  </Text>
);

// Rest of the code remains unchanged

// returns all images
function Images() {
  const { width, height } = useThree((state) => state.viewport)
  const data = useScroll()
  const group = useRef()
  const navigate = useNavigate();

  
  // Match the X-axis rotation of the object with the camera's X-axis rotation
  useFrame(({ camera }) => {
    if (group.current) {
      group.current.rotation.z = camera.rotation.z;
      group.current.rotation.y = camera.rotation.y;
      group.current.rotation.x = camera.rotation.x;

    }
    // Adds zooming effects when scrolling, maintaining a 1:1 aspect ratio
    // const zoomFactor = data.range(1 / 3, 0.2 / 3) / 3;
    
    const zoomFactor = data.range(1/ 1, 1 / 1) / 1;
    group.current.children[0].material.zoom = 0 + zoomFactor; // For the first child
    group.current.children[1].material.zoom = 1 + zoomFactor // Adjusted for the second child
    group.current.children[2].material.zoom = 1 + zoomFactor; // For the third child
    group.current.children[3].material.zoom = 1 + zoomFactor; // For the fourth child
    group.current.children[4].material.zoom = 1 + zoomFactor; // For the fifth child
    
    // Note: Grayscale effects are commented out. Uncomment and modify as needed

  })

  return (
<group ref={group}>
<Text1 position={[-width / 50, -height - 2.5, 0]}> types of exoplanetS</Text1>

  <Image onClick={()=>navigate('/terrestrial')} position={[-width / 5, -height - 9, 0]} scale={[3, 3, 1]} url={trr} />
  
        <Text2 position={[-width / 5, -height - 10.5, 0]}>
        Terrestrial
      </Text2>
      <Text3 position={[-1.5, -height - 11.5, 0]}>
      A type of exoplanet made of rock and metal, smaller than Earth, possibly with oceans or atmospheres.
      </Text3>

<Image onClick={()=>navigate('/super-earth')} position={[width / 6, -height - 17 + width / 5, 1]} scale={[3, 3, 1]} url={sup} />  
    <Text2 position={[width / 6, -height - 18.7 + width / 5, 1]}>
    Super Earth
    </Text2>
    <Text3 position={[1.2, -height - 19.5 + width / 5, 1]}>
    Super-Earth exoplanets are also rocky, but between Earth and Neptune in size
    </Text3>

<Image onClick={()=>navigate('/unknown')} position={[-width / 5, -height - 20, 0]} scale={[3, 3, 1]} url={un} />
    <Text2 position={[-width / 5, -height - 21.7, 0]}>
    Unknown
    </Text2>
    <Text3 position={[-1.5, -height - 22.5, 0]}>
    Illustration of an exoplanet, whose type is Unknown.
    </Text3>

<Image onClick={()=>navigate('/neptune-like')} position={[width / 6, -height - 28 + width / 5, 1]} scale={[3, 3, 1]} url={nep} />
    <Text2 position={[width / 6, -height - 29.7 + width / 5, 1]}>
    Neptune-Like
    </Text2>
    <Text3 position={[1.2, -height - 30.5 + width / 5, 1]}>
    The variety of exoplanet is a similar in size to Uranus and Neptune, with an atmosphere of mostly hydrogen or helium.
    </Text3>

<Image onClick={()=>navigate('/gas-giant')} position={[-width / 5, -height - 32, 0]} scale={[3, 3, 1]} url={gas} />
    <Text2 position={[-width / 5, -height - 33.7, 0]}>
    Gas Giant
    </Text2>
    <Text3 position={[-1.4, -height - 34.5, 0]}>
    Gas giant exoplanet are as massive as Saturn or Jupiter or larger;This category also includes “hot Jupiters”, which orbit close to the Star.
    </Text3>
  
    <Text1 position={[-width / 50, -height - 38.5, 0]}> Team members</Text1>
    <Text4 position={[-width / 50, -height - 40, 0]}>Sneha K</Text4>
    <Text4 position={[-width / 50, -height - 41.5, 0]}>Mohammed Araf</Text4>
    <Text4 position={[-width / 50, -height - 43, 0]}>SUHAS N REDDY</Text4>
    <Text4 position={[-width / 50, -height - 45, 0]}>Vaibhav Saxena</Text4>    
    <Text4 position={[-width / 50, -height - 47, 0]}>DOMMITHI PRUDHVI KUMAR REDDY</Text4>
    <Text4 position={[-width / 50, -height - 49, 0]}>Kusum kumari</Text4>
  
</group>


  )
}

// const AboutText = ({ position, color, fontSize, font, fontWeight, anchorX, anchorY, text, opacity }) => {
//  const textRef = useRef();
//   useFrame(({ camera }) => {
//     if (textRef.current) {
//       textRef.current.rotation.z = camera.rotation.z;
//       textRef.current.rotation.y = camera.rotation.y;
//       textRef.current.rotation.x = camera.rotation.x;

//     }
//   });

//   return (
//     <group ref={textRef}>
//       <Text
//         position={position}
//         color={color}
//         fontSize={fontSize}
//         fontWeight={fontWeight}
//         font={font}
//         anchorX={anchorX}
//         anchorY={anchorY}
//         opacity={opacity}
//       >
//         {text}
//       </Text>
//     </group>
//   );
// };

function ShapeBlue({ children, color, ...props }) {
  const { width } = useThree((state) => state.viewport)
  let s;
  if (width > 4.8) {
    s = 1
  } else {
    s = 0.8
  }
  return (

    <mesh scale={s} {...props} >
      {children}
      <meshStandardMaterial transparent={true} opacity={0.5} toneMapped={false} emissive={"red"} emissiveIntensity={1} color={color} />
    </mesh>
  )
}
function Shapepink({ children, color, ...props }) {

  const { width } = useThree((state) => state.viewport)
  let s;
  if (width > 4.8) {
    s = 1
  } else {
    s = 0.8
  }

  return (
    <mesh scale={s} {...props} >
      {children}
      <meshStandardMaterial toneMapped={false} emissive={"red"} emissiveIntensity={10} color={color} />
    </mesh>
  )
}
const SpcwbyModel = () => {
  const obj = useLoader(GLTFLoader, './models/spcwbymodel.glb')
  const modelRef = useRef(); 
  const { width } = useThree((state) => state.viewport)
  let s;

  if (width > 4.8) {
    s = 0.3

  } else {
    s = 0.2
  }

  // Allows for SpaceCowboy model to follow the camera
  useFrame(({ camera }) => {
    if (modelRef.current) {
      modelRef.current.rotation.z = camera.rotation.z;
      modelRef.current.rotation.y = camera.rotation.y;
      modelRef.current.rotation.x = camera.rotation.x;

    }
  });
  return (
    <group ref={modelRef}>
      <primitive object={obj.scene} position={[0.1, 0, 3.2]} scale={s} />
      <meshStandardMaterial attach="material" args={[{ color: 0xffffff, emissive: "black", emissiveIntensity: 10 }]} />
    </group>
  );
};

function Body() {

  // scrollable arrow
const arrow = {
    font: 'fonts/MerseyCowboy.otf',
    fontFamily: 'Mersey Cowboy Regular',
    position: 'fixed',
    color: 'white',
    left: '370px', 
    top: '300px',
    fontSize: '42px',
};




  const groupRef = React.useRef();
  const groupRef2 = React.useRef();
  const starCount = 500;
  // Generate random positions for stars
  const positions = [...Array(starCount)].map(() => ({
    x: THREE.MathUtils.randFloatSpread(10),
    y: THREE.MathUtils.randFloatSpread(10),
    z: THREE.MathUtils.randFloatSpread(20),
  }));
  const positions_lower = [...Array(starCount)].map(() => ({
    x: THREE.MathUtils.randFloatSpread(40),
    y: THREE.MathUtils.randFloatSpread(40),
    z: THREE.MathUtils.randFloatSpread(40),
  }));
  const texture = useLoader(TextureLoader, 'https://r4.wallpaperflare.com/wallpaper/872/1022/493/exoplanet-4k-best-for-desktop-wallpaper-d57cf11c06ca9dbbe4411db24e4f0557.jpg');
  
  return (
    <div style={{ width: "100%", height: "100%" }}>
      
      <Canvas className="canvas" gl={{ alpha: true, clearColor: 'transparent', sortObjects: true }}>

      
        <Environment files="./hdr/misty2.hdr" />

        <OrbitControls autoRotate enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
        <ScrollControls damping={1.2} pages={9}>
          <Scroll>

            {/* star field */}
            <group ref={groupRef} >
              {positions.map((position, index) => (
                <mesh key={index} position={[position.x, position.y, position.z]}>
                  <sphereGeometry args={[0.005, 2, 2]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              ))}
            </group>

            {/* Spinning sphere with rave image */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[6, 20, 20]} />
              <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>

                {/* white torus */}
            <mesh rotation={[11, 0.2, 0]} position={[0, 0, 0]} scale={[2.8,2.1,1]}>
              <torusGeometry args={[1.1, 0.06, 16, 100]} />
              <meshStandardMaterial transparent={true} opacity={1}  emissive={"white"} emissiveIntensity={0} color={"red"}/>
              <MeshTransmissionMaterial transparent={false} opacity={1} backside backsideThickness={5} thickness={5} />
            </mesh>

            {/* Pink torus */}
            <mesh rotation={[11, 0, 0]} position={[0, -5.4, 0]}>
              <torusGeometry args={[4, 0.1, 16, 100]} />
              <meshStandardMaterial toneMapped={false} emissive={"yellow"} emissiveIntensity={10} color={[0, 30, 0]} />
            </mesh>

            {/* Blue torus */}
            <mesh rotation={[11, 0, 0]} position={[0, -5.1, 0]}>
              <torusGeometry args={[4.2, 0.6, 16, 100]} />
              <meshStandardMaterial transparent={true} opacity={0.55} toneMapped={false} emissive={"white"} emissiveIntensity={10} color={"red"} />
            </mesh>

            {/* Star fields */}
            <group ref={groupRef2} position={[0, -10, 10]}>
              {positions_lower.map((position, index) => (
                <mesh key={index} position={[position.x, position.y, position.z]}>
                  <sphereGeometry args={[0.005, 2]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              ))}
            </group>
            <group ref={groupRef2} position={[0, -40, 10]}>
              {positions_lower.map((position, index) => (
                <mesh key={index} position={[position.x, position.y, position.z]}>
                  <sphereGeometry args={[0.008, 1, 2]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              ))}
            </group>

            {}
        
            <SpcwbyModel />
           {/* Inner glowing sphere */}
           <Shapepink color={[10, 15, 0]} position={[0, 0, 0]} >
             <sphereGeometry args={[0.6, 20, 15]} />
           </Shapepink>
           {/* {/* <ambientLight intensity={0.2} />
            {/* Outer blue glowing sphere */}
            <ShapeBlue color={[10, 5, 0]} position={[0, 0, 0]} >
            <sphereGeometry args={[2.1, 20, 25]} />
            </ShapeBlue>
            {/* Gallery at bottom */}
            <Images />

            {/* Scrolling arrow */}
            <Html>
            <div style={arrow}>
            ↓
            </div>


            </Html>
          </Scroll>
        </ScrollControls>

        {/* Postprocessing effects: note lines 1-13 */}
        <EffectComposer disableNormalPass>
          {/* Bloom effect with specified parameters */}
          <Bloom 
            mipmapBlur 
            radius={0.75} 
            luminanceThreshold={1} 
          />

          {/* Vignette effect with Eskil settings */}
          <Vignette 
            eskil={false} 
            offset={1.0} 
            darkness={0.0} 
          />

          {/* Brightness and Contrast adjustment */}
          <BrightnessContrast 
            brightness={0} 
          />
        </EffectComposer>


        
      </Canvas>
    </div>
  );
};

export default Body;