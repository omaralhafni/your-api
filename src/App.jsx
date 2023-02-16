import { useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context";
import { Auth, Documentation, Layout, NotFound, PublicUserPage } from "./Pages";
import { ToastIfy } from "./components";
import { checkTokenExpiration, Authorized, Unauthorized } from "./utils";

const Home = lazy(() => import("./Pages/Guest/Home"));
const Login = lazy(() => import("./Pages/Guest/Auth/Login"));
const Register = lazy(() => import("./Pages/Guest/Auth/Register"));
const HomeDash = lazy(() => import("./Pages/User/HomeDash"));
const Profile = lazy(() => import("./Pages/User/Profile"));
const Product = lazy(() => import("./Pages/User/Product"));

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
            element={<Authorized children={<Layout />} />}
          >
            <Route index element={<HomeDash />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Product/:productId" element={<Product />} />
          </Route>

          {/* You do not need permission to access it */}
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/public/:userName" element={<PublicUserPage />} />
            <Route path="/public/:userName/:productId" element={<Product />} />
          </Route>
          <Route path="/doc" element={<Documentation />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>

      <ToastIfy />
    </>
  );
}

export default App;
