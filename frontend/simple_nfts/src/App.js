import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import Profile from "./pages/Profile";
import NewArt from "./pages/NewArt";
import Self from "./pages/Self";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/self" element={<Self />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<NewArt />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
