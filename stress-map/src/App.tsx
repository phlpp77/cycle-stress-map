import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from "./Map";

function App() {
  return (
    <BrowserRouter basename="/stressed">
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
