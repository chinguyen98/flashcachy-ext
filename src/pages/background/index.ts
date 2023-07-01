import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

import { initFirebase } from "./firebase";
import { Firestore, collection, doc, setDoc } from "firebase/firestore";
import { FIRESTORE_COLLECTION } from "@src/shared/constants";

console.log("Background loaded");

/* Begin  */

const db = initFirebase() as Firestore;

const cardsCollection = collection(db, FIRESTORE_COLLECTION.CARD);

// const cardsDocRef = doc(cardsCollection);
// setDoc(cardsDocRef, { text: "test" });
