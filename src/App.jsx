import { useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context";
import Layout from "./Pages/Guest/Layout";
import { ToastIfy } from "./components";
import { checkTokenExpiration, Authorized, Unauthorized } from "./utils";

const Home = lazy(() => import("./Pages/Guest/Home"));
const Auth = lazy(() => import("./Pages/Guest/Auth"));
const Login = lazy(() => import("./Pages/Guest/Auth/Login"));
const Register = lazy(() => import("./Pages/Guest/Auth/Register"));
const PublicUserPage = lazy(() => import("./Pages/Guest/PublicUserPage"));
const Documentation = lazy(() => import("./Pages/Guest/Documentation"));
const HomeDash = lazy(() => import("./Pages/User/HomeDash"));
const Profile = lazy(() => import("./Pages/User/Profile"));
const Product = lazy(() => import("./Pages/User/Product"));
const NotFound = lazy(() => import("./Pages/Error/NotFound"));

function App() {
  const [userData, setUserData] = useState(checkTokenExpiration());

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          {/* Access it if you are logged in */}
          <Route path="/auth" element={<Unauthorized children={<Auth />} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* Access it if you do not have a login */}
          <Route
            path="/dashboard"
            element={<Authorized children={<Layout withNav withContainer />} />}
          >
            <Route index element={<HomeDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Product/:productId" element={<Product />} />
          </Route>

          {/* You do not need permission to access it */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/public/:userName" element={<PublicUserPage />} />
            <Route path="/public/:userName/:productId" element={<Product />} />
            <Route path="doc" element={<Documentation />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>

      <ToastIfy />
    </>
  );
}

export default App;
