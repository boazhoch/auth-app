"use client";

import { useEffect, useState } from "react";

import { auth as authUi } from "firebaseui";
// imports the firebaseui styles using the CDN
import "firebaseui/dist/firebaseui.css";
import "../../../../lib/firebase/client/app";
import type firebase from "firebase/compat/app";

import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../../../lib/firebase/client/app";
import { getUser } from "../../../../lib/firebase/client/getUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ui = new authUi.AuthUI(auth);

export default function Login() {
  const [user, setUser] = useState<firebase.User | undefined>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
      setLoaded(true);
    })();
  });

  useEffect(() => {
    if (!user && loaded) {
      ui.start("#firebaseui-auth-container", {
        signInFlow: "popup",

        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            if (authResult) {
              (async () => {
                if (authResult?.user) {
                  const token = await authResult.user.getIdToken();

                  window.location.href = `${window.location.origin}/token?idToken=${token}`;
                }
              })();
            }

            return false;
          },
        },
        signInOptions: [
          GoogleAuthProvider.PROVIDER_ID,
          EmailAuthProvider.PROVIDER_ID,
        ],
      });
    }
  }, [user, loaded]);

  return (
    <div className="h-screen p-4 grid place-items-center">
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>{user?.displayName || "Providers"}</CardTitle>
          <CardDescription>
            {user?.email || "Choose login method"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!user && loaded ? (
            <div id="firebaseui-auth-container"></div>
          ) : (
            <section className="grid place-items-center gap-y-2">
              <Avatar size="lg">
                <AvatarImage
                  src={user?.photoURL ?? undefined}
                  alt={"Profile photo"}
                />
                <AvatarFallback>{user?.email}</AvatarFallback>
              </Avatar>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Logging in
              </h4>
            </section>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
