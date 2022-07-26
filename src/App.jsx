import { useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastIfy } from "./components";
import { UserContext } from "./context";
import { Auth, Documentation, Layout, Login, NotFound, Profile, Register, Product } from "./Pages";
import { checkTokenExpiration, Authorized, Unauthorized } from './utils';

const Home = lazy(() => import('./Pages/Home'));

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