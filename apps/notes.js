export class Notes extends Application {
    constructor(object, options = {}) {
        super(object, options);
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "notes",
            title: "Thank you for downloading",
            template: "modules/kctg-a5e/templates/notes.html",
            width: 700,
            height: 500,
            classes:[ "kctg"]
        });
    }

    activateListeners(html) {
        super.activateListeners(html);
        $('.clear', html).bind("click", () => {
            game.settings.set("kctg-1e", "show-warning", false);
            this.close();
        });
        $('.just-close', html).bind("click", () => {
            this.close();
        });
    }
}