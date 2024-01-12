import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Import necessary components
import './App.css';
import axios from 'axios';

function VoucherComponent() {
  const { voucherId } = useParams<{ voucherId: string }>();
  const [responseValue, setResponseValue] = useState<string>();
  const [responseResponded, setResponseResponded] = useState<boolean>(false);

  const BACK_URL = `https://escapade-gourmande-le-jeu-back.vercel.app/validate-voucher/${voucherId}`;

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(BACK_URL);
      console.log(`isValid > ${response.data.isValid}`);
      setResponseValue(`${response.data.isValid}`);
      setResponseResponded(true);
    } catch (error) {
      console.error('Une erreur s\'est produite : ', error);
    }
  };

  return (
    <div className="voucher-container">
      {/* <label htmlFor="voucher-id">Voucher ID :</label> */}
      <input
        type="text"
        id="voucher-id"
        value={voucherId}
        readOnly
        className="voucher-input"
        disabled={true}
      />
      <button onClick={handleButtonClick} className="voucher-button">
        Valider le coupon
      </button>
      {responseResponded && (
        <div>
          <h2 className="voucher-result">
            {responseValue === 'true' ? (
              <p className="valid-message">{voucherId} est un code coupon valide </p>
            ) : (
              <p className="invalid-message">{voucherId} n'est PAS un code coupon valide </p>
            )}
          </h2>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1 className="app-header">Validateur de coupon</h1>
      <Router>
        <Routes>
          <Route path="/:voucherId?" element={<VoucherComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
