import { ref, onUnmounted } from 'vue';
import Lottie, { type AnimationItem } from 'lottie-web';

export function useLottie(
  animationPath: string,
  options: {
    loop: boolean,
    autoplay: boolean,
    startFrame: number,
  } = { loop: false, autoplay: false, startFrame: 0 }
) {
  const animationInstances = ref<AnimationItem[]>([]); // Stores all Lottie animation instances
  const animationState = ref({
    isPlaying: false,
    currentFrame: options.startFrame,
    speed: 1,
  }); // Shared animation state

  // Function to initialize Lottie animation on a container
  function mountAnimation(container: Element) {
    if (!container) return;

    const animation = Lottie.loadAnimation({
      container,
      path: animationPath,
      renderer: 'svg',
      loop: options.loop,
      autoplay: options.autoplay,
    });

    // Sync the new instance with the shared state
    animation.goToAndStop(animationState.value.currentFrame, true);
    animation.setSpeed(animationState.value.speed);
    if (animationState.value.isPlaying) {
      animation.play();
    }

    // Add the instance to the list
    animationInstances.value.push(animation);

    return animation;
  }

  // Function to play/pause all animations
  function togglePlay() {
    animationState.value.isPlaying = !animationState.value.isPlaying;
    animationInstances.value.forEach((animation) => {
      if (animationState.value.isPlaying) {
        animation.play();
      } else {
        animation.pause();
      }
    });
  }

  function playSegments(start: number, end: number) {
    animationInstances.value.forEach((animation) => {
      animation.playSegments([start, end], true);
    });
  }

  // Function to seek to a specific frame
  // function seekTo(frame) {
  //   animationState.value.currentFrame = frame;
  //   animationInstances.value.forEach((animation) => {
  //     animation.goToAndStop(frame, true);
  //   });
  // }

  // Function to set playback speed
  // function setSpeed(speed) {
  //   animationState.value.speed = speed;
  //   animationInstances.value.forEach((animation) => {
  //     animation.setSpeed(speed);
  //   });
  // }

  // Clean up animations when the composable is no longer used
  onUnmounted(() => {
    animationInstances.value.forEach((animation) => {
      animation.destroy();
    });
    animationInstances.value = [];
  });

  return {
    mountAnimation,
    togglePlay,
    playSegments,
    // seekTo,
    // setSpeed,
    animationState,
  };
}
