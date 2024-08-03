import { useNavigate, useRouteError } from "react-router-dom";
import "./ErrorPage.css";
import { Button } from "@mui/material";
export default function ErrorPage() {
  const navigateTo = useNavigate();
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Button
        variant={"outlined"}
        color={"success"}
        onClick={() => navigateTo("/")}>
        Go Back To Home
      </Button>
    </div>
  );
}
