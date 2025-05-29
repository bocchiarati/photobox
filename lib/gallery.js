import { getRessource } from "./photoloader.js";

let currentGallery = [];
import {display_gallery} from "./gallery_ui.js";
import {displayPicture} from "./ui.js";

/**
 * Fonction load() :
 * - Charge les données de la galerie depuis une URL (par ex. "/photos")
 * - Stocke localement les données
 */
export async function load() {
    try {
        const data = await getRessource("/www/canals5/phox/api/photos");

        // Vérifie que c'est bien un tableau
        const galleryData = Array.isArray(data) ? data : data.photos;
        console.log(galleryData)
        currentGallery = galleryData;
        return galleryData;
    } catch (err) {
        console.error("Erreur lors du chargement de la galerie :", err);
        throw err;
    }
export function load() {
    document.getElementById("load").addEventListener("click", async () => {
        const links = await display_gallery("/www/canals5/phox/api/photos");
        updateNavigationButtons(links);
        displayPictures() // Charge les EventListener pour afficher les détails des images lors d'un clique sur l'une d'elles
    });
}

function updateNavigationButtons(links) {
    console.log(links);

    const buttonMapping = {
        prev: links.prev?.href,
        next: links.next?.href,
        first: links.first?.href,
        last: links.last?.href
    };

    for (const [buttonId, href] of Object.entries(buttonMapping)) {
        const button = document.getElementById(buttonId);

        // Pour éviter d'ajouter plusieurs fois les mêmes listeners
        button.replaceWith(button.cloneNode(true));
        const newButton = document.getElementById(buttonId);

        if (href) {
            newButton.addEventListener("click", async () => {
                const newLinks = await display_gallery(href);
                updateNavigationButtons(newLinks);
                displayPictures();
            });
        }
    }
}

function displayPictures() {
    document.querySelectorAll(".displayPicture").forEach(element => {
        element.addEventListener("click", async () => {
            const id = element.id;
            await displayPicture(id);
            document.getElementById("gallery_container").classList.add("hidden");
        });
    });

    document.getElementById("retour").addEventListener("click", () => {$
        document.getElementById("gallery_container").classList.remove("hidden");
        document.getElementById("la_photo").innerHTML = "";
    })
}

