import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Detail from "./components/Detail.js";
import SinglePatientDetail from "./components/SinglePatientDetail";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Dashboard/dashboard";
import CustomizedTables from "./components/table";
import EditPatient from "./components/EditPatient/EditPatient";
function App() {
  return (
    <>
      <div className="App">
      <ToastContainer
        position="top-right" 
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>
        <Router>
          <Routes>
             <Route path="/" element={<Home />} />
             {/* <Route path="/detail" element={<Detail />} /> */}
             <Route path="/detail" element={<Dashboard />} />
             <Route path="/patient-detail/:id" element={<SinglePatientDetail />} />
             <Route path="/patients" element={<Detail variant={true} />} />
             <Route path="/patient-edit/:id" element={<EditPatient />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
