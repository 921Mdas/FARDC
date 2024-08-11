// External imports
import React, { useEffect, useRef, useState, Suspense, useMemo } from 'react';
import { useGLTF, Float, Image, Html, Center, useVideoTexture, Clone, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from "@react-three/rapier";
import { useControls, button } from 'leva';
import { proxy, useSnapshot } from 'valtio';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';

// Internal imports
import { setCastShadow, ObjectAnimate, getExtremeRandom, AnimatedCounter } from '../Helper/Helper';
import { useStore } from '../store/store';
import ParagraphHelper from '../Helper/Paragraph';

// Assets
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";
import imagemap from '../assets/Images/map.png';
import img01 from '../assets/Images/war01.jpg';
import img02 from '../assets/Images/war02.jpeg';
import img03 from '../assets/Images/war03.jpg';
import img04 from '../assets/Images/bodies.webp';
import img05 from '../assets/Images/refugees.jpg';
import img06 from '../assets/Images/war04.webp';
import img07 from '../assets/Images/war05.avif';
import img08 from '../assets/Images/war06.jpeg';
import img09 from '../assets/Images/refugees.jpg';

// GLB models
import white_rose from '../GLBs/whiterose.glb';
import skull_head from '../GLBs/realskull.glb';
import pistol_original from '../GLBs/pistol.glb';
import pistol_clone_one from '../GLBs/pistol2.glb';
import AK_47 from '../GLBs/ak47w.glb';
import rifle from '../GLBs/rifle.glb';
import white_knife from '../GLBs/whiteKnife.glb';
import bullet from '../GLBs/bullet.glb';
import soldier_head_bust from '../GLBs/mamadou.glb';
import Skull_head from '../GLBs/realskull.glb';
import Skull_head2 from '../GLBs/skull2.glb';
import Skull_head3 from '../GLBs/realskull3.glb';
import Cemetery from '../GLBs/newcemetery.glb';
import steps from '../GLBs/stairs.glb';
import Congo from '../GLBs/congo.glb';


// Component imports
import CurvedPlane from './Curvedscreen';



// whiterose
export const White_rose = ()=>{
  const model = useGLTF(white_rose)
  const roseref = useRef()
  ObjectAnimate('rosefwd',roseref);
  ObjectAnimate('rosebckwd',roseref);
  setCastShadow(model.scene)
  return <primitive object={model.scene} ref={roseref} scale={1} position={[0,-0.4,0.5]} rotation={[0,0,Math.PI * 0.5]} />
} 

// FARDC
const state = proxy({
  clicked: null,
  urls: [img01, img02,img03,img04,img05, img06, img07, img08, img09].map((u) => u)
});

function Item({ index, position, scale, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);


 

  const over = () => hover(true);
  const out = () => hover(false);

 useFrame((_state, delta) => {
  // Animate scale
  easing.damp3(
    ref.current.scale, 
    hovered ? [scale[0] * 1.4, scale[1] * 1.2, 1.4] : scale, 
    0.15, 
    delta
  );
  
  // Toggle grayscale
  ref.current.material.grayscale = hovered ? 0 : 1;

  
  // Animate position on the z-axis
  easing.damp3(
    ref.current.position, 
    hovered ? [ref.current.position.x, ref.current.position.y, ref.current.position.z] : [ref.current.position.x, ref.current.position.y, ref.current.position.z], 
    0.15, 
    delta
  );
  
  // Animate color
  easing.dampC(
    ref.current.material.color, 
    hovered ? 'white' : '#aaa', 
    0.15, 
    delta
  );
});




  return <Image ref={ref} {...props} position={position} scale={scale} onPointerOver={over} onPointerOut={out} />;
}

function Items({ w = 0.7, gap = 0.20 }) {
  const { urls } = useSnapshot(state);
  const middleIndex = Math.floor(urls.length / 2);

  return (
    <group>
      {urls.map((url, i) => {
        const adjustedIndex = i - middleIndex;
        const positionX = adjustedIndex * (w + gap );
        return (
          <Item
            key={i}
            index={i}
            position={[Math.sin(positionX) - Math.cos(positionX), Math.random() * 0.5, Math.random() * -1.5]}
            scale={[w, 4 * w, 1]}
            url={url}
          />
        );
      })}
    </group>

  );
}

export const FARDC = (_props) => {
  const toref = useRef();
  const fardcref = useRef();
  const dateref = useRef();
  const contentrefone = useRef();
  const contentreftwo = useRef();
  const contentrefFour = useRef();
  const contentrefFive = useRef();
  const contentrefthree = useRef();
  const contentimageref = useRef();

const contentRefThree2 = useRef();
const contentRefThree3 = useRef();
const contentRefThree4 = useRef();
const contentrefFinal = useRef();


  const { average } = useStore(state => state);
  const reducedAvg = Math.floor(Math.abs(average * 0.1));
  
  

  const { isSoldierAnimated, colors, currentNav } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
    currentNav: state.currentNav,
    colors: state.colors,
    average: state.average,
  }));

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (currentNav === 2 && isSoldierAnimated) {
      setShouldAnimate(true);
    } else {
      setShouldAnimate(false);
    }
  }, [currentNav, isSoldierAnimated]);

  ObjectAnimate('to_headline', toref, isSoldierAnimated);
  ObjectAnimate('fardc_headline', fardcref, isSoldierAnimated);
  ObjectAnimate('date_headline', dateref, isSoldierAnimated);
  ObjectAnimate('contentonefwd', contentrefone, isSoldierAnimated);
  ObjectAnimate('contenttwofwd', contentreftwo, isSoldierAnimated);
  ObjectAnimate('contentthreefwd', contentrefthree, isSoldierAnimated);
  ObjectAnimate('contentfourfwd', contentrefFour, isSoldierAnimated);
  ObjectAnimate('contentonebckwd', contentrefone, isSoldierAnimated);
  ObjectAnimate('contenttwobckwd', contentreftwo, isSoldierAnimated);
  ObjectAnimate('contentthreebckwd', contentrefthree, isSoldierAnimated);
  ObjectAnimate('contentFourbckwd', contentrefFour, isSoldierAnimated);
  ObjectAnimate('contentFivebckwd', contentrefFour, isSoldierAnimated);
  ObjectAnimate('contentimagefwd', contentimageref, isSoldierAnimated);
  ObjectAnimate('contentimagebckwd', contentimageref, isSoldierAnimated);
  ObjectAnimate('contentref32fwd', contentRefThree2, isSoldierAnimated);
  ObjectAnimate('contentref32bckwd', contentRefThree2, isSoldierAnimated);
  ObjectAnimate('contentref33fwd', contentRefThree3, isSoldierAnimated);
  ObjectAnimate('contentref33bckwd', contentRefThree3, isSoldierAnimated);
  ObjectAnimate('contentrefFinalfwd', contentrefFinal, isSoldierAnimated);
  ObjectAnimate('contentrefFinalbckwd', contentrefFinal, isSoldierAnimated);

  const introText = `The war in Congo, also known as the Second Congo War,\nbegan in 1998 and has resulted in widespread violence,\ndisplacement, and humanitarian crises.`
  const causeText =  `Driven by control over the country’s vast mineral resources,\nthe conflict has seen the involvement of multiple armed groups\nand neighboring countries.`
  const concludeText = `Despite peace agreements,\nthe conflict has left lasting scars on the region,\nwith millions of people dead and ongoing instability.`

const textStyle = {
  width: '30vw',
  border: 'solid 1px red',
  lineHeight: '2rem',
  textAlign: 'right',
  padding: '1em',
  fontSize: '1.2em',
  backgroundColor: 'white',
  borderRadius: '0.1em',
  background: 'rgba(255, 255, 255, 0.3)', // Background color with 50% opacity
  backdropFilter: 'blur(4.5px)', // Blur effect for the background
  WebkitBackdropFilter: 'blur(4.5px)', // Vendor prefix for blur effect
  borderRadius: '1px', // Rounded corners
  border: '1px solid rgba(255, 255, 255, 0.3)', // Border with semi-transparent color
  color: colors.lightred,
  perspective: '1600px', // Perspective depth
  transform: `rotateZ(-3deg) `,
  transformStyle: 'preserve-3d',
};

const textStyle1 = {
  width: '30vw',
  border: 'solid 1px red',
  lineHeight: '2rem',
  padding: '1em',
  fontSize: '1.2em',
  backgroundColor: 'white',
  borderRadius: '0.1em',
  background: 'rgba(255, 255, 255, 0.3)', // Background color with 50% opacity
  backdropFilter: 'blur(4.5px)', // Blur effect for the background
  WebkitBackdropFilter: 'blur(4.5px)', // Vendor prefix for blur effect
  borderRadius: '1px', // Rounded corners
  border: '1px solid rgba(255, 255, 255, 0.3)', // Border with semi-transparent color
  color: colors.lightred,
  fontWeight:'bold'

};

const textStyle2 = {
  width: '30vw',
  border: 'solid 1px red',
  lineHeight: '2rem',
  textAlign: 'right',
  padding: '1em',
  fontSize: '1.2em',
  backgroundColor: 'white',
  borderRadius: '0.1em',
  background: 'rgba(255, 255, 255, 0.3)', // Background color with 50% opacity
  backdropFilter: 'blur(4.5px)', // Blur effect for the background
  WebkitBackdropFilter: 'blur(4.5px)', // Vendor prefix for blur effect
  borderRadius: '1px', // Rounded corners
  border: '1px solid rgba(255, 255, 255, 0.3)', // Border with semi-transparent color
  color: colors.lightred,
  perspective: '1600px', // Perspective depth
  transform: `rotateZ(3deg) `,
  transformStyle: 'preserve-3d',
};
const textStyle3 = {

  width: '30vw',
  border: 'solid 1px red',
  lineHeight: '2rem',
  textAlign: 'right',
  padding: '1em',
  fontSize: '1.2em',
  backgroundColor: 'white',
  borderRadius: '0.1em',
  background: 'rgba(255, 255, 255, 0.3)', // Background color with 50% opacity
  backdropFilter: 'blur(4.5px)', // Blur effect for the background
  WebkitBackdropFilter: 'blur(4.5px)', // Vendor prefix for blur effect
  borderRadius: '1px', // Rounded corners
  border: '1px solid rgba(255, 255, 255, 0.3)', // Border with semi-transparent color
  color: colors.lightred,
  perspective: '1600px', // Perspective depth
  transform: `rotateZ(1deg) `,
  transformStyle: 'preserve-3d',
};



  return (
    <>
      <ParagraphHelper ref={toref} scale={0.3} text={`TO`} position={[0.45, 1.8, -0.1]} color={colors.lightred} font={RobotoCondensedBold} />
      <ParagraphHelper ref={fardcref} scale={0.3} text={`F.A.R.D.C\nHEROES`} position={[-1.53, 0.3, -0.1]} color={colors.lightred} font={RobotoCondensedBold} />
      <ParagraphHelper ref={dateref} font={RobotoCondensedBold} scale={0.07} position={[0.3, -0.22, 3]} text={`FIGHTING SINCE 1998`} color={colors.lightred} />
      
      
      <group position={[-10, 1.4, 3]} ref={contentrefone}>
        <Html >
          <div style={textStyle3} >
            {introText}
          </div>
        </Html>
        {/* <ParagraphHelper textAlign={'right'} ref={contentrefone} font={RobotoCondensedBold} scale={0.06} lineHeight={1.3} position={[-10, 1.3, 3]} rotation={[0, 0, 0]} text={introText} color='darkred' /> */}
      </group>

       <group ref={contentreftwo} position={[10, 1, 0]}>
        <Html >
          <div  style={textStyle2}>
            {causeText}
          </div>
        </Html>
        {/* <ParagraphHelper textAlign={'right'} ref={contentrefone} font={RobotoCondensedBold} scale={0.06} lineHeight={1.3} position={[-10, 1.3, 3]} rotation={[0, 0, 0]} text={introText} color='darkred' /> */}
      </group>

       <group position={[10, 0, 0]} ref={contentrefFour}>
        <Html >
          <div style={textStyle}>
            {concludeText}
          </div>
        </Html>
        {/* <ParagraphHelper textAlign={'right'} ref={contentrefone} font={RobotoCondensedBold} scale={0.06} lineHeight={1.3} position={[-10, 1.3, 3]} rotation={[0, 0, 0]} text={introText} color='darkred' /> */}
      </group>
       <group ref={contentrefFinal} position={[-1, 10, 0]}>
        <Html >
          <div style={textStyle1}  >
            World's deadliest since World War II
          </div>
        </Html>
        {/* <ParagraphHelper textAlign={'right'} ref={contentrefone} font={RobotoCondensedBold} scale={0.06} lineHeight={1.3} position={[-10, 1.3, 3]} rotation={[0, 0, 0]} text={introText} color='darkred' /> */}
      </group>

       {/* <group ref={contentreftwo} position={[10, 0, 0]}>
        <ParagraphHelper scale={0.06} font={RobotoCondensedBold} lineHeight={1.3} textAlign={'left'} position={[0, 1, 3]} rotation={[0, 0, 0]} text={causeText} color='darkred' />
      </group> */}



      <group position={[0, 15, 0]} ref={contentrefthree}>
        <AnimatedCounter scale={1} position={[-0.5, 2.5, 0]} shouldAnimate={shouldAnimate} subtext={'DEAD'} countTo={5400000}/>
      </group>
      <group position={[0, 10, 0]} ref={contentRefThree2}>
        <AnimatedCounter scale={1} position={[0, 1.35, 0]} shouldAnimate={shouldAnimate} subtext={'DISPLACED'} countTo={7000000}/>
      </group>
      <group position={[0, 8, 0]} ref={contentRefThree3}>
        <AnimatedCounter scale={1} position={[0.75, 0.75, 0]} shouldAnimate={shouldAnimate} subtext={'RAPED'} countTo={200000}/>
      </group>

     
      {/* <ParagraphHelper textAlign={'left'} ref={contentrefFour} font={RobotoCondensedBold} scale={0.06} lineHeight={1.3} position={[10, 0.5, 3]} rotation={[0, 0, 0]} text={concludeText} color='darkred' /> */}
      <group ref={contentimageref} position={[0, -10, 0]}>
        <Items w={0.5} gap={0.2} />
      </group>
    </>
  );
};

export const Stairs = ()=>{

  const stairef = useRef();

  const {scene} = useGLTF(steps)
  // const bakedTexture = useTexture('/texture/bakedstairs.jpg'); // Adjust the path to your texture file
  // bakedTexture.flipY = false;

  // Traverse the scene to apply the texture to all materials
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      // child.material.map = bakedTexture;
      // child.material.needsUpdate = true; // Ensure the material updates
    }
  });

  ObjectAnimate('staireffwd', stairef);
  ObjectAnimate('stairefbckwd', stairef);

  return <primitive object={scene} ref={stairef} scale={0.5} position={[-1.5,-10,0.5]} rotation={[0,-0.5,0]} />
}

export const  MAPCONGO = (props)=>{
  const model = useGLTF(Congo);
  const ref = useRef()

  ObjectAnimate('congofwd', ref);
  ObjectAnimate('congobckwd', ref);


  return <primitive ref={ref} {...props} object={model.scene} />
}


export const Soldier_head_bust = (props)=>{
  
  const model = useGLTF(soldier_head_bust);
  const objectRef = useRef();
  const { isSoldierAnimated } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
  }));
  

  ObjectAnimate('soldierfwd',objectRef, isSoldierAnimated);
  ObjectAnimate('soldierbckwd',objectRef, isSoldierAnimated);
 

  useEffect(() => {
    setCastShadow(model.scene);
  }, [model.scene]);


  return (<group>
  <mesh ref={objectRef}>
     <primitive scale={0.5} position={[0,1.6,0]} rotation={[0,Math.PI * -0.25,0]} object={model.scene} />
  </mesh>  
  </group>
  )
}

// Clones of bullets
export const Bullets = () => {
  const model = useGLTF(bullet);
  const whiteMaterial = new THREE.MeshStandardMaterial({ color: 'red', roughness: 0, metalness: 1 });
 

  const bullets = [];
  const spacing = 0.5; // Spacing between each rose on the x-axis


  for (let i = 0; i < 6; i++) {
    const x = i * spacing; // Increment x position by spacing
    

    bullets.push(
      <RigidBody colliders='hull' gravityScale={(Math.random() * 0.8) + 0.8} restitution={0.3} friction={0.3}>

        <Clone
          castShadow
          key={i}
          object={model.scene}
          scale={0.05}
          position={[getExtremeRandom(0.5, 1.5),getExtremeRandom(0.5, 0.3), getExtremeRandom(0.5,0.5)]} // Use calculated x and y positions, z is fixed at 0
          rotation={[0, Math.PI * -0.5, 0]} // Apply rotation on the z-axis
          material={whiteMaterial} // Assign the white material to each clone
        />

      </RigidBody>
    );
  }

  return <>{bullets}</>;
};


// Guns 
export const Guns = ({ props }) => {
  const pistol_originalet = useGLTF(pistol_original);
  const pistol_originalet2 = useGLTF(pistol_clone_one);
  const AK_4747 = useGLTF(AK_47);
  const Rifle = useGLTF(rifle);
  const knife = useGLTF(white_knife)

const { isSoldierAnimated } = useStore((state) => ({
    isSoldierAnimated: state.isSoldierAnimated,
  }));
  const objectRefOne = useRef()
  const objectRefTwo = useRef()
  const objectRefThree = useRef()
  const objectRefFour = useRef()
  const objectRefFive = useRef()
  const groupeRef = useRef()

  useEffect(() => {
    setCastShadow(pistol_originalet.scene);
    setCastShadow(pistol_originalet2.scene);
    setCastShadow(AK_4747.scene);
    setCastShadow(Rifle.scene);
    setCastShadow(knife.scene);


  }, [pistol_originalet, pistol_originalet2, AK_4747, Rifle,knife]);

  ObjectAnimate('pistol_originalfwd',objectRefOne, isSoldierAnimated);
  ObjectAnimate('AKfwd',objectRefTwo, isSoldierAnimated);
  ObjectAnimate('Riflefwd',objectRefThree, isSoldierAnimated);
  ObjectAnimate('pistol_clonefwd',objectRefFour, isSoldierAnimated);
  ObjectAnimate('pistol_originalbckwd',objectRefOne, isSoldierAnimated);
  ObjectAnimate('AKbckwd',objectRefTwo, isSoldierAnimated);
  ObjectAnimate('Riflebckwd',objectRefThree, isSoldierAnimated);
  ObjectAnimate('pistol_clonebckwd',objectRefFour, isSoldierAnimated);
  ObjectAnimate('knifefwd',objectRefFive, isSoldierAnimated);
  ObjectAnimate('knifebckwd',objectRefFive, isSoldierAnimated);
  ObjectAnimate('groupefwd',groupeRef, isSoldierAnimated);
  ObjectAnimate('groupebckwd',groupeRef, isSoldierAnimated);


  return (
    <group  castShadow position={[0,1,0,]}>
      <group ref={groupeRef} position={[0,0,0]}>

      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefOne}   position={[-0.96, -0.12, -1.2]} rotation={[0, -3, 0]} object={pistol_originalet.scene} scale={0.006} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefTwo}  position={[0.02, 0.01, -1.48]} rotation={[0.00, 0.00, -0.02]} object={AK_4747.scene} scale={1} {...props} />
      </Float>
      <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive  ref={objectRefThree}  position={[-1.42, -0.35, -2.26]} rotation={[0, -1.58, -0.01]} object={Rifle.scene} scale={20} {...props} />
      </Float>
       <Float floatIntensity={0.2} floatingRange={[0, 1]} rotationIntensity={0.1}>
        <primitive ref={objectRefFour} position={[0.49, 0.75, -1.85]} rotation={[0, 1.60, 0]} object={pistol_originalet2.scene} scale={0.2} {...props} />
      </Float>

      </group>
      <primitive ref={objectRefFive} object={knife.scene} scale={0.5} rotation={[0,0,0.9]} position={[0.1,-0.5,2]} />
    </group>
  );
};

// Skull 
export const Skull = (props) => {
  const skullRef = useRef();
  const skullRef2 = useRef();
  const skullRef3 = useRef();
  const cemeteryRef = useRef();
  const { scene } = useGLTF(Skull_head);
  const skull2 = useGLTF(Skull_head2);
  const skull3 = useGLTF(Skull_head3);
  // const cemetery = useGLTF(Cemetery)


  ObjectAnimate('skullfwd',skullRef);
  ObjectAnimate('skullbckwd',skullRef);
  // ObjectAnimate('cemeteryfwd',cemeteryRef);
  // ObjectAnimate('cemeterybckwd',cemeteryRef);

  // ObjectAnimate('skull2fwd',skullRef2);
  // ObjectAnimate('skull2bckwd',skullRef2);

  // ObjectAnimate('skull3fwd',skullRef3);
  // ObjectAnimate('skull3bckwd',skullRef3);



  return (
     <mesh castShadow receiveShadow >
        <primitive ref={skullRef}  object={scene} scale={0.5} position={[0, -3, -0.48]} rotation={[0.1, Math.PI * -0.25, 0.5]} />
        {/* <primitive ref={skullRef2}  object={skull2.scene} scale={0.4} position={[-1.5, -10, -2]} rotation={[-0.25, 0, 0]} />
        <primitive ref={skullRef3} object={skull3.scene} scale={0.3} position={[1, -10, -2.5]} rotation={[-1.5, 1.2, 0]} /> */}
        {/* <primitive ref={cemeteryRef} object={cemetery.scene} rotation={[0,Math.PI  * 0.5,0]} position={[0,-5,0]} /> */}
    </mesh>
  );
};

// Video

export const VideoScene = (props)=>{
  const films = {
  Sintel: '/xy.mp4',
}

const { DEG2RAD } = THREE.MathUtils
  const [stream, setStream] = useState(new MediaStream())

  const { url } = useControls({
    url: {
      value: films['Sintel'],
      options: films
    },
    'getDisplayMedia (only new-window)': button(async (get) => {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
      setStream(mediaStream)
    })
  })

return <>
<group scale={4} position={[0,-1.5,0]} rotation-y={DEG2RAD * 180}>
        <Screen src={url} />
 </group>

      {/* <group rotation-y={DEG2RAD * -40}>
        <Screen src={stream} />
      </group> */}
</>

}


function Screen({ src }) {
  const [video, setVideo] = useState()

  const ratio = 16 / 9
  const width = 5
  const radius = 4
  const z = 4

  const r = useMemo(() => (video ? video.videoWidth / video.videoHeight : ratio), [video, ratio])

  return (
    <Center top position-z={z}>
      <CurvedPlane width={width} height={width / r} radius={radius}>
        <Suspense fallback={<meshStandardMaterial side={THREE.DoubleSide} wireframe />}>
          <VideoMaterial src={src} setVideo={setVideo} />
        </Suspense>
      </CurvedPlane>
    </Center>
  )
}

function VideoMaterial({ src, setVideo }) {
  const texture = useVideoTexture(src)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.x = -1
  texture.offset.x = 1

  setVideo?.(texture.image)

  return <meshStandardMaterial side={THREE.DoubleSide} map={texture} toneMapped={false} transparent opacity={1} />
}

// Preload GLTF models
 [
  white_rose,
  skull_head,
  pistol_original,
  pistol_clone_one,
  AK_47,
  rifle,
  white_knife,
  bullet,
  soldier_head_bust
].forEach((mesh) => {
  useGLTF.preload(mesh);
});
