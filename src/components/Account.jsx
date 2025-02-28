import React, { useEffect, useState } from "react";
import { fetchAccount } from "../API";

function Account({ handleLogout }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const getAccount = async () => {
      try {
        const data = await fetchAccount({ token });
        setAccount(data);
        console.log("Fetch Account", data);
      } catch (error) {
        console.error("Failed to fetch account", error);
      }
    };
    getAccount();
  }, []);

  if (!localStorage.getItem("token")) {
    return <div>Please log in or create an account to see your account details.</div>;
  }

  return (
    <div>
      <h2>Account Page</h2>
      {account ? (
        <div>
          <p>
            Name: {account.firstname} {account.lastname}
          </p>
          <p>Email: {account.email}</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Add more account details as needed */}
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
}

export default Account;
