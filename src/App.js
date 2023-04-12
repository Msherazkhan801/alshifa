import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./components/Detail.js";
import SinglePatientDetail from "./components/SinglePatientDetail";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/detail" element={<Detail />} />
             <Route path="/patient-detail/:id" element={<SinglePatientDetail />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
