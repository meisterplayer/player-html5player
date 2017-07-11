HMTL5 Player plugin for Meister
=========

This plugin allows playback using the HTML5 player. This is only a player plugin so it cannot play media on it's own, it needs a media plugin to play. For example the plugin [BaseMedia](https://github.com/meisterplayer/media-basemedia) 

Getting started
---------

Load the plugin by adding the ```Html5Player``` configuration object to the Meister initialisation options.

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {}
});

// Continue Meister configuration
Meister.setItem({ ... });
Meister.load();
```

Config options
----------

The following options can be set in the Html5Player: {} config.

### checkInterval *[Number]* (default: 200) ###

The interval checks (in ms) if the player is buffering. The player decides if it's buffering if the player is not paused and the currentTime hasn't moved compared to the last position. Higher numbers result in a longer time before the player decides whether or not the player is buffering.

Example:


``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        checkInterval: 300,
    }
});
```



### audioOnly *[Boolean]* (default: false) ###

Set the player in audio only mode. This results in using only the ```<audio>``` tag for playback instead of using the ```<video>``` tag. If you want this option only to set per item you can use the [mediaType]() property on ```setItem();```

Example:

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        audioOnly: true,
    }
});
```

### defaultAudioImage *[String]* (default: '') ###

Sets the image for audioOnly streams. This way you can create a visual indicating the stream is audio only.

Example: 

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        audioOnly: true,
        defaultAudioImage: 'https://example.com/images/audio.png',
    }
});
```

### iosPlaysInline *[Boolean]* (default: false) ###

Adds the attribute playsinline to the ```<video>``` or ```<audio>``` element. This way you can play the video inline on iOS devices. 

Example: 

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        iosPlaysInline: true
    }
});
```

### startMuted *[Boolean]* (default: false) ###

Options to start the player in muted mode.

Example: 

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        startMuted: true
    }
});
```

### posterImage *[String]* (default: undefined) ###

A URL indicating a poster frame to show until the user plays or seeks. If this attribute isn't specified, nothing is displayed until the first frame is available; then the first frame is shown as the poster frame.

Example:

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {
        posterImage: 'http://example.com/poster.png'
    }
});
```

Item options
--------

The following options are available for per item configuration.

### mediaType *[String]* (default: undefined) ###

The same as the config option ```audioOnly``` only this can be set per item.

Example: 

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {}
});

meisterPlayer.setItem({
    src: 'INSERT_SRC_HERE',
    mediaType: 'audio',
    type: 'mp4'
});
```

### crossorigin *[String]* (default: undefined) ###

Sets the crossorigin attribute on the ```<video>``` or ```<audio>``` element. For more information on this attribute and what properties can be set, you can visit the [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

Example: 

``` JavaScript
var meisterPlayer = new Meister('#player', {
    Html5Player: {}
});

meisterPlayer.setItem({
    src: 'INSERT_SRC_HERE',
    crossorigin: 'anonymous',
    type: 'mp4'
});
```

