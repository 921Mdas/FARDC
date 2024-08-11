import './App.css';
import  {THREEJSCENE}  from './ThreeJS';
import { Suspense } from 'react';
import {Leva} from 'leva'
import WelcomePage from './components/Welcome';
import { useStore } from './store/store';
import { Loader } from '@react-three/drei';

function App() {

  const {showLoadingPage, setShowLoadingPage} = useStore((state)=>({
    showLoadingPage:  state.showLoadingPage,
    setShowLoadingPage: state.setShowLoadingPage
  }))

  return (
    <div className="App fixed top-0 left-0 w-full h-full overflow-hidden" >
         {showLoadingPage    
          ? 
            <>
             <WelcomePage SetShowLoadingPage={setShowLoadingPage} />
             <Leva hidden={true} />
            </>        
        : <Suspense fallback={<Loader />}>
             <THREEJSCENE />
             <Leva hidden={true} />

          </Suspense>
  }
    </div>
  );
}

export default App;
