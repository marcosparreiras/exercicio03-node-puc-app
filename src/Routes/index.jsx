import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import ROLES from "../utils/roles";
import AuthRoutes from "./auth.routes";
import UserRoutes from "./user.routes";
import AdminRoutes from "./admin.routes";

function Routes() {
  function SetRoutes() {
    const { user } = useAuth();
    switch (user?.role) {
      case ROLES.ADMIN:
        return <AdminRoutes />;
      case ROLES.USER:
        return <UserRoutes />;
      default:
        return <AuthRoutes />;
    }
  }

  return (
    <BrowserRouter>
      <SetRoutes />
    </BrowserRouter>
  );
}

export default Routes;
