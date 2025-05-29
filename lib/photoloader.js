// Importation des constantes `webetu` et `entrypoint` depuis le fichier de configuration
import { webetu } from "./conf.js";

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
    try {
        return await loadRessource(url);
    } catch (err) {
        console.error("Erreur lors du chargement de la ressource :", err);
    }
}
