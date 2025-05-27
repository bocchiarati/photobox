// Importation des constantes `webetu` et `entrypoint` depuis le fichier de configuration
import { webetu, entrypoint } from "./conf.js";

/**
 * Charge les détails d'une photo spécifique à partir de son ID.
 *
 * @param {string} idPicture - L'ID de la photo à charger.
 * @returns {Promise<Object>} Une promesse qui se résout avec les données de la photo.
 */
async function loadPicture(idPicture) {
    // Effectue une requête fetch pour récupérer les données de la photo
    return (await fetch(entrypoint + "/photos/" + idPicture, { credentials: 'include' })).json();
}

/**
 * Récupère les détails d'une photo spécifique à partir de son ID.
 *
 * @param {string} idPicture - L'ID de la photo à récupérer.
 * @returns {Promise<Object>} Une promesse qui se résout avec les données de la photo.
 */
export async function getPicture(idPicture) {
    return await loadPicture(idPicture);
}

/**
 * Charge une ressource à partir d'une URL donnée.
 *
 * @param {string} url - L'URL de la ressource à charger.
 * @returns {Promise<Object>} Une promesse qui se résout avec les données de la ressource.
 */
async function loadRessource(url) {
    // Effectue une requête fetch pour récupérer les données de la ressource
    return (await fetch(webetu + url, { credentials: 'include' })).json();
}

/**
 * Récupère une ressource à partir d'une URL donnée.
 *
 * @param {string} url - L'URL de la ressource à récupérer.
 * @returns {Promise<Object>} Une promesse qui se résout avec les données de la ressource.
 */
export async function getRessource(url) {
    return await loadRessource(url);
}
