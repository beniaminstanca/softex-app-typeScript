import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.scss";

function AuthForm() {
  const data: any = useActionData();
  const [seachParams] = useSearchParams();
  const isLogin = seachParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err: any) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin && (
          <>
            <p>
              <input
                id="fname"
                type="text"
                name="fname"
                placeholder="First Name"
                required
              />
            </p>
            <p>
              <input
                id="lname"
                type="text"
                name="lname"
                placeholder="Last Name"
                required
              />
            </p>
          </>
        )}
        <p>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </p>
        <p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </p>
        <div className={classes.actions}>
        <button> {isLogin ? " Login" : "Signup"}</button>
          <p>
          {isLogin ? "Don't have an acount? " : "Already have an acount? "}
            <Link to={`?mode=${isLogin ? "signup" : "login"}`} className={classes.switch}>
              {isLogin ? " Signup" : "Login"}
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
