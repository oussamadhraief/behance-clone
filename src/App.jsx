import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import MyDesigns from "./pages/my-designs/MyDesigns";
import CreateDesign from "./pages/create-design/CreateDesign";
import { Layout } from "./layouts/Layout";
import { DesignDetail } from "./pages/view-design/DesignDetails";

function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={<Settings />} />
          <Route path="/designs/:id" element={<DesignDetail />} />
          <Route path="/my-designs" element={<MyDesigns />} />
          <Route path="/create-design" element={<CreateDesign />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
