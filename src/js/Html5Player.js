import Keyboard from './utils/Keyboard';
import KeyboardHandler from './utils/KeyboardHandler';

// Check every 200 ms, lower returns false positives and higher becomes too unresponsive.
const CHECK_INTERVAL = 200;

class Html5Player extends Meister.PlayerPlugin {
    constructor(config, meister) {
        super(config, meister);

        this.isLoaded = false;
        this.seekToWhenLoaded = null;

        // Monitoring progress.
        this.bufferingMonitor = null;
        this.CHECK_INTERVAL = this.config.checkInterval || CHECK_INTERVAL;
        this.lastPlayPos = 0;
        this.buffering = false;
        this.playerPlayEvent = null;
        this.playerPauseEvent = null;

        this.on('itemLoaded', this.onItemLoaded.bind(this));
    }

    static get pluginName() {
        return 'Html5Player';
    }

    isTypeSupported(type) {
        if (type === 'html5') {
            return true;
        }

        return false;
    }

    preloadContent() {
        // It seems that the mediaElement.load() is not needed. Replaced with a hard resolve;
        return Promise.resolve();
    }

    /**
     * Load the global settings into the html5 video element
     */
    load(mediaItem) {
        super.load(mediaItem);

        this.mediaElement = document.createElement('video');
        if (this.meister.config.audioOnly || mediaItem.mediaType === 'audio') {
            // TODO create own plugin for audio player
            this.backgroundImage = document.createElement('div');
            this.defaultImageUrl = this.meister.config.defaultAudioImage || '';
            this.backgroundImage.style['background-image'] = `url(${this.defaultImageUrl})`;
            this.backgroundImage.setAttribute('class', 'pf-audio-image');

            this.wrapper.append(this.backgroundImage);
            this.mediaElement = document.createElement('audio');
        }

        // this.mediaElement.id = this.meister.config.playerID + Math.random();
        this.mediaElement.width = this.config.width;
        this.mediaElement.height = this.config.height;
        this.mediaElement.setAttribute('class', this.meister.config.playerClass);

        // for doubleclick enabled behavior on iOS the playsinline attribute must be true
        if (this.meister.config.iosPlaysInline) {
            this.mediaElement.setAttribute('playsinline', true);
        }

        // this.mediaElement.controls = this.meister.config.controls;
        this.mediaElement.muted = this.meister.config.startMuted;

        this.wrapper.appendChild(this.mediaElement);

        this.meister.on('playerPlay', () => {
            // Replays are when an end event has been triggered and the user clicks on play again.
            if (this.shouldTriggerReplay) {
                this.meister.trigger('playerReplay', {});
                this.shouldTriggerReplay = false;
                return;
            }

            if (this.firstPlayTriggered) return;
            this.firstPlayTriggered = true;

            this.meister.trigger('playerFirstPlay', {});
        });


        this.mediaElement.addEventListener('play', () => {
            this.meister.trigger('playerPlay', this.playerPlayEvent);
            this.playerPlayEvent = null;
        });

        this.mediaElement.addEventListener('pause', () => {
            this.meister.trigger('playerPause', this.playerPauseEvent);
            this.playerPauseEvent = null;
        });

        this.mediaElement.addEventListener('playing', () => this.meister.trigger('playerPlaying'));

        this.mediaElement.addEventListener('ended', () => {
            this.shouldTriggerReplay = true;
            this.meister.trigger('playerEnd');
        });

        this.mediaElement.addEventListener('error', () => {
            if (this.mediaElement.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                this.meister.error('Media not found', Meister.ErrorCodes.NO_MEDIA_FOUND);
            }

            this.meister.trigger('playerError', { mediaError: this.mediaElement.error });
        });

        this.mediaElement.addEventListener('seeked', () => this.meister.trigger('_playerSeek'));
        this.mediaElement.addEventListener('seeking', () => this.meister.trigger('playerSeeking'));
        this.mediaElement.addEventListener('timeupdate', () => this.meister.trigger('_playerTimeUpdate'));
        this.mediaElement.addEventListener('progress', () => this.meister.trigger('playerProgress', this.mediaElement));
        this.mediaElement.addEventListener('loadedmetadata', () => this.meister.trigger('playerLoadedMetadata'));
        this.mediaElement.addEventListener('durationchange', () => this.meister.trigger('playerDurationChange'));
        this.mediaElement.addEventListener('volumechange', () => this.meister.trigger('playerVolumeChange'));

        this.mediaElement.addEventListener('loadedmetadata', () => {
            this.isLoaded = true;
            if (this.seekToWhenLoaded) {
                this.currentTime = this.seekToWhenLoaded;
                this.seekToWhenLoaded = null;
            }
        });

        // keyboard handling
        const kb = new KeyboardHandler(this.meister.container, this.meister.eventHandler);
        kb.onKey([Keyboard.Space, Keyboard.Pause, Keyboard.PlayPause, Keyboard.Stop], this.onSpace.bind(this));
        kb.onKey(Keyboard.NextTrack, this.nextTrack.bind(this));
        kb.onKey(Keyboard.PreviousTrack, this.previousTrack.bind(this));

        kb.onKey(Keyboard.ArrowLeft, this.seekBack.bind(this));
        kb.onKey(Keyboard.ArrowRight, this.seekForward.bind(this));
        kb.onKey(Keyboard.KeyF, this.onKeyF.bind(this));

        // Buffering event.
        this.bufferingMonitor = setInterval(this.monitorBuffering.bind(this), this.CHECK_INTERVAL);

        // Reset nudge counter.
        this.on('itemUnloaded', this.onItemUnloaded.bind(this));

        this.meister.trigger('playerCreated');
    }

    onItemLoaded(event) {
        if (event.item.crossorigin) {
            this.mediaElement.setAttribute('crossorigin', event.item.crossorigin);
        } else {
            this.mediaElement.removeAttribute('crossorigin');
        }

        if (this.meister.config.audioOnly || event.item.mediaType === 'audio') {
            if (event.item.backgroundImage) {
                this.backgroundImage.style['background-image'] = `url(${event.item.backgroundImage})`;
            } else {
                this.backgroundImage.style['background-image'] = `url(${this.defaultImageUrl})`;
            }
        }
    }

    onItemUnloaded() {
        this.canNudge = 0;
        this.firstPlayTriggered = false;
    }


    monitorBuffering() {
        const currentPlayPos = this.mediaElement.currentTime;

        // Convert ms to s.
        const offset = 1 / this.CHECK_INTERVAL;

        if (!this.mediaElement.paused) {
            // Special check for special Samsung stock browser which reports currentTime as 0 for icecast streams.
            if (this.meister.browser.isSamsung && this.mediaElement.readyState === this.mediaElement.HAVE_ENOUGH_DATA && currentPlayPos === 0) {
                this.meister.trigger('playerBufferedEnough');
            } else if (!this.buffering && currentPlayPos < this.lastPlayPos + offset) {
                this.buffering = true;
                this.meister.trigger('playerBuffering');
                this.meister.trigger('showLoading', {
                    code: 'VIDEO_BUFFERING',
                });
            } else if (this.buffering && currentPlayPos > this.lastPlayPos + offset) {
                this.buffering = false;
                this.meister.trigger('playerBufferedEnough');
            }
        }

        this.lastPlayPos = currentPlayPos;
    }

    unload() {
        clearInterval(this.bufferingMonitor);
        if (this.mediaElement) { this.mediaElement.remove(); }

        this.meister.trigger('playerDestroyed');
        super.unload();
    }

    set currentSrc(url) {
        if (!this.mediaElement) { return; }

        this.isLoaded = false;
        this.mediaElement.src = url;
    }

    get currentSrc() {
        if (!this.mediaElement) { return null; }

        return this.mediaElement.src;
    }

    get volume() {
        if (!this.mediaElement) { return null; }

        return this.mediaElement.volume;
    }

    set volume(volume) {
        if (!this.mediaElement) { return; }

        this.mediaElement.volume = volume;
    }

    get muted() {
        if (!this.mediaElement) { return null; }

        return this.mediaElement.muted;
    }

    set muted(muted) {
        if (!this.mediaElement) { return; }

        this.mediaElement.muted = muted;
    }

    play(e) {
        this.playerPlayEvent = e; // keep reference to e in class so we can pass it to playerPlay in event stack

        // Player unloaded.
        if (!this.mediaElement) { return; }

        // Chrome 50 introduces promise on media.play()
        const playPromise = this.mediaElement.play();

        if (playPromise) {
            // Known bug in chrome 50, so we catch it and try playing again.
            // https://bugs.chromium.org/p/chromium/issues/detail?id=593273
            playPromise.catch((err) => {
                // An ad pauses content, no need to play again right away.
                if (err.message.indexOf('call to pause') === -1) {
                    setTimeout(() => {
                        this.play();
                    }, 100);
                }
            });
        }
    }

    pause(e) {
        this.playerPauseEvent = e;

        if (!this.mediaElement) { return; }

        this.mediaElement.pause();
    }

    get duration() {
        if (!this.mediaElement) { return null; }

        return this.mediaElement.duration;
    }

    get playing() {
        if (!this.mediaElement) { return null; }

        return !this.mediaElement.paused;
    }

    get currentTime() {
        if (!this.mediaElement) { return null; }

        return this.mediaElement.currentTime;
    }

    set currentTime(time) {
        if (!this.mediaElement) { return; }

        if (this.isLoaded) {
            this.mediaElement.currentTime = time;
        } else {
            this.seekToWhenLoaded = time;
        }
    }

    onSpace(e) {
        e.preventDefault();
        if (this.meister.playing === true) {
            this.meister.pause();
        } else {
            this.meister.play();
        }
    }

    nextTrack(e) {
        e.preventDefault();
        this.meister.trigger('playlistNext');
    }

    previousTrack(e) {
        e.preventDefault();
        this.meister.trigger('playlistPrevious');
    }


    seekBack(e) {
        e.preventDefault();
        this.meister.trigger('requestSeek', {
            timeOffset: -5,
        });
    }

    seekForward(e) {
        e.preventDefault();
        this.meister.trigger('requestSeek', {
            timeOffset: 5,
        });
    }

    onKeyF(e) {
        e.preventDefault();
        if (this.meister.isFullscreen) {
            this.meister.cancelFullscreen();
        } else {
            this.meister.requestFullscreen();
        }
    }
}

Meister.registerPlugin(Html5Player.pluginName, Html5Player);

export default Html5Player;
