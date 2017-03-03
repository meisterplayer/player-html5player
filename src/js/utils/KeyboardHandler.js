class KeyboardHandler {

    constructor(container, eventHandler) {
        this.container = container;
        this.eventHandler = eventHandler;

        this.container.addEventListener('keyup', this.handleUp.bind(this));
        this.container.addEventListener('keydown', this.handleDown.bind(this));
    }

    /**
     * Default method onKey, uses on keyUp to actually trigger, has keyDown defaulting to preventDefault
     */
     onKey(key, callBack) {
         if (!Array.isArray(key)) {
             key = [key];
         }
         key.forEach( (someKey) => {
             this.onKeyUp(someKey, callBack);
             this.onKeyDown(someKey, (e) => {
                 e.preventDefault();
             });
         });
     }

    onKeyUp(key, callBack) {
        this.eventHandler.on('up' + key, callBack);
    }

    onKeyDown(key, callBack) {
        this.eventHandler.on('down' + key, callBack);
    }

    handleUp(e) {
        this.eventHandler.trigger('up' + e.keyCode, e);
    }

    handleDown(e) {
        this.eventHandler.trigger('down' + e.keyCode, e);
    }

}

export default KeyboardHandler;
