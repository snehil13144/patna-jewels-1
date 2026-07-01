import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1C0F13",
            border: "1px solid rgba(212, 175, 55, 0.35)",
            color: "#FDFBF7",
            fontFamily: "'Outfit', sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
