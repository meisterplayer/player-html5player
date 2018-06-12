/**
 * Create a debouncing function that debounces functions for a specified amount.
 * @param {Number} amount
 * @returns {Function}
 */
const createDebounce = (amount) => {
    let timeoutId = null;

    /**
     * Calls the passed function only when this function is not called again
     * within a predetermined amount of time.
     * @param {Function} cb
     */
    const debounce = (cb) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            timeoutId = null;
            cb();
        }, amount);
    };

    return debounce;
};

export default createDebounce;
