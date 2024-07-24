import { create } from 'zustand';
import { Vector3, Euler, MathUtils } from 'three';
import { addEffect } from "@react-three/fiber";

let audio, audioContext, sourceNode, analyzerNode, audioData;
let gainNode;

// Audio API
const createAudio = url => {
  try {
    audio = document.createElement("audio");
    audio.src = url;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audio);

    analyzerNode = audioContext.createAnalyser();
    sourceNode.connect(analyzerNode);

    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.1;

    sourceNode.loop = true;
    gainNode.connect(audioContext.destination);

    analyzerNode.connect(gainNode);
    analyzerNode.fftSize = 512;

    audioData = new Float32Array(analyzerNode?.frequencyBinCount);
  } catch (error) {
    console.log(error);
    throw new Error("something went wrong");
  }
};

export const useStore = create((set, get) => ({
  // UI hover state
  exitHoverNav: false,
  nextHoverNav: false,
  prevHoverNav: false,
  currentNav: 0,

  setHoverExitNav: (hover) => set({ exitHoverNav: hover, currentNav: 0 }),
  setHoverNextNav: (hover) => set({ nextHoverNav: hover }),
  setHoverPrevNav: (hover) => set({ prevHoverNav: hover }),

  // Camera movement
  camInitPos: new Vector3(0, 2.5, 20),
  camFinalPos: new Vector3(0, 1, 8),
  camInitRot: new Euler(MathUtils.degToRad(10), 0, 0),
  camFinalRot: new Euler(0, 0, 0),

  // Object movement
  isSoldierAnimated: false,
  soldierPos: new Vector3(0, 2.5, 20),
  setSoldierPos: (newPos) => set({ soldierPos: newPos }),
  setSoldierAnimate: (isAnimated) => set({ isSoldierAnimated: isAnimated }),
  setCurrentNavNextPage: () => set((state) => ({ currentNav: state.currentNav < 3 ? state.currentNav + 1 : state.currentNav })),
  setCurrentNavPrevPage: () => set((state) => ({ currentNav: state.currentNav > 0 ? state.currentNav - 1 : 0 })),

  // Audio state
  stop: '/Stop.mp3',
  twosteps: '/TwoStepsV.mp3',
  playing: false,
  ended: false,
  paused: true,
  isAudioPaused: true, // New state to track audio paused status
  analyzer: null,
  songData: [],
  average: 0,

  start: () => {
    if (!audioContext) createAudio(get().stop);
    if (get().isAudioPaused) {
      audio.play();
      set({ playing: true, isAudioPaused: false });
    } else {
      audio.pause();
      set({ playing: false, isAudioPaused: true });
    }
  },

  reset: () => {
    set({ ended: false, paused: true, playing: false });
  },
  end: (status) => {
    set({ ended: status });
  },
  pausing: (status) => {
    set({ paused: status });
  },
}));
