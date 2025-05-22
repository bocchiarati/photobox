import { displayPicture } from "../lib/ui.js"


displayPicture(window.location.hash ? window.location.hash.substr(1): 105);
