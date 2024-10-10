import {Notes} from "./apps/notes.js";

export const MODULE_ID = 'kctg-a5e';

// Register the 'show-warning' setting
Hooks.once('init', () => {
    if(isKCTG5eActive()){
        return;
    }

    game.settings.register(MODULE_ID, 'show-warning', {
        name: 'Show "Thank you" note on startup',
        scope: 'world',
        config: true,
        default: true,
        type: Boolean
    });
});

// Define the 'setting' function
function setting(key) {
    return game.settings.get(MODULE_ID, key);
}

function isKCTG5eActive() {
    let kctg5eIsActive = game.modules.has("kctg-5e") && game.modules.get("kctg-5e").active
    return kctg5eIsActive;
}

// Ensure the 'setting' function is defined and available in scope
Hooks.once('ready', () => {
    if (setting("show-warning") && game.user?.isGM && !isKCTG5eActive()) {
        new Notes().render(true);
    }
});

