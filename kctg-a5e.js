import {Notes} from "./apps/notes.js";

export const MODULE_ID = 'kctg-a5e';
export const SHOW_WARNING = 'show-warning';

Hooks.once('init', () => {
    game.settings.register(MODULE_ID, SHOW_WARNING, {
        name: 'Show "Thank you" note on startup',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });
});

function isKCTG5eActive() {
    let kctg5eIsActive = game.modules.has("kctg-5e") && game.modules.get("kctg-5e").active
    return kctg5eIsActive;
}

Hooks.once('ready', () => {
    if (game.settings.get(MODULE_ID, SHOW_WARNING) && game.user?.isGM && !isKCTG5eActive()) {
        new Notes().render(true);
    }
});

