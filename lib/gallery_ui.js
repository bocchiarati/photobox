import {getRessource} from "./photoloader.js";
import {webetu} from "./conf.js";

export async function display_gallery(urlCollection) {
    const collection = await getRessource(urlCollection);
    const links = collection.links;
    const photos = collection.photos;


    let url_list = [];

    for (let i = 0; i < photos.length; i++) {
        const photo = (await getRessource(photos[i].links.self.href)).photo;

        url_list[i] = {
            pictureUrl: photo.url.href,
            pictureId: photo.id
        }
    }
    const templateData = {
        photos : url_list,
        webetu: webetu
    }

    const source = document.getElementById("collectionTemplate").innerHTML;
    const template = Handlebars.compile(source);
    document.getElementById("gallery").innerHTML = template(templateData);
    return links;
}