import type firebase from "firebase/compat/app";
import { auth } from "./app";

export const getUser = () => {
  return new Promise<firebase.User | undefined>((res, rej) => {
    // console.log("🚀 ~ getUser ~ auth.currentUser:", auth.currentUser);

    // return res(auth.currentUser || undefined);
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        console.log("🚀 ~ getUser ~ user:", user);

        if (!user) {
          unsubscribe();
          // Redirect to login page if not authenticated
          return res(undefined);
        }

        unsubscribe();

        return res(user);
      },
      (err) => {
        console.log("🚀 ~ getUser ~ err:", err);
        unsubscribe();
      },
      () => {
        console.log("compl");
        unsubscribe();
        return res(undefined);
      }
    );
  });
};
