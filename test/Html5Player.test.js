import '@meisterplayer/meister-mock';
import Html5Player from '../src/js/Html5Player';

const PLUGIN_NAME = 'Html5Player';

describe('Html5Player class', () => {
    test(`pluginName should be ${PLUGIN_NAME}`, () => {
        expect(Html5Player.pluginName).toBe(PLUGIN_NAME);
    });

    test('pluginVersion should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(Html5Player.pluginVersion).toMatch(/\d+\.\d+\.\d+/);
    });
});
