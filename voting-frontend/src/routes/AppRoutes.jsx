import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CandidateList from "../pages/CandidatesList";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/election/:electionId" element={<CandidateList /> }/>


      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;