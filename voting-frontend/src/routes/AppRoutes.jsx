import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import CandidateList from "../pages/CandidatesList";
import AdminDashboard from "../pages/AdminDashboard";
import AddCandidate from "../pages/AddCandidates";
import CreateElection from "../pages/CreateElection";
import Result from "../pages/Result";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/Userdashboard" element={<Dashboard />} />
        
        <Route path="/election/:electionId" element={<CandidateList /> }/>

        <Route path="/AdminDashboard/" element={<AdminDashboard />}/>

        <Route path="/admin/create-election" element={<CreateElection />}/>

        <Route path="/admin/Addcandidates" element={<AddCandidate/>}/>

        <Route path="/results/:electionId" element={<Result />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;