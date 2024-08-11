import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/store';


const UI = React.memo(({ SetShowLoadingPage, font }) => {
 
  const {
    playing,
    start,
    setSoldierAnimate,
    setCurrentNavNextPage,
    setCurrentNavPrevPage,
    colors
  } = useStore(state => state);

  const [hoverState, setHoverState] = useState({
    exit: false,
    prev: false,
    next: false,
    sound: false,
  });

  const handleMouseOver = useCallback((key) => {
    setHoverState((prev) => ({ ...prev, [key]: true }));
    document.body.style.cursor = 'pointer';
  }, []);

  const handleMouseOut = useCallback((key) => {
    setHoverState((prev) => ({ ...prev, [key]: false }));
    document.body.style.cursor = 'auto';
  }, []);

  useEffect(() => {
    document.body.style.cursor = hoverState.exit || hoverState.next || hoverState.prev || hoverState.sound ? 'pointer' : 'auto';
  }, [hoverState]);

  const styles = useMemo(() => ({
    exit: {
      fontSize: '30px',
      textAlign: 'center',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
      width: '50px',
      color: hoverState.exit ? 'darkred' : 'white',
      borderRadius: '50%',
      fontWeight: 'bolder',
      padding: 0,
      transition: 'color 0.3s',
    },
    prev: {
      fontFamily: font,
      fontSize: '50px',
      textAlign: 'center',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
      width: '50px',
      color: hoverState.prev ? 'darkred' : 'white',
      borderRadius: '50%',
      fontWeight: 'bolder',
      padding: 0,
      transition: 'color 0.3s',
    },
    next: {
      fontFamily: font,
      fontSize: '50px',
      textAlign: 'center',
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
      width: '50px',
      color: hoverState.next ? 'darkred' : 'white',
      borderRadius: '50%',
      fontWeight: 'bolder',
      padding: 0,
      transition: 'color 0.3s',
    },
    sound: {
      fontFamily: font,
      fontSize: '25px',
      width: '100px',
      color: hoverState.sound ? 'white' : 'grey',
      fontWeight: 'bolder',
      padding: 0,
      transition: 'color 0.3s',
    },
  }), [hoverState, font]);

  return (
    <>
      <Html position={[-3.1, 2.2, 0]}>
        <div
          style={styles.exit}
          onMouseOver={() => handleMouseOver('exit')}
          onMouseOut={() => handleMouseOut('exit')}
          onClick={() => SetShowLoadingPage(true)}
        >
          ⎋
        </div>
      </Html>

      <Html position={[-1.5, 0, 4]}>
        <div
          style={styles.prev}
          onMouseOver={() => handleMouseOver('prev')}
          onMouseOut={() => handleMouseOut('prev')}
          onClick={setCurrentNavPrevPage}
        >
          {'◀︎'}
        </div>
      </Html>

      <Html position={[1.4, 0, 4]}>
        <div
          style={styles.next}
          onMouseOver={() => handleMouseOver('next')}
          onMouseOut={() => handleMouseOut('next')}
          onClick={() => {
            setSoldierAnimate(true);
            setCurrentNavNextPage();
          }}
        >
          {'▶︎'}
        </div>
      </Html>

      <Html position={[2.70, 2.1, 0]}>
        <div
          onClick={start}
          onMouseOver={() => handleMouseOver('sound')}
          onMouseOut={() => handleMouseOut('sound')}
          style={styles.sound}
        >
          
          {playing ? "🔉" : "🔇"}
        </div>
      </Html>
    </>
  );
});

export default UI;
