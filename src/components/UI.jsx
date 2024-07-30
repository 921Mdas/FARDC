import React, { useState, useEffect } from 'react';
import { Center, Html, Text } from '@react-three/drei';
import {useStore} from '../store/store';
import CameraAnimate from './CameraAnimPos';
import { Vector3, Euler } from 'three';
import RobotoCondensedBold from "../assets/fonts/RbtcBold.ttf";



const UI = ({ SetShowLoadingPage, font }) => {
  const {playing, start, setSoundHover, soundHover, exitHoverNav, nextHoverNav,
       prevHoverNav, setHoverNextNav, 
       setHoverPrevNav, setHoverExitNav
     , setSoldierPos, setSoldierAnimate, setCurrentNavNextPage, setCurrentNavPrevPage} = useStore((state) => ({
    exitHoverNav: state.exitHoverNav,
    nextHoverNav: state.nextHoverNav,
    prevHoverNav: state.prevHoverNav,
    soundHover: state.soundHover,
    setHoverExitNav: state.setHoverExitNav,
    setHoverNextNav: state.setHoverNextNav,
    setHoverPrevNav: state.setHoverPrevNav,
    setSoundHover: state.setSoundHover,
    playing:state.playing,
    start: state.start,

    // soldier bust functions
    setSoldierPos: state.setSoldierPos,
    setSoldierAnimate: state.setSoldierAnimate,

    // navigation
    setCurrentNavNextPage: state.setCurrentNavNextPage,
    setCurrentNavPrevPage: state.setCurrentNavPrevPage
  }));


  const [animateCamera, setAnimateCamera] = useState(false);


  useEffect(() => {
    if (exitHoverNav || nextHoverNav || prevHoverNav || soundHover ) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [exitHoverNav, nextHoverNav, prevHoverNav, soundHover]);

  const handleCameraAnimate = () => {
    setAnimateCamera(true);
  };

  const handleObjectAnimate = () => {
    setSoldierAnimate(true)
  };

  return (
    <>
      <Html position={[-3.1, 2.2, 0]}>
        <div
          style={{ fontSize: '30px',
      textAlign: 'center', // Center text horizontally
      display: 'grid',
      justifyContent: 'center', // Center content horizontally
      alignItems: 'center', // Center content vertically
      height: '50px', // Set height to ensure vertical centering
      width: '50px', // Set width to ensure horizontal centering
      color: exitHoverNav ? 'darkred' : 'white',
      borderRadius:'50%',
      fontWeight:'bolder',
      backgroundColor:'',
      padding:0 }}
          onMouseOver={() => setHoverExitNav(true)}
          onMouseOut={() => setHoverExitNav(false)}
          onClick={() => SetShowLoadingPage(true)}
        >
          ⏎
        </div>
      </Html>

      <Html position={[-0.8, 0, 4]}>
        <div
          style={{ 

     fontFamily: font,
      fontSize: '50px',
      textAlign: 'center', // Center text horizontally
      display: 'grid',
      justifyContent: 'center', // Center content horizontally
      alignItems: 'center', // Center content vertically
      height: '50px', // Set height to ensure vertical centering
      width: '50px', // Set width to ensure horizontal centering
      color: prevHoverNav ? 'darkred' : 'white',
      borderRadius:'50%',
      fontWeight:'bolder',
      backgroundColor:'',
      padding:0
          }}
          onMouseOver={() => setHoverPrevNav(true)}
          onMouseOut={() => setHoverPrevNav(false)}
          onClick={()=>
            setCurrentNavPrevPage()
          }
        >
          {'<'}
        </div>
      </Html>


      <Html position={[-0.4, 0, 4]}>
        <div
          style={{ fontFamily: font,
      fontSize: '50px',
      textAlign: 'center', // Center text horizontally
      display: 'grid',
      justifyContent: 'center', // Center content horizontally
      alignItems: 'center', // Center content vertically
      height: '50px', // Set height to ensure vertical centering
      width: '50px', // Set width to ensure horizontal centering
      color: nextHoverNav ? 'darkred' : 'white',
      borderRadius:'50%',
      fontWeight:'bolder',
      backgroundColor:'',
      padding:0 }}
          onMouseOver={() => setHoverNextNav(true)}
          onMouseOut={() => setHoverNextNav(false)}
          onClick={()=>{handleObjectAnimate()
          setCurrentNavNextPage()
          }}
        >
          {'>'}
        </div>
      </Html>

       <Html   position={[2.68, 2.1, 0]} >
                  <div onClick={start} onMouseOver={() => setSoundHover(true)}
          onMouseOut={() => setSoundHover(false)}  style={{ fontFamily: font,
      fontSize: '12px',
      width: '100px', // Set width to ensure horizontal centering
      color: playing ? 'white' : 'grey',
      fontWeight:'bolder',
      padding:0 }} >
                    {playing ? 'SOUND ON' : 'SOUND OFF'}
                  </div>
       </Html>
      
      {animateCamera && (
        <CameraAnimate
          finalPosition={new Vector3(0.5, 0, 0)}
          finalRotation={new Euler(0, 0, 0)}
          duration={1}
        />
      )}
    </>
  );
};

export default UI;
