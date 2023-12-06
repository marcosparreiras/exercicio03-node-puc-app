import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
import Create from "../pages/Create";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default AdminRoutes;
