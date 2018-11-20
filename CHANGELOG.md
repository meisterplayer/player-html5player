# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.9.1"></a>
## [5.9.1](https://github.com/meisterplayer/player-html5player/compare/v5.9.0...v5.9.1) (2018-11-20)


### Bug Fixes

* **replay:** Fix issue where replay was not triggered correctly ([b4083a6](https://github.com/meisterplayer/player-html5player/commit/b4083a6))



<a name="5.9.0"></a>
# [5.9.0](https://github.com/meisterplayer/player-html5player/compare/v5.8.0...v5.9.0) (2018-10-30)


### Bug Fixes

* **events:** Fix issue where firstPlay was not triggered after new item was loaded ([cbbfed1](https://github.com/meisterplayer/player-html5player/commit/cbbfed1))
* **replay:** Fix issue where replay was triggering on the wrong moment ([8a25bc5](https://github.com/meisterplayer/player-html5player/commit/8a25bc5))


### Features

* **error:** Add HDCP error ([dcdc3d7](https://github.com/meisterplayer/player-html5player/commit/dcdc3d7))



<a name="5.8.0"></a>
# [5.8.0](https://github.com/meisterplayer/player-html5player/compare/v5.7.0...v5.8.0) (2018-06-12)


### Bug Fixes

* **events:** Reduce the number of seekCompleted events on Edge ([1acee93](https://github.com/meisterplayer/player-html5player/commit/1acee93))


### Features

* **events:** Add configurable debounce on the playerSeekComplete event ([59f9f11](https://github.com/meisterplayer/player-html5player/commit/59f9f11))



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.7.0"></a>
# [5.7.0](https://github.com/meisterplayer/player-html5player/compare/v5.6.2...v5.7.0) (2018-05-01)


### Bug Fixes

* **buffering:** Fix issue where playerBufferedEnough was sometimes not called ([3edaca0](https://github.com/meisterplayer/player-html5player/commit/3edaca0))


### Features

* **events:** Add playerSeekComplete as a replacement for seeked ([030092f](https://github.com/meisterplayer/player-html5player/commit/030092f))



<a name="5.6.2"></a>
## [5.6.2](https://github.com/meisterplayer/player-html5player/compare/v5.6.1...v5.6.2) (2018-02-26)


### Bug Fixes

* **replay:** Fix issue where unnecessary buffering was triggered ([b8fcc4a](https://github.com/meisterplayer/player-html5player/commit/b8fcc4a))



<a name="5.6.1"></a>
## [5.6.1](https://github.com/meisterplayer/player-html5player/compare/v5.6.0...v5.6.1) (2018-02-05)


### Bug Fixes

* **events:** moved setting shouldTriggerReplay switch to playerEnd event ([b2eb7f6](https://github.com/meisterplayer/player-html5player/commit/b2eb7f6))



<a name="5.6.0"></a>
# [5.6.0](https://github.com/meisterplayer/player-html5player/compare/v5.5.1...v5.6.0) (2018-02-05)


### Bug Fixes

* **playback:** DisablePauseWithLive should now work properly ([a4a3970](https://github.com/meisterplayer/player-html5player/commit/a4a3970)), closes [meisterplayer/meisterplayer#30](https://github.com/meisterplayer/meisterplayer/issues/30)


### Features

* **audio:** Use <img> tag instead of <div> for background images ([cab99b5](https://github.com/meisterplayer/player-html5player/commit/cab99b5))



<a name="5.5.1"></a>
## [5.5.1](https://github.com/meisterplayer/player-html5player/compare/v5.5.0...v5.5.1) (2017-11-07)


### Bug Fixes

* **disablePauseWithLive:** Fix issue with keyboard controls and disabled pause ([e0bbeb0](https://github.com/meisterplayer/player-html5player/commit/e0bbeb0))



<a name="5.5.0"></a>
# [5.5.0](https://github.com/meisterplayer/player-html5player/compare/v5.4.0...v5.5.0) (2017-08-28)


### Features

* **enableKeyBoardShortcuts:** Add the option to disable the keyboard shortcuts ([8babbdb](https://github.com/meisterplayer/player-html5player/commit/8babbdb))



<a name="5.4.0"></a>
# [5.4.0](https://github.com/meisterplayer/player-html5player/compare/v5.3.2...v5.4.0) (2017-06-27)


### Features

* **pluginVersion:** Add pluginVersion to class ([aa77c17](https://github.com/meisterplayer/player-html5player/commit/aa77c17))



<a name="5.3.2"></a>
## [5.3.2](https://github.com/meisterplayer/player-html5player/compare/v5.3.1...v5.3.2) (2017-06-23)


### Bug Fixes

* **html5player:** replaced append with appendChild, MSIE does not like append ([8a75357](https://github.com/meisterplayer/player-html5player/commit/8a75357))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/meisterplayer/player-html5player/compare/v5.2.0...v5.3.0) (2017-06-20)


### Bug Fixes

* **itemTimeInfo:** Remove call to super method that does not exist ([bc8ba85](https://github.com/meisterplayer/player-html5player/commit/bc8ba85))
* **load:** Fix issue where itemLoaded was triggered while not using Html5Player ([fe2a9b3](https://github.com/meisterplayer/player-html5player/commit/fe2a9b3))


### Features

* **events:** Add playerCanPlay ([796d968](https://github.com/meisterplayer/player-html5player/commit/796d968))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/meisterplayer/player-html5player/compare/v5.1.0...v5.2.0) (2017-05-29)


### Bug Fixes

* **live:** Livestreams can be paused using keyboard controls ([09cb2c9](https://github.com/meisterplayer/player-html5player/commit/09cb2c9)), closes [#30](https://github.com/meisterplayer/player-html5player/issues/30)


### Features

* **backwards-compatible:** Remove backwards compatible in order to remove errors ([b5e7506](https://github.com/meisterplayer/player-html5player/commit/b5e7506))



<a name="5.1.0"></a>
# 5.1.0 (2017-04-26)


### Features

* **config:** Allow posterImage to be set ([339f567](https://github.com/meisterplayer/player-html5player/commit/339f567))
* **events:** Add playerFirstPlay and playerReplay events ([a65ce54](https://github.com/meisterplayer/player-html5player/commit/a65ce54))
* **events:** Add playerSeeking event ([dcbddff](https://github.com/meisterplayer/player-html5player/commit/dcbddff))
