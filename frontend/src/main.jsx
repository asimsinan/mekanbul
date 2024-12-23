import "./App.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Template from "./components/Template";
import Home from "./components/Home";
import VenueDetail from "./components/VenueDetail";
import AddComment from "./components/AddComment";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="venue/:id" element={<VenueDetail />} />
          <Route path="venue/:id/comment/new" element={<AddComment />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
