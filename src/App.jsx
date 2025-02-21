import { useState } from "react";
import bookLogo from "./assets/books.png";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>
        <img id='logo-image' src={bookLogo} />
        Library App
      </h1>
      <AppRoutes />
    </>
  );
}

export default App;
