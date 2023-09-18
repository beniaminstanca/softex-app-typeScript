import {useLoaderData, useSubmit } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";

function RootPage() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, 1 * 60 * 16 * 1000);
  }, [token, submit]);

  return (
    <Layout />
  );
}

export default RootPage;
