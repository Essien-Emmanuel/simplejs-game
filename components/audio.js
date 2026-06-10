export class AudioManager {
  constructor() {
    this.audioContainer = {};
    this.targetAudio = null;
  }

  loadAudio(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = src;

      audio.onloadeddata = () => {
        audio.onloadeddata = null;
        audio.onerror = null;
        return resolve(audio);
      };

      audio.onerror = (err) => {
        audio.onloadeddata = null;
        audio.onerror = null;
        console.error("Audio src ", src, " failed to load");
        return reject(err);
      };
    });
  }

  register({ title, audio, volume, loop }) {
    audio.volume = volume ?? 1;
    audio.loop = loop ?? false;
    this.audioContainer[title] = audio;
    this.targetAudio = audio;
    return this;
  }

  setTarget(title) {
    return (this.targetAudio = this.audioContainer[title]);
  }

  has(title) {
    return !!this.audioContainer[title];
  }

  pause() {
    if (this.targetAudio) this.targetAudio.pause();
  }

  play() {
    if (this.targetAudio) this.targetAudio.play();
  }

  setVolume(vol) {
    if (this.targetAudio) this.targetAudio.volume = vol;
  }

  loop(value = true) {
    if (this.targetAudio) this.targetAudio.loop = value;
  }

  setPlayTime(value = 0) {
    if (this.targetAudio) this.targetAudio.currentTime = value;
  }
}
