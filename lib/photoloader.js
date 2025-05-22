import { webetu, entrypoint } from "./conf.js";

async function loadPicture(idPicture)  {
    return (await fetch(entrypoint + "/photos/" + idPicture,{ credentials: 'include'})).json();
}

export async function getPicture(idPicture){
    return await loadPicture(idPicture)
}

async function loadRessource(url){
    return (await fetch(webetu + url, { credentials: 'include'})).json();
}

export async function getRessource(url){
    return await loadRessource(url);
}