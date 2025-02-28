import { useEffect, useState } from "react";
import bookLogo from "./assets/books.png";
import AppRoutes from "./Routes/AppRoutes";
import Navigations from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.getItem("token");
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div>
        <Navigations onSearch={handleSearch} clearSearch={clearSearch} />
      </div>
      <AppRoutes searchQuery={searchQuery} token={token} setToken={setToken} handleLogout={handleLogout} />
    </>
  );
}

export default App;
