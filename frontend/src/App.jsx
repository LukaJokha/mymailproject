import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Category } from "./pages/EmailList";
import { Mail } from "./pages/Mail";
import { Compose } from "./pages/ComposeEmailForm";
import { Login } from "./pages/LoginForm";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { AuthContextProvider, AuthContext } from "./AuthContext";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { user, initialLoading } = useContext(AuthContext);

  if (initialLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const RedirectIfLoggedIn = () => {
  const { user, initialLoading } = useContext(AuthContext);

  if (initialLoading) return <div>Loading...</div>;

  return user ? <Navigate to="/c/inbox" /> : <Outlet />;
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route element={<RedirectIfLoggedIn />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="c/:emailCategory" element={<Category />} />
          <Route path="c/:emailCategory/:emailId" element={<Mail />} />
          <Route path="compose" element={<Compose />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
