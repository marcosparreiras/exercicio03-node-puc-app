import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default UserRoutes;
