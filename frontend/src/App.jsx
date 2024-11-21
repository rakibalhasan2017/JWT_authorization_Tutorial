import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import Changepassword from './pages/Changepassword'
import ProtectedRoute from "./pages/Protectedroutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute />}> 
        <Route path="/changepassword" element={<Changepassword />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
