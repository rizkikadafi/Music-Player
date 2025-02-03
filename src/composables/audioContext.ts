import { onMounted, onUnmounted, ref, watch, type InjectionKey, type Ref } from 'vue';

export interface AudioContext {
  path: Ref<string>;
  audioElement: Ref<HTMLAudioElement | null>;
  isPlaying: Ref<boolean>;
  isMuted: Ref<boolean>;
  duration: Ref<number>;
  currentTime: Ref<number>;
  volume: Ref<number>;
  play: () => void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
  seek: (val: number) => void;
}

export const AudioContextKey: InjectionKey<AudioContext> = Symbol('AudioContext');

export function createAudioContext(src: string): AudioContext {
  const path = ref(src);
  const audioElement = ref<HTMLAudioElement | null>(null);
  const isPlaying = ref(false);
  const volume = ref(1);
  const isMuted = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);

  function createAudio() {
    if (audioElement.value) {
      audioElement.value.pause();
      audioElement.value.src = "";
    }

    const audio = new Audio(path.value);
    audioElement.value = audio;

    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration;
    });

    audio.addEventListener('timeupdate', () => {
      currentTime.value = audio.currentTime;
    });

    audio.addEventListener('ended', () => {
      isPlaying.value = false;
    });

    if (isMuted.value) {
      audio.muted = true;
    }

    audio.volume = volume.value;
  }

  watch(path, () => {
    createAudio();
  });

  onMounted(() => {
    createAudio();
  });

  onUnmounted(() => {
    if (audioElement.value) {
      audioElement.value.pause();
      audioElement.value.src = "";
    }
  });

  const play = () => {
    if (audioElement.value) {
      audioElement.value.play();
      isPlaying.value = true;
    }
  };

  const pause = () => {
    if (audioElement.value) {
      audioElement.value.pause();
      isPlaying.value = false;
    }
  };

  const togglePlay = () => {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  };

  const mute = () => {
    if (audioElement.value) {
      isMuted.value = true;
      audioElement.value.muted = isMuted.value;
    }
  }

  const unmute = () => {
    if (audioElement.value) {
      isMuted.value = false;
      audioElement.value.muted = isMuted.value;
    }
  }

  const toggleMute = () => {
    if (isMuted.value) {
      unmute()
    } else {
      mute()
    }
  };

  const setVolume = (vol: number) => {
    if (audioElement.value) {
      audioElement.value.volume = vol;
      volume.value = vol;
    }
  };

  const seek = (val: number) => {
    audioElement.value!.currentTime = val;
  }

  return {
    path,
    audioElement,
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    play,
    pause,
    togglePlay,
    mute,
    unmute,
    toggleMute,
    setVolume,
    seek,
  };
}
