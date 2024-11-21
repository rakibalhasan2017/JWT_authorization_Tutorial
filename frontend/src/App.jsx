import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/changepassword" element={<Changepassword />} />
      </Routes>
    </>
  );
}

export default App;
