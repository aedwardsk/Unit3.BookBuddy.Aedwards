import { useState } from "react";
import bookLogo from "./assets/books.png";
import AppRoutes from "./Routes/AppRoutes";
import Navigations from "./components/Navigations";

function App() {
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        {/* will need in nav later token={token} setToken={setToken} */}
      </div>
      <AppRoutes searchQuery={searchQuery} token={token} setToken={setToken} />
    </>
  );
}

export default App;
