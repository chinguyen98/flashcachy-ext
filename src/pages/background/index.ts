import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

import { initFirebase } from "./firebase";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { FIRESTORE_COLLECTION } from "@src/shared/constants";
import { RES_DATA } from "@src/shared/types";

console.log("Background loaded");

/* Begin  */

const db = initFirebase() as Firestore;

const cardsCollection = collection(db, FIRESTORE_COLLECTION.CARD);

(async () => {
  const querySnapshot = await getDocs(
    collection(db, FIRESTORE_COLLECTION.CARD)
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
})();

chrome.runtime.onMessage.addListener((data, _, sendResponse) => {
  try {
    console.log({ data });
    const cardsDocRef = doc(cardsCollection);
    setDoc(cardsDocRef, data);

    const resData: RES_DATA = { errorCode: 0 };
    sendResponse(resData);
  } catch (err) {
    const resData: RES_DATA = { errorCode: 1, message: err };
    sendResponse(resData);
  }
});
