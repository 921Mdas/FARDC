import { create } from 'zustand';
import { Vector3, Euler, MathUtils } from 'three';
import { addEffect } from "@react-three/fiber";

let audio, audioContext, sourceNode, analyzerNode, audioData;
let gainNode;

const createAudio = (url) => {
  try {
    if (!audio) {
      audio = new Audio(url);
    } else {
      audio.src = url;
    }

    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!sourceNode) {
      sourceNode = audioContext.createMediaElementSource(audio);
      analyzerNode = audioContext.createAnalyser();
      sourceNode.connect(analyzerNode);

      gainNode = audioContext.createGain();
      gainNode.gain.value = 0.1;

      sourceNode.loop = false;
      gainNode.connect(audioContext.destination);
      analyzerNode.connect(gainNode);
      analyzerNode.fftSize = 512;
      audioData = new Float32Array(analyzerNode.frequencyBinCount);

      audio.addEventListener('ended', handleSongEnd);
    }

    console.log("Audio created and nodes connected");

  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while creating audio");
  }
};

const handleSongEnd = () => {
  const { currentSongIndex, songs, setCurrentSongIndex, start } = useStore.getState();
  const nextSongIndex = (currentSongIndex + 1) % songs.length;
  setCurrentSongIndex(nextSongIndex);
  createAudio(songs[nextSongIndex]);
  start();
  console.log("Song ended, next song started");
};

export const useStore = create((set, get) => ({
  // Welcome loader
  showLoadingPage: true,
  setShowLoadingPage: (loading) => set({ showLoadingPage: loading }),

  // Colors & fonts
  colors: {
    black: '#1c162e',
    darkred: "#3c162e",
    white: 'white',
    lightred: '#7c162e',
  },

  // UI hover state
  exitHoverNav: false,
  nextHoverNav: false,
  prevHoverNav: false,
  soundHover: false,
  currentNav: 0,

  setHoverExitNav: (hover) => set({ exitHoverNav: hover, currentNav: 0 }),
  setHoverNextNav: (hover) => set({ nextHoverNav: hover }),
  setHoverPrevNav: (hover) => set({ prevHoverNav: hover }),
  setSoundHover: (hover) => set({ soundHover: hover }),

  // Camera movement
  camInitPos: new Vector3(0, 2.5, 20),
  camFinalPos: new Vector3(0, 1, 8),
  camInitRot: new Euler(MathUtils.degToRad(10), 0, 0),
  camFinalRot: new Euler(0, 0, 0),

  // Performance
  perfsucks: false,
  deprecate: (hasdepreciated) => set({ perfsucks: hasdepreciated }),

  // Object movement
  isSoldierAnimated: false,
  soldierPos: new Vector3(0, 2.5, 20),
  setSoldierPos: (newPos) => set({ soldierPos: newPos }),
  setSoldierAnimate: (isAnimated) => set({ isSoldierAnimated: isAnimated }),
  setCurrentNavNextPage: () => set((state) => ({ currentNav: state.currentNav < 3 ? state.currentNav + 1 : state.currentNav })),
  setCurrentNavPrevPage: () => set((state) => ({ currentNav: state.currentNav > 0 ? state.currentNav - 1 : 0 })),

  // Audio state
  songs: ['/Forsaken.mp3'], // List of songs
  currentSongIndex: 0,
  playing: false,
  ended: false,
  paused: true,
  isAudioPaused: true, // New state to track audio paused status
  analyzer: null,
  songData: [],
  average: 0,

  setCurrentSongIndex: (index) => set({ currentSongIndex: index }),

  avg: () => {
    let value = 0;
    for (let i = 0; i < audioData.length; i++) value += audioData[i];
    const average = value / audioData.length;
    set({ average });
  },

  updateAudioData: () => {
    addEffect(() => {
      if (!audioData) return;
      analyzerNode?.getFloatFrequencyData(audioData);
      get().avg(); // Call avg() to update the average
      set({ songData: Array.from(audioData) }); // Copy audioData to trigger re-render
      console.log("Audio data updated");
    });
  },

  updateSongData: () => {
    set({ songData: audioData });
    console.log("Song data updated");
  },

  start: () => {
    if (!audioContext) createAudio(get().songs[get().currentSongIndex]);
    if (get().isAudioPaused) {
      audio.play();
      set({ playing: true, isAudioPaused: false });
      console.log("Audio playing");
    } else {
      audio.pause();
      set({ playing: false, isAudioPaused: true });
      console.log("Audio paused");
    }
  },

  reset: () => {
    set({ ended: false, paused: true, playing: false });
    console.log("Audio reset");
  },

  end: (status) => {
    set({ ended: status });
    console.log("Audio ended:", status);
  },

  pausing: (status) => {
    set({ paused: status });
    console.log("Audio paused status:", status);
  },
}));

// Debug: Log changes in the store to verify updates
useStore.subscribe((state) => console.log('State changed:', state));
