import { Outlet } from "@remix-run/react";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";
import marketingStyles from "~/styles/marketing.css";

export default function ExpensesLayoutPage() {
  return (
    <>
    <MainHeader />
    <Outlet />
    </>
  )
}

export function  loader({request}) {
 return getUserFromSession(request) // whatever return by loader access to all nested route sin this component
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}