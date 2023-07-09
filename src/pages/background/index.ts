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
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { initFirebase } from "./firebase";

console.log("Background loaded");

/* Begin background script  */

const db = initFirebase() as Firestore;

const cardsCollection = collection(db, FIRESTORE_COLLECTION.CARD);

chrome.runtime.onMessage.addListener((message: MSG_DTO, _, sendResponse) => {
  console.log({ message });
  try {
    if (message.type === "addCard") {
      const cardsDocRef = doc(cardsCollection);
      setDoc(cardsDocRef, message.data);

      const resData: MSG_DTO = { errorCode: 0, type: "addCard" };
      sendResponse(resData);
    } else if (message.type === "editCard") {
      const cardDocRef = doc(db, FIRESTORE_COLLECTION.CARD, message.data?.id);
      updateDoc(cardDocRef, message.data).then(() => {
        const resData: MSG_DTO = { errorCode: 0, type: "editCard" };
        sendResponse(resData);
      });
    } else if (message.type === "getAllCard") {
      const q = query(cardsCollection, orderBy("created_at", "desc"));
      getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const resData: MSG_DTO = { type: "getAllCard", data, errorCode: 0 };
        sendResponse(resData);
      });
    } else if (message.type === "findCard") {
      const q = query(
        cardsCollection,
        where("searchs", "array-contains-any", [message.data]),
        orderBy("created_at", "desc")
      );
      getDocs(q).then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const resData: MSG_DTO = { type: "findCard", data, errorCode: 0 };
        sendResponse(resData);
      });
    }
  } catch (err) {
    console.log({ err });
    const resData: MSG_DTO = { errorCode: 1, data: err, type: "addCard" };
    sendResponse(resData);
  }

  return true;
});
