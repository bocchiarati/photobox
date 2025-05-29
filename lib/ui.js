// Importation des modules et constantes nécessaires
import { webetu } from "./conf.js";
import { getRessource, getPicture } from "./photoloader.js";

/**
 * Affiche les détails d'une photo spécifique en utilisant un template Handlebars.
 *
 * @param {string} idPicture - L'ID de la photo à afficher.
 */
export async function displayPicture(idPicture) {
    // Récupération des détails de la photo à partir de son ID
    const picture = await getPicture(idPicture);

    // Extraction des URLs pour la catégorie et les commentaires de la photo
    const url_categorie = picture.links.categorie.href;
    const url_comments = picture.links.comments.href;

    // Récupération des détails de la catégorie et des commentaires
    const categorie = (await getRessource(url_categorie)).categorie;
    const comments = (await getRessource(url_comments)).comments;

    // Construction des données pour le template Handlebars
    const templateData = {
        idPhoto: picture.photo.id,
        photoUrl: webetu + picture.photo.url.href,
        titre: picture.photo.titre,
        description: picture.photo.descr,
        type: picture.photo.type,
        width: picture.photo.width,
        height: picture.photo.height,
        categorie: categorie.nom,
        commentaires: comments
    };

    // Récupération du template Handlebars depuis le DOM
    const source = document.getElementById("photoTemplate").innerHTML;

    // Compilation du template avec les données
    const template = Handlebars.compile(source);
    const html = template(templateData);

    // Insertion du HTML généré dans l'élément avec l'ID "content"
    document.getElementById("la_photo").innerHTML = html;

    displayGallery();
}

function displayGallery() {
    document.getElementById("retour").addEventListener("click", () => {
        document.getElementById("gallery_container").classList.remove("hidden");
        document.getElementById("la_photo").innerHTML = "";
    });
}