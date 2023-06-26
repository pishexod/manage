import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/login";
import RegistrPage from "./pages/registration";
import StatisticPage from "./pages/StatisticsPage";
import TrainingSchedule from "./pages/TrainingSchedule";
import PhysicalPage from "./pages/PhysicalPage";
import ManageSoldiersPage from "./pages/ManageSoldiersPage";
import './css/style.css'
function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/registration" element={<RegistrPage/>}/>
          <Route path="/statistics" element={<StatisticPage/>}/>
          <Route path="/schedule-training" element={<TrainingSchedule/>}/>
          <Route path="/phys-preparation" element={<PhysicalPage/>}/>
          <Route path="/soldiers" element={<ManageSoldiersPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;