import { create } from 'zustand'
import { Vector3 } from 'three'
import { Euler } from 'three'
import { MathUtils } from 'three'


const useStore = create((set) => ({

//  UI hover state
 exitHoverNav: false,
 nextHoverNav: false,
 prevHoverNav:false,
 currentNav: 0,

 setHoverExitNav: (hover) => set({ exitHoverNav: hover, currentNav: 0 }),
 setHoverNextNav: (hover) => set((state)=>({ nextHoverNav: hover })),
 setHoverPrevNav: (hover) => set((state)=>({ prevHoverNav: hover })),


// camera movement
 camInitPos: new Vector3(0, 2.5, 20),
 camFinalPos: new Vector3(0, 1, 8),
 camInitRot: new Euler(MathUtils.degToRad(10), 0, 
 0),
 camFinalRot: new Euler(0, 0, 0),

//  object movement
isSoldierAnimated: false,
soldierPos: new Vector3(0, 2.5, 20),

setSoldierPos: (newPos)=>set({soldierPos:newPos}),

setSoldierAnimate: (isAnimated)=>set({isSoldierAnimated: isAnimated}),
setCurrentNavNextPage: () => set((state) => ({ currentNav: state.currentNav < 3 ? state.currentNav + 1 : state.currentNav })),
  setCurrentNavPrevPage: () => set((state) => ({ currentNav: state.currentNav > 0 ? state.currentNav - 1 : 0 })),

}))

export default useStore