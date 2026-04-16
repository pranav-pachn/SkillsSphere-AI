import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComponentDemo from "../modules/auth/components/ComponentDemo";
import ResumeAnalyzerPage from "../modules/resume-analyzer/pages/ResumeAnalyzerPage";
import Home from "./Home";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<ComponentDemo />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
