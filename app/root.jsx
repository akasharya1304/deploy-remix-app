import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import styles from "~/styles/shared.css";
import Error from "./components/util/Error";

function Document({title, children}) {
  return (
    <html lang="en">
      <head>
      {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
        <main>
          <Error title={error.statusText}>
            <p>{error.data?.message || 'Something went wrong'}</p>
            <p>Back to <Link to="/">safety</Link></p>
          </Error>
        </main>
      </Document>
    );
  }

  // 'ErrorBoundary'
  return (
    <Document title='An error occured!'>
        <main>
          <Error title='An error occured!'>
            <p>{error.message || 'Something went wrong'}</p>
            <p>Back to <Link to="/">safety</Link></p>
          </Error>
        </main>
      </Document>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
