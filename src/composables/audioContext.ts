import type { InjectionKey, Ref } from 'vue';

export interface AudioContext {
  audioElement: Ref<HTMLAudioElement | null>;
  play: Ref<boolean>;
  mute: Ref<boolean>;
  currentTime: Ref<number>;
  duration: Ref<number>;
  volume: Ref<number>;
}

// Define an InjectionKey with the type of AudioContext
export const AudioContextKey: InjectionKey<AudioContext> = Symbol('AudioContext');
