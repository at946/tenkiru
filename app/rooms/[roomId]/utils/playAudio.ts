export const playAudio = (src: string): void => {
  const audio: HTMLAudioElement = new Audio(src);
  audio.play();
};
