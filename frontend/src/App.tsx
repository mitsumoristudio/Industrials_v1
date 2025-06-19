import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeMainScreen from "./screens/HomeMainScreen";
import TopNavigation from "./components/TopNavigation";
import ProjectScreen from "./screens/ProjectScreen";
import ProjectDetailScreen from "./screens/ProjectDetailScreen";
import ProjectTableScreen from "./screens/ProjectTableScreen";
import ContactTableScreen from "./screens/admin/ContactTableScreen";
import UserTableScreen from "./screens/admin/UserTableScreen";
import AddProjectScreen from "./screens/admin/AddProjectScreen";
import AddContactPage from "./screens/admin/AddContactPage";
import {AddProjectEditPage} from "./screens/admin/AddProjectEditPage";
import AddContactEditPage from "./screens/admin/AddContactEditPage";
import EditUserScreen from "./screens/admin/EditUserScreen";
import SettingsScreen from "./screens/admin/SettingsScreen";
import MyContactScreen from "./screens/admin/MyContactScreen";
import MyProjectScreen from "./screens/admin/MyProjectScreen";

import AboutUsScreen from "./screens/AboutUsScreen";
import ContactUsScreen from "./screens/ContactUsScreen"

function App() {
  return (
      <>

        <Router>
          <ToastContainer />

          <TopNavigation/>

          <Routes>
            <Route path={"/"} index={true} element={<HomeMainScreen />} />
            <Route path={"/login"} index={true} element={<LoginScreen />} />
            <Route path={"/register"} index={true} element={<RegisterScreen />} />

            <Route path={"/projects/search/:keyword"} element={<ProjectScreen />} />
            <Route path={"projects/search/keyword/page/:pageNumber"} element={<ProjectScreen />} />

            <Route path={"/projects"} element={<ProjectScreen />} />
            <Route path={"/projects/:id"} element={<ProjectDetailScreen />} />
            <Route path={"/profile"} element={<SettingsScreen />} />
            <Route path={"/:id/myContacts"} element={<MyContactScreen />} />

            <Route path={"/:id/myProjects"} index={true} element={<MyProjectScreen />} />
            <Route path={"/about"} element={<AboutUsScreen />} />
            <Route path={"/contactUs"} element={<ContactUsScreen />} />

            <Route path={"/:id/myProjects"} element={<MyProjectScreen />} />

            <Route path={"/admin/projecttable"} element={<ProjectTableScreen />} />
            <Route path={"/admin/contacttable"} element={<ContactTableScreen />} />
            <Route path={"/admin/usertable"} element={<UserTableScreen />} />
            <Route path={"/admin/addProject"} element={<AddProjectScreen/>} />
            <Route path={"/admin/addContact"} element={<AddContactPage />} />
            <Route path={"/admin/projects/edit/:id"} element={<AddProjectEditPage />} />
            <Route path={"/admin/contacts/edit/:id"} element={<AddContactEditPage />} />
            <Route path={"/admin/users/edit/:id"} element={<EditUserScreen />} />

          </Routes>

        </Router>

      </>
  );
}

export default App;
