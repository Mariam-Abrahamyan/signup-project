import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./Components/Layout/AuthLayout";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ProfileLayout from "./Components/Layout/ProfileLayout";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/settings/Settings";
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";

export const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<AuthLayout />}>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path="" element={<Profile />}></Route>
          <Route path="/profile/settings" element={<Settings />}></Route>
          <Route path="/profile/search" element={<Search />}></Route>
          <Route path="/profile/account/:id" element={<UserProfile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
