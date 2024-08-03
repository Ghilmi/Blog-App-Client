import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "../pages/Root/Root";
import ErrorPage from "../pages/errore/ErrorPage";
import Home from "../pages/Home/Home";
import Posts from "../pages/Posts/Posts";
import Login from "../pages/Login/Login";
import Details from "../pages/Details/Details";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Create from "../pages/create/Create";
import Dashboard from "../pages/dashborde/Dashboard";
import HomeDashboard from "../pages/HomeDashboard/HomeDashboard";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import PostsDashboard from "../pages/PostsDashboard/PostsDashboard";
import CategoriesDashboard from "../pages/CategoriesDashboard/CategoriesDashboard";
import CommentsDashboard from "../pages/CommentsDashboard/CommentsDashboard";
import VerfifyctionEmail from "../pages/VerfifyctionEmail/VerfifyctionEmail";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Category from "../components/category/Category";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post/details/:id" element={<Details />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/create" element={<Create />} />
      <Route path="admin-dashbord" element={<Dashboard />}>
        <Route index element={<HomeDashboard />} />
        <Route path="users" element={<UserDashboard />} />
        <Route path="posts" element={<PostsDashboard />} />
        <Route path="categories" element={<CategoriesDashboard />} />
        <Route path="comments" element={<CommentsDashboard />} />
      </Route>
      <Route
        path="user/:userId/verify/:token/"
        element={<VerfifyctionEmail />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:userId/:token"
        element={<ResetPassword />}
      />
      <Route path="category/:categoryName" element={<Category />} />
    </Route>
  )
);
