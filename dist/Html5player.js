module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Html5Player = __webpack_require__(1);

var _Html5Player2 = _interopRequireDefault(_Html5Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Html5Player2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Keyboard = __webpack_require__(2);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _KeyboardHandler = __webpack_require__(3);

var _KeyboardHandler2 = _interopRequireDefault(_KeyboardHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Check every 200 ms, lower returns false positives and higher becomes too unresponsive.
var CHECK_INTERVAL = 200;

var Html5Player = function (_Meister$PlayerPlugin) {
    _inherits(Html5Player, _Meister$PlayerPlugin);

    function Html5Player(config, meister) {
        _classCallCheck(this, Html5Player);

        var _this = _possibleConstructorReturn(this, (Html5Player.__proto__ || Object.getPrototypeOf(Html5Player)).call(this, config, meister));

        _this.isLoaded = false;
        _this.seekToWhenLoaded = null;

        // Monitoring progress.
        _this.bufferingMonitor = null;
        _this.CHECK_INTERVAL = _this.config.checkInterval || CHECK_INTERVAL;
        _this.lastPlayPos = 0;
        _this.buffering = false;
        _this.playerPlayEvent = null;
        _this.playerPauseEvent = null;
        return _this;
    }

    _createClass(Html5Player, [{
        key: 'isTypeSupported',
        value: function isTypeSupported(type) {
            if (type === 'html5') {
                return true;
            }

            return false;
        }
    }, {
        key: 'preloadContent',
        value: function preloadContent() {
            // It seems that the mediaElement.load() is not needed. Replaced with a hard resolve;
            return Promise.resolve();
        }

        /**
         * Load the global settings into the html5 video element
         */

    }, {
        key: 'load',
        value: function load(mediaItem) {
            var _this2 = this;

            _get(Html5Player.prototype.__proto__ || Object.getPrototypeOf(Html5Player.prototype), 'load', this).call(this, mediaItem);

            this.mediaElement = document.createElement('video');
            if (this.meister.config.audioOnly || mediaItem.mediaType === 'audio') {
                // TODO create own plugin for audio player
                this.backgroundImage = document.createElement('div');
                this.defaultImageUrl = this.meister.config.defaultAudioImage || '';
                this.backgroundImage.style['background-image'] = 'url(' + this.defaultImageUrl + ')';
                this.backgroundImage.setAttribute('class', 'pf-audio-image');

                this.wrapper.append(this.backgroundImage);
                this.mediaElement = document.createElement('audio');
            }

            // this.mediaElement.id = this.meister.config.playerID + Math.random();
            this.mediaElement.width = this.config.width;
            this.mediaElement.height = this.config.height;
            this.mediaElement.setAttribute('class', this.meister.config.playerClass);

            if (this.config.posterImage) {
                this.mediaElement.setAttribute('poster', this.config.posterImage);
            }

            // for doubleclick enabled behavior on iOS the playsinline attribute must be true
            if (this.meister.config.iosPlaysInline) {
                this.mediaElement.setAttribute('playsinline', true);
            }

            // this.mediaElement.controls = this.meister.config.controls;
            this.mediaElement.muted = this.meister.config.startMuted;

            this.wrapper.appendChild(this.mediaElement);

            this.meister.on('playerPlay', function () {
                // Replays are when an end event has been triggered and the user clicks on play again.
                if (_this2.shouldTriggerReplay) {
                    _this2.meister.trigger('playerReplay', {});
                    _this2.shouldTriggerReplay = false;
                    return;
                }

                if (_this2.firstPlayTriggered) return;
                _this2.firstPlayTriggered = true;

                _this2.meister.trigger('playerFirstPlay', {});
            });

            this.mediaElement.addEventListener('play', function () {
                _this2.meister.trigger('playerPlay', _this2.playerPlayEvent);
                _this2.playerPlayEvent = null;
            });

            this.mediaElement.addEventListener('pause', function () {
                _this2.meister.trigger('playerPause', _this2.playerPauseEvent);
                _this2.playerPauseEvent = null;
            });

            this.mediaElement.addEventListener('playing', function () {
                return _this2.meister.trigger('playerPlaying');
            });

            this.mediaElement.addEventListener('ended', function () {
                _this2.shouldTriggerReplay = true;
                _this2.meister.trigger('playerEnd');
            });

            this.mediaElement.addEventListener('error', function () {
                if (_this2.mediaElement.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
                    _this2.meister.error('Media not found', Meister.ErrorCodes.NO_MEDIA_FOUND);
                }

                _this2.meister.trigger('playerError', { mediaError: _this2.mediaElement.error });
            });

            this.mediaElement.addEventListener('seeked', function () {
                return _this2.meister.trigger('_playerSeek');
            });
            this.mediaElement.addEventListener('seeking', function () {
                return _this2.meister.trigger('playerSeeking');
            });
            this.mediaElement.addEventListener('timeupdate', function () {
                return _this2.meister.trigger('_playerTimeUpdate');
            });
            this.mediaElement.addEventListener('progress', function () {
                return _this2.meister.trigger('playerProgress', _this2.mediaElement);
            });
            this.mediaElement.addEventListener('loadedmetadata', function () {
                return _this2.meister.trigger('playerLoadedMetadata');
            });
            this.mediaElement.addEventListener('durationchange', function () {
                return _this2.meister.trigger('playerDurationChange');
            });
            this.mediaElement.addEventListener('volumechange', function () {
                return _this2.meister.trigger('playerVolumeChange');
            });
            this.mediaElement.addEventListener('canplay', function () {
                return _this2.meister.trigger('playerCanPlay');
            });

            this.mediaElement.addEventListener('loadedmetadata', function () {
                _this2.isLoaded = true;
                if (_this2.seekToWhenLoaded) {
                    _this2.currentTime = _this2.seekToWhenLoaded;
                    _this2.seekToWhenLoaded = null;
                }
            });

            // keyboard handling
            var kb = new _KeyboardHandler2.default(this.meister.container, this.meister.eventHandler);
            kb.onKey([_Keyboard2.default.Space, _Keyboard2.default.Pause, _Keyboard2.default.PlayPause, _Keyboard2.default.Stop], this.onSpace.bind(this));
            kb.onKey(_Keyboard2.default.NextTrack, this.nextTrack.bind(this));
            kb.onKey(_Keyboard2.default.PreviousTrack, this.previousTrack.bind(this));

            kb.onKey(_Keyboard2.default.ArrowLeft, this.seekBack.bind(this));
            kb.onKey(_Keyboard2.default.ArrowRight, this.seekForward.bind(this));
            kb.onKey(_Keyboard2.default.KeyF, this.onKeyF.bind(this));

            // Buffering event.
            this.bufferingMonitor = setInterval(this.monitorBuffering.bind(this), this.CHECK_INTERVAL);

            // Reset nudge counter.
            this.on('itemLoaded', this.onItemLoaded.bind(this));
            this.on('itemUnloaded', this.onItemUnloaded.bind(this));

            // this.on('itemTimeInfo', (timeInfo) => { this.onItemTimeInfo(timeInfo); }); // handled in the player object
            this.meister.trigger('playerCreated');
        }
    }, {
        key: 'onItemLoaded',
        value: function onItemLoaded(event) {
            if (event.item.crossorigin) {
                this.mediaElement.setAttribute('crossorigin', event.item.crossorigin);
            } else {
                this.mediaElement.removeAttribute('crossorigin');
            }

            if (this.meister.config.audioOnly || event.item.mediaType === 'audio') {
                if (event.item.backgroundImage) {
                    this.backgroundImage.style['background-image'] = 'url(' + event.item.backgroundImage + ')';
                } else {
                    this.backgroundImage.style['background-image'] = 'url(' + this.defaultImageUrl + ')';
                }
            }
        }
    }, {
        key: 'onItemUnloaded',
        value: function onItemUnloaded() {
            this.canNudge = 0;
            this.firstPlayTriggered = false;
        }
    }, {
        key: 'monitorBuffering',
        value: function monitorBuffering() {
            var currentPlayPos = this.mediaElement.currentTime;

            // Convert ms to s.
            var offset = 1 / this.CHECK_INTERVAL;

            if (!this.mediaElement.paused) {
                // Special check for special Samsung stock browser which reports currentTime as 0 for icecast streams.
                if (this.meister.browser.isSamsung && this.mediaElement.readyState === this.mediaElement.HAVE_ENOUGH_DATA && currentPlayPos === 0) {
                    this.meister.trigger('playerBufferedEnough');
                } else if (!this.buffering && currentPlayPos < this.lastPlayPos + offset) {
                    this.buffering = true;
                    this.meister.trigger('playerBuffering');
                    this.meister.trigger('showLoading', {
                        code: 'VIDEO_BUFFERING'
                    });
                } else if (this.buffering && currentPlayPos > this.lastPlayPos + offset) {
                    this.buffering = false;
                    this.meister.trigger('playerBufferedEnough');
                }
            }

            this.lastPlayPos = currentPlayPos;
        }
    }, {
        key: 'unload',
        value: function unload() {
            clearInterval(this.bufferingMonitor);
            if (this.mediaElement) {
                this.mediaElement.remove();
            }

            this.meister.trigger('playerDestroyed');
            _get(Html5Player.prototype.__proto__ || Object.getPrototypeOf(Html5Player.prototype), 'unload', this).call(this);
        }
    }, {
        key: 'play',
        value: function play(e) {
            var _this3 = this;

            this.playerPlayEvent = e; // keep reference to e in class so we can pass it to playerPlay in event stack

            // Player unloaded.
            if (!this.mediaElement) {
                return;
            }

            // Chrome 50 introduces promise on media.play()
            var playPromise = this.mediaElement.play();

            if (playPromise) {
                // Known bug in chrome 50, so we catch it and try playing again.
                // https://bugs.chromium.org/p/chromium/issues/detail?id=593273
                playPromise.catch(function (err) {
                    // An ad pauses content, no need to play again right away.
                    if (err.message.indexOf('call to pause') === -1) {
                        setTimeout(function () {
                            _this3.play();
                        }, 100);
                    }
                });
            }
        }
    }, {
        key: 'pause',
        value: function pause(e) {
            this.playerPauseEvent = e;

            if (!this.mediaElement) {
                return;
            }

            this.mediaElement.pause();
        }
    }, {
        key: 'isPauseDisabled',
        value: function isPauseDisabled() {
            return this.isLive && this.meister.config.disablePauseWithLive;
        }
    }, {
        key: 'onSpace',
        value: function onSpace(e) {
            e.preventDefault();
            if (this.isPauseDisabled()) return;
            if (this.meister.playing === true) {
                this.meister.pause();
            } else {
                this.meister.play();
            }
        }
    }, {
        key: 'nextTrack',
        value: function nextTrack(e) {
            e.preventDefault();
            this.meister.trigger('playlistNext');
        }
    }, {
        key: 'previousTrack',
        value: function previousTrack(e) {
            e.preventDefault();
            this.meister.trigger('playlistPrevious');
        }
    }, {
        key: 'seekBack',
        value: function seekBack(e) {
            e.preventDefault();
            if (this.isPauseDisabled()) return;
            this.meister.trigger('requestSeek', {
                timeOffset: -5
            });
        }
    }, {
        key: 'seekForward',
        value: function seekForward(e) {
            e.preventDefault();
            if (this.isPauseDisabled()) return;
            this.meister.trigger('requestSeek', {
                timeOffset: 5
            });
        }
    }, {
        key: 'onKeyF',
        value: function onKeyF(e) {
            e.preventDefault();
            if (this.meister.isFullscreen) {
                this.meister.cancelFullscreen();
            } else {
                this.meister.requestFullscreen();
            }
        }
    }, {
        key: 'currentSrc',
        set: function set(url) {
            if (!this.mediaElement) {
                return;
            }

            this.isLoaded = false;
            this.mediaElement.src = url;
        },
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return this.mediaElement.src;
        }
    }, {
        key: 'volume',
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return this.mediaElement.volume;
        },
        set: function set(volume) {
            if (!this.mediaElement) {
                return;
            }

            this.mediaElement.volume = volume;
        }
    }, {
        key: 'muted',
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return this.mediaElement.muted;
        },
        set: function set(muted) {
            if (!this.mediaElement) {
                return;
            }

            this.mediaElement.muted = muted;
        }
    }, {
        key: 'duration',
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return this.mediaElement.duration;
        }
    }, {
        key: 'playing',
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return !this.mediaElement.paused;
        }
    }, {
        key: 'currentTime',
        get: function get() {
            if (!this.mediaElement) {
                return null;
            }

            return this.mediaElement.currentTime;
        },
        set: function set(time) {
            if (!this.mediaElement) {
                return;
            }

            if (this.isLoaded) {
                this.mediaElement.currentTime = time;
            } else {
                this.seekToWhenLoaded = time;
            }
        }
    }], [{
        key: 'pluginName',
        get: function get() {
            return 'Html5Player';
        }
    }]);

    return Html5Player;
}(Meister.PlayerPlugin);

Meister.registerPlugin(Html5Player.pluginName, Html5Player);

exports.default = Html5Player;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);
    }

    _createClass(Keyboard, null, [{
        key: "F1",


        // function keys
        get: function get() {
            return 112;
        }
    }, {
        key: "F2",
        get: function get() {
            return 113;
        }
    }, {
        key: "F3",
        get: function get() {
            return 114;
        }
    }, {
        key: "F4",
        get: function get() {
            return 115;
        }
    }, {
        key: "F5",
        get: function get() {
            return 116;
        }
    }, {
        key: "F6",
        get: function get() {
            return 117;
        }
    }, {
        key: "F7",
        get: function get() {
            return 118;
        }
    }, {
        key: "F8",
        get: function get() {
            return 118;
        }
    }, {
        key: "F9",
        get: function get() {
            return 119;
        }
    }, {
        key: "F10",
        get: function get() {
            return 120;
        }
    }, {
        key: "F11",
        get: function get() {
            return 121;
        }
    }, {
        key: "F12",
        get: function get() {
            return 122;
        }

        // Digits

    }, {
        key: "Digit1",
        get: function get() {
            return 49;
        }
    }, {
        key: "Digit2",
        get: function get() {
            return 50;
        }
    }, {
        key: "Digit3",
        get: function get() {
            return 51;
        }
    }, {
        key: "Digit4",
        get: function get() {
            return 52;
        }
    }, {
        key: "Digit5",
        get: function get() {
            return 53;
        }
    }, {
        key: "Digit6",
        get: function get() {
            return 54;
        }
    }, {
        key: "Digit7",
        get: function get() {
            return 55;
        }
    }, {
        key: "Digit8",
        get: function get() {
            return 56;
        }
    }, {
        key: "Digit9",
        get: function get() {
            return 57;
        }
    }, {
        key: "Digit0",
        get: function get() {
            return 48;
        }

        // special chars

    }, {
        key: "Minus",
        get: function get() {
            return 189;
        }
    }, {
        key: "Equal",
        get: function get() {
            return 187;
        }
    }, {
        key: "Comma",
        get: function get() {
            return 188;
        }
    }, {
        key: "Period",
        get: function get() {
            return 190;
        }
    }, {
        key: "Slash",
        get: function get() {
            return 191;
        }
    }, {
        key: "Dash",
        get: function get() {
            return 189;
        }
    }, {
        key: "Semicolon",
        get: function get() {
            return 186;
        }
    }, {
        key: "Quote",
        get: function get() {
            return 222;
        }
    }, {
        key: "BracketLeft",
        get: function get() {
            return 219;
        }
    }, {
        key: "BracketRight",
        get: function get() {
            return 221;
        }
    }, {
        key: "Backquote",
        get: function get() {
            return 192;
        }
    }, {
        key: "Accent",
        get: function get() {
            return 192;
        }
    }, {
        key: "BackSlash",
        get: function get() {
            return 220;
        }

        // control keys

    }, {
        key: "Backspace",
        get: function get() {
            return 67;
        }
    }, {
        key: "Home",
        get: function get() {
            return 36;
        }
    }, {
        key: "End",
        get: function get() {
            return 35;
        }
    }, {
        key: "PageUp",
        get: function get() {
            return 33;
        }
    }, {
        key: "PageDown",
        get: function get() {
            return 34;
        }
    }, {
        key: "ArrowRight",
        get: function get() {
            return 39;
        }
    }, {
        key: "ArrowDown",
        get: function get() {
            return 40;
        }
    }, {
        key: "ArrowLeft",
        get: function get() {
            return 37;
        }
    }, {
        key: "ArrowUp",
        get: function get() {
            return 38;
        }
    }, {
        key: "Shift",
        get: function get() {
            return 16;
        }
    }, {
        key: "Control",
        get: function get() {
            return 17;
        }
    }, {
        key: "Alt",
        get: function get() {
            return 18;
        }
    }, {
        key: "Meta",
        get: function get() {
            return 91;
        }
    }, {
        key: "Space",
        get: function get() {
            return 32;
        }
    }, {
        key: "Escape",
        get: function get() {
            return 27;
        }
    }, {
        key: "CapsLock",
        get: function get() {
            return 20;
        }
    }, {
        key: "Tab",
        get: function get() {
            return 9;
        }
    }, {
        key: "Fn",
        get: function get() {
            return 119;
        }
    }, {
        key: "NumLock",
        get: function get() {
            return 144;
        }
    }, {
        key: "ScrollLock",
        get: function get() {
            return 145;
        }
    }, {
        key: "Enter",
        get: function get() {
            return 66;
        }
    }, {
        key: "NumpadEnter",
        get: function get() {
            return 160;
        }
    }, {
        key: "Clear",
        get: function get() {
            return 28;
        }
    }, {
        key: "Delete",
        get: function get() {
            return 112;
        }
    }, {
        key: "Insert",
        get: function get() {
            return 124;
        }
    }, {
        key: "Help",
        get: function get() {
            return 259;
        }
    }, {
        key: "Pause",
        get: function get() {
            return 121;
        }
    }, {
        key: "BrightnessDown",
        get: function get() {
            return 220;
        }
    }, {
        key: "BrightnessUp",
        get: function get() {
            return 221;
        }
    }, {
        key: "Eject",
        get: function get() {
            return 129;
        }
    }, {
        key: "Power",
        get: function get() {
            return 26;
        }
    }, {
        key: "PrintScreen",
        get: function get() {
            return 120;
        }
    }, {
        key: "Standby",
        get: function get() {
            return 224;
        }

        // Regular Chars

    }, {
        key: "WakeUp",
        get: function get() {
            return 223;
        }
    }, {
        key: "KeyQ",
        get: function get() {
            return 81;
        }
    }, {
        key: "KeyW",
        get: function get() {
            return 87;
        }
    }, {
        key: "KeyE",
        get: function get() {
            return 69;
        }
    }, {
        key: "KeyR",
        get: function get() {
            return 82;
        }
    }, {
        key: "KeyT",
        get: function get() {
            return 84;
        }
    }, {
        key: "KeyY",
        get: function get() {
            return 89;
        }
    }, {
        key: "KeyU",
        get: function get() {
            return 85;
        }
    }, {
        key: "KeyI",
        get: function get() {
            return 73;
        }
    }, {
        key: "KeyO",
        get: function get() {
            return 79;
        }
    }, {
        key: "KeyP",
        get: function get() {
            return 80;
        }
    }, {
        key: "KeyA",
        get: function get() {
            return 65;
        }
    }, {
        key: "KeyS",
        get: function get() {
            return 83;
        }
    }, {
        key: "KeyD",
        get: function get() {
            return 68;
        }
    }, {
        key: "KeyF",
        get: function get() {
            return 70;
        }
    }, {
        key: "KeyG",
        get: function get() {
            return 71;
        }
    }, {
        key: "KeyH",
        get: function get() {
            return 72;
        }
    }, {
        key: "KeyJ",
        get: function get() {
            return 74;
        }
    }, {
        key: "KeyK",
        get: function get() {
            return 75;
        }
    }, {
        key: "KeyL",
        get: function get() {
            return 76;
        }
    }, {
        key: "KeyZ",
        get: function get() {
            return 90;
        }
    }, {
        key: "KeyX",
        get: function get() {
            return 88;
        }
    }, {
        key: "KeyC",
        get: function get() {
            return 67;
        }
    }, {
        key: "KeyV",
        get: function get() {
            return 86;
        }
    }, {
        key: "KeyB",
        get: function get() {
            return 66;
        }
    }, {
        key: "KeyN",
        get: function get() {
            return 78;
        }
    }, {
        key: "KeyM",
        get: function get() {
            return 77;
        }

        // media keys

    }, {
        key: "Mute",
        get: function get() {
            return 173;
        }
    }, {
        key: "VolumeDown",
        get: function get() {
            return 174;
        }
    }, {
        key: "VolumeUp",
        get: function get() {
            return 175;
        }
    }, {
        key: "NextTrack",
        get: function get() {
            return 176;
        }
    }, {
        key: "PreviousTrack",
        get: function get() {
            return 177;
        }
    }, {
        key: "Stop",
        get: function get() {
            return 182;
        }
    }, {
        key: "PlayPause",
        get: function get() {
            return 179;
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyboardHandler = function () {
    function KeyboardHandler(container, eventHandler) {
        var _this = this;

        _classCallCheck(this, KeyboardHandler);

        this.container = container;
        this.eventHandler = eventHandler;

        this.container.addEventListener('keyup', this.handleUp.bind(this));
        this.container.addEventListener('keydown', this.handleDown.bind(this));

        this.container.setAttribute('tabindex', '0');

        this.eventHandler.on('playerFullscreen', function () {
            _this.container.focus();
        });
    }

    /**
     * Default method onKey, uses on keyUp to actually trigger, has keyDown defaulting to preventDefault
     */


    _createClass(KeyboardHandler, [{
        key: 'onKey',
        value: function onKey(key, callBack) {
            var _this2 = this;

            if (!Array.isArray(key)) {
                key = [key];
            }

            key.forEach(function (someKey) {
                _this2.onKeyUp(someKey, callBack);
                _this2.onKeyDown(someKey, function (e) {
                    e.preventDefault();
                });
            });
        }
    }, {
        key: 'onKeyUp',
        value: function onKeyUp(key, callBack) {
            this.eventHandler.on('up' + key, callBack);
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(key, callBack) {
            this.eventHandler.on('down' + key, callBack);
        }
    }, {
        key: 'handleUp',
        value: function handleUp(e) {
            this.eventHandler.trigger('up' + e.keyCode, e);
        }
    }, {
        key: 'handleDown',
        value: function handleDown(e) {
            this.eventHandler.trigger('down' + e.keyCode, e);
        }
    }]);

    return KeyboardHandler;
}();

exports.default = KeyboardHandler;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=Html5player.js.map