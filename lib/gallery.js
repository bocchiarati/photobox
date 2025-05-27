import { getRessource } from "./photoloader.js";

// stocker les photos chargées
let galleryData = [];

// Taille d'une page random
const pageSize = 10;

let currentGallery = [];

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
}
