import { useState } from "react";
import bookLogo from "./assets/books.png";
import AppRoutes from "./Routes/AppRoutes";
import Navigations from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <div>
        <Navigations />
        {/* will need in nav later token={token} setToken={setToken} */}
      </div>
      <AppRoutes />
    </>
  );
}

export default App;
