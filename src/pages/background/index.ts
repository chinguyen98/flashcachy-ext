import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

import { FIRESTORE_COLLECTION } from "@src/shared/constants";
import { MSG_DTO } from "@src/shared/types";
import { Firestore, collection, doc, setDoc } from "firebase/firestore";
import { initFirebase } from "./firebase";

console.log("Background loaded");

/* Begin  */

const db = initFirebase() as Firestore;

const cardsCollection = collection(db, FIRESTORE_COLLECTION.CARD);

// (async () => {
//   const querySnapshot = await getDocs(
//     collection(db, FIRESTORE_COLLECTION.CARD)
//   );
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// })();

chrome.runtime.onMessage.addListener((message: MSG_DTO, _, sendResponse) => {
  try {
    if (message.type === "addCard") {
      const cardsDocRef = doc(cardsCollection);
      setDoc(cardsDocRef, message.data);

      const resData: MSG_DTO = { errorCode: 0, type: "addCard" };
      sendResponse(resData);
    }
  } catch (err) {
    const resData: MSG_DTO = { errorCode: 1, data: err, type: "addCard" };
    sendResponse(resData);
  }
});
