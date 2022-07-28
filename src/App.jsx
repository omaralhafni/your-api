import { useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context";
import { Auth, Documentation, Layout, NotFound } from "./Pages";
import { ToastIfy } from "./components";
import { checkTokenExpiration, Authorized, Unauthorized } from "./utils";

const Login = lazy(() => import('./Pages/Auth/Login'));
const Register = lazy(() => import('./Pages/Auth/Register'));
const Home = lazy(() => import('./Pages/Home'));
const Profile = lazy(() => import('./Pages/Profile'));
const Product = lazy(() => import('./Pages/Product'));

function App() {
  const [userData, setUserData] = useState(checkTokenExpiration());

  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Routes>
          <Route path="/auth" element={<Unauthorized children={<Auth />} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<Authorized children={<Layout />} />}>
            <Route path="" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Product/:productId" element={<Product />} />
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