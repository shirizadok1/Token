import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => { 

  const authClient = await AuthClient.create();

  if(await authClient.isAuthenticated()) {
    handleAuthe(authClient)
  } else {
      await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize", //this url takes us to the difinty authatication and we dont need to build the frontend
      onSuccess: () => {
      handleAuthe(authClient)
    }
  });
}
}

async function handleAuthe(authClient){
  const identity = await authClient.getIdentity();
  const userPrincipal = identity._principal.toString();
  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById("root"));
}

init();


