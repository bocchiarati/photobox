import { webetu } from "./conf.js";
import { getRessource, getPicture } from "./photoloader.js";

export async function displayPicture(idPicture) {
    const picture = await getPicture(idPicture);
    const url_categorie = picture.links.categorie.href;
    const url_comments = picture.links.comments.href;

    const categorie = (await getRessource(url_categorie)).categorie;
    const comments = (await getRessource(url_comments)).comments;

    // Construction des données pour le template
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

    // Compilation et insertion du template
    const source = document.getElementById("photoTemplate").innerHTML;
    const template = Handlebars.compile(source);
    const html = template(templateData);

    document.getElementById("content").innerHTML = html;
}