import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

import { FIRESTORE_COLLECTION } from "@src/shared/constants";
import { MSG_DTO } from "@src/shared/types";
import {
  Firestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { initFirebase } from "./firebase";

console.log("Background loaded");

/* Begin background script  */

const db = initFirebase() as Firestore;

const cardsCollection = collection(db, FIRESTORE_COLLECTION.CARD);

chrome.runtime.onMessage.addListener((message: MSG_DTO, _, sendResponse) => {
  try {
    if (message.type === "addCard") {
      const cardsDocRef = doc(cardsCollection);
      setDoc(cardsDocRef, message.data);

      const resData: MSG_DTO = { errorCode: 0, type: "addCard" };
      sendResponse(resData);
    } else if (message.type === "getAllCard") {
      getDocs(collection(db, FIRESTORE_COLLECTION.CARD)).then(
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const resData: MSG_DTO = { type: "getAllCard", data, errorCode: 0 };
          sendResponse(resData);
        }
      );
    }
  } catch (err) {
    const resData: MSG_DTO = { errorCode: 1, data: err, type: "addCard" };
    sendResponse(resData);
  }

  return true;
});
