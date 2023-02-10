import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Map";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
