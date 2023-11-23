import { Routes, Route } from "react-router-dom";
import background from "./assets/backG.jpg";

import MLogin from "./pages/MLogin";
import MRegister from "./pages/MRegister";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import HomeA from "./admin/HomeA";
import Dashboard from "./admin/Dashboard";
import Assessment from "./admin/Assessment";
import Student from "./admin/Student";
import Practice from "./pages/Practice";
import NormalPage from "./pages/NormalPage";
import HardPage from "./pages/HardPage";
import StartClass from "./admin/StartClass";
import Lesson1 from "./admin/units/lesson1";
import L1Test1 from "./admin/activities/L1Test1";
import Lesson2 from "./admin/units/Lesson2";
import L2Test1 from "./admin/activities/L2Test1";
import Lesson3 from "./admin/units/Lesson3";
import L3Test1 from "./admin/activities/L3Test1";
import FinalExam from "./admin/units/FinalExam";
import Examination from "./admin/units/Examination";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/modified-login' element={<MLogin />} />
        <Route path='/homeA' element={<HomeA />} />
        <Route path='/register' element={<MRegister />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/practice' element={<Practice />} />
        <Route path='/lvlNormal' element={<NormalPage />} />
        <Route path='/lvlHard' element={<HardPage />} />
        <Route path='/student/:sectionID' element={<Student />} />
        <Route path='/startClass/:sectionID' element={<StartClass />} />
        <Route path='/lesson1/:sectionID' element={<Lesson1 />} />
        <Route path='/l1t1/:sectionID' element={<L1Test1 />} />
        <Route path='/lesson2/:sectionID' element={<Lesson2 />} />
        <Route path='/l2t1/:sectionID' element={<L2Test1 />} />
        <Route path='/lesson3/:sectionID' element={<Lesson3 />} />
        <Route path='/assessment' element={<Assessment />} />
        <Route path='/l3t1/:sectionID' element={<L3Test1 />} />
        <Route path='/finalExam/:sectionID' element={<FinalExam />} />
        <Route path='/examination/:studentID' element={<Examination />} />
      </Routes>
    </div>
  );
}

export default App;
