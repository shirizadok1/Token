import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from '@dfinity/principal';


function Transfer() {

  const[recipientId, setId] = useState("");
  const[amount, setAmount] = useState("");
  const[isDisabled, setDisabled] = useState(false);
  const[feedback, setFeedback] = useState("");
  const[isHidden, setHidden]= useState(true);
  
  async function handleClick() {
    setHidden(true);
    setDisabled(true);
    const recipient = Principal.fromText(recipientId);// converting recipientId from a string to a Principal type for the transfer method
    const amountToTransfer = Number(amount);//converting amount from string to num for the transfer method
    const result = await token.transfer(recipient, amountToTransfer);
    setFeedback(result);// the result is a string which can be "success" or "Insufficient funds"
    setHidden(false); //once we have the result back we can set hidden to false and display the text
    setDisabled(false);
    
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer"
           onClick={handleClick}
           disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
