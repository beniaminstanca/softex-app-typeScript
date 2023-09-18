import { json, redirect } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }: { request: Request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 500 });
  }
  const data = await request.formData();

  let authData;

  if (mode === "signup") {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
      fname: data.get("fname"),
      lname: data.get("lname"),
    };
  } else {
    authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  }

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }
 
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/offers");
}
