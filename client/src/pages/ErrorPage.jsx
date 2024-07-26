import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "120px",
          }}
        >
          <div>
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </div>
    </div>
  );
}
