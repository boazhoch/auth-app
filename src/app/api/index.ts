import { cookies } from "next/headers";
import { auth } from "../../../lib/firebase/client/app";
import { getUser } from "../../../lib/firebase/client/getUser";
export async function GET() {
  const user = await getUser();

  const token = cookies().get("token");

  auth.signInWithCustomToken(token?.value || "").catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === "auth/invalid-custom-token") {
      alert("The token you provided is not valid.");
    } else {
      console.error(error);
    }
  });

  return Response.json({ data: user });
}
