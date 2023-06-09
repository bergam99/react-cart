import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap"; //style
import { Homme } from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import About from "./pages/About/About";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Navbar } from "./components/Navbar/Navbar";
function App() {
  return (
    <>
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Homme />} />
            <Route path="store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
