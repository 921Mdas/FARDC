import React, { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import {useStore} from '../store/store';
import CameraAnimate from './CameraAnimPos';
import { Vector3, Euler } from 'three';

const UI = ({ SetShowLoadingPage, font }) => {
  const { exitHoverNav, nextHoverNav,
       prevHoverNav, setHoverNextNav, 
       setHoverPrevNav, setHoverExitNav
     , setSoldierPos, setSoldierAnimate, setCurrentNavNextPage, setCurrentNavPrevPage} = useStore((state) => ({
    exitHoverNav: state.exitHoverNav,
    nextHoverNav: state.nextHoverNav,
    prevHoverNav: state.prevHoverNav,
    setHoverExitNav: state.setHoverExitNav,
    setHoverNextNav: state.setHoverNextNav,
    setHoverPrevNav: state.setHoverPrevNav,

    // soldier bust functions
    setSoldierPos: state.setSoldierPos,
    setSoldierAnimate: state.setSoldierAnimate,

    // navigation
    setCurrentNavNextPage: state.setCurrentNavNextPage,
    setCurrentNavPrevPage: state.setCurrentNavPrevPage
  }));


  const [animateCamera, setAnimateCamera] = useState(false);


  useEffect(() => {
    if (exitHoverNav || nextHoverNav || prevHoverNav) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [exitHoverNav, nextHoverNav, prevHoverNav]);

  const handleCameraAnimate = () => {
    setAnimateCamera(true);
  };

  const handleObjectAnimate = () => {
    setSoldierAnimate(true)
  };

  return (
    <>
      <Html position={[-3, 2, 0]}>
        <div
          style={{ fontFamily: font, fontSize:'30px', color: exitHoverNav ? 'darkred' : 'grey', cursor: 'pointer' }}
          onMouseOver={() => setHoverExitNav(true)}
          onMouseOut={() => setHoverExitNav(false)}
          onClick={() => SetShowLoadingPage(true)}
        >
          ⏎
        </div>
      </Html>

      <Html position={[-1.48, 0.1, 4]}>
        <div
          style={{ fontFamily: font, fontSize:'40px', color: prevHoverNav ? 'darkred' : 'grey', cursor: 'pointer' }}
          onMouseOver={() => setHoverPrevNav(true)}
          onMouseOut={() => setHoverPrevNav(false)}
          onClick={()=>
            setCurrentNavPrevPage()
          }
        >
          {'<'}
        </div>
      </Html>


      <Html position={[1.4, 0.1, 4]}>
        <div
          style={{ position:'fixed',fontSize:'40px',  fontFamily: font, color: nextHoverNav ? 'darkred' : 'grey', cursor: 'pointer' }}
          onMouseOver={() => setHoverNextNav(true)}
          onMouseOut={() => setHoverNextNav(false)}
          onClick={()=>{handleObjectAnimate()
          setCurrentNavNextPage()
          }}
        >
          {'>'}
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
