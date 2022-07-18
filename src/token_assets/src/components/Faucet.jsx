import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";


function Faucet(props) {

  const[isDisabled, setDisabled] = useState(false);
  const[buttonText, setText] = useState("I want 10,000 Dcoins for free!")

  async function handleClick(event) {
    setDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await AuthClient.getIdentity();

    const authCanister = createActor(canisterId, {
      agentOptions : {
        identity,
      },
    });

    const result = await authCanister.payOut();
    setText(result);

  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DCOIN tokens here! Claim 10,000 DCOIN to {props.userPrincipal}.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
