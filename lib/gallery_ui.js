// Importation des modules nécessaires
import { getRessource } from "./photoloader.js";
import { webetu } from "./conf.js";

/**
 * Affiche une galerie de photos à partir d'une collection
 *
 * @param {string} urlCollection - L'URL de la collection de photos à afficher.
 * @returns {Promise<Array>} Une promesse qui se résout avec les liens de la collection.
 */
export async function display_gallery(urlCollection) {
    // Récupération des données de la collection à partir de l'URL fournie
    const collection = await getRessource(urlCollection);
    const links = collection.links;
    const photos = collection.photos;

    // Initialisation d'un tableau pour stocker les URLs des photos
    let url_list = [];

    // boucle chaque photo de la collection
    for (let i = 0; i < photos.length; i++) {
        // Récupération des détails de chaque photo
        const photo = (await getRessource(photos[i].links.self.href)).photo;

        // Ajout des informations de la photo au tableau des url
        url_list[i] = {
            pictureUrl: photo.url.href, // URL de la photo
            pictureId: photo.id         // ID de la photo
        };
    }

    // Construction des données pour le template Handlebars
    const templateData = {
        photos: url_list, // Liste des URLs des photos
        webetu: webetu    // URL de base pour les ressources
    };

    // Récupération du template Handlebars depuis le DOM
    const source = document.getElementById("collectionTemplate").innerHTML;

    // Compilation du template avec les données
    const template = Handlebars.compile(source);

    // Insertion du HTML généré dans l'élément avec l'ID "gallery"
    document.getElementById("gallery").innerHTML = template(templateData);

    // Retour des liens de la collection
    return links;
}
