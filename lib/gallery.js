import {display_gallery} from "./gallery_ui.js";
import {displayPicture} from "./ui.js";


/**
 * Charge la galerie de photos et initialise les écouteurs d'événements.
 *
 * @returns {void}
 */

export function load() {
    document.getElementById("load").addEventListener("click", async () => {
        try {
            // Affiche la galerie de photos et récupère les liens de navigation
            const links = await display_gallery("/www/canals5/phox/api/photos");
            updateNavigationButtons(links);
            displayPictures()
        } // Charge les EventListener pour afficher les détails des images lors d'un clique sur l'une d'elles
        catch (err) {
            console.error("Erreur lors du chargement de la galerie :", err);
        }
    });
}


/**
 * Met à jour les boutons de navigation avec les nouveaux liens.
 *
 * @param {Object} links - Les liens de navigation pour les boutons.
 * @param {string} [links.prev.href] - Lien vers la page précédente.
 * @param {string} [links.next.href] - Lien vers la page suivante.
 * @param {string} [links.first.href] - Lien vers la première page.
 * @param {string} [links.last.href] - Lien vers la dernière page.
 * @returns {void}
 */

function updateNavigationButtons(links) {
    console.log(links);

    // Crée un mappage des boutons avec leurs liens
    const buttonMapping = {
        prev: links.prev?.href,
        next: links.next?.href,
        first: links.first?.href,
        last: links.last?.href
    };

    // Parcourt chaque bouton et met à jour son écouteur d'événement
    for (const [buttonId, href] of Object.entries(buttonMapping)) {
        const button = document.getElementById(buttonId);

        // on clone le bouton pour éviter d'ajouter plusieurs fois les mêmes écouteurs d'événements
        button.replaceWith(button.cloneNode(true));
        const newButton = document.getElementById(buttonId);

        // Si un lien est présent, ajoute un écouteur d'événement pour le clic
        if (href) {
            newButton.addEventListener("click", async () => {
                const newLinks = await display_gallery(href);
                updateNavigationButtons(newLinks);
                displayPictures();
            });
        }
    }
}


/**
 * Affiche les images et initialise les écouteurs d'événements
 * pour les clics sur les images.
 *
 * @returns {void}
 */

function displayPictures() {
    // écouteur d'événement pour chaque image afin d'afficher ses détails au clic
    document.querySelectorAll(".displayPicture").forEach(element => {
        element.addEventListener("click", async () => {
            const id = element.id;
            await displayPicture(id);
            // Cache la galerie lorsque l'on affiche les détails d'une image
            document.getElementById("gallery_container").classList.add("hidden");
        });
    });

    // écouteur d'événement pour le bouton de retour afin de revenir à la galerie
    document.getElementById("retour").addEventListener("click", () => {$
        document.getElementById("gallery_container").classList.remove("hidden");
        document.getElementById("la_photo").innerHTML = "";
    })
}

