import { displayPicture } from "../lib/ui.js"
import { load } from "../lib/gallery.js";
import { display_gallery } from "../lib/gallery_ui.js";

displayPicture(window.location.hash ? window.location.hash.substr(1): 105);

document.addEventListener("DOMContentLoaded", () => {
    const loadButton = document.getElementById("load");

    loadButton.addEventListener("click", async () => {
        try {
            await load();
            await display_gallery("/www/canals5/phox/api/photos");
        } catch (err) {
            console.error("Erreur lors du chargement de la galerie :", err);
        }
    });
});
