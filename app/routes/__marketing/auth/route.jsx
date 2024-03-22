import { redirect } from "@remix-run/node";
import AuthForm from "~/components/auth/AuthForm";
import { login, signUp } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import styles from "~/styles/auth.css";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credential = Object.fromEntries(formData);

  try {
    validateCredentials(credential);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      return await login(credential);
    } else {
      return await signUp(credential);
    }
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { credential: error.message };
    }
  }
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
