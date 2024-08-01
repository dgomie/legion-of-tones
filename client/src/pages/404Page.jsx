import { useRouteError } from "react-router-dom";
import ghost from "../images/ghost.png";

export default function PageNotFound() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 75,
          }}
        >
          <div>
            <h1 style={{ textAlign: "center"}}>OoOooOoOOps!</h1>
            <img src={ghost} width="100%" alt="" />
            <p style={{ textAlign: "center"}}>Sorry, that page was not found.</p>
          </div>
        </div>
    </div>
  );
}