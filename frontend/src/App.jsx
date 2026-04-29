import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import Courses from "./pages/Courses";

import CourseDetailPageHome from "./pages/CourseDetailPageHome";
import CourseDetailPage from "./pages/CourseDetailPage";
import MyCoursePage from "./pages/MyCoursePage";
import VerifyPaymentPage from "./pages/VerifyPaymentPage";


const ScrollToTopOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top:0,
      left:0,
      behavior:"auto"
    });
  }, [location]);

  return null;
};



const ScrollTopButton = ({
  threshold=200,
  showOnMount=false
}) => {

  const [visible,setVisible] =
    useState(!!showOnMount);

  useEffect(()=>{

    const onScroll=()=>{
      setVisible(
        window.scrollY > threshold
      );
    };

    onScroll();

    window.addEventListener(
      "scroll",
      onScroll,
      { passive:true }
    );

    return ()=>window.removeEventListener(
      "scroll",
      onScroll
    );

  },[threshold]);


  if(!visible) return null;


  return (
    <button
      onClick={()=>
        window.scrollTo({
          top:0,
          left:0,
          behavior:"smooth"
        })
      }

      className="
      fixed right-6 bottom-6
      z-50 p-2 rounded-full
      backdrop-blur-sm
      border border-white/20
      shadow-lg
      cursor-pointer
      transition-transform
      "
    >
      <ArrowUp className="w-6 h-6 text-sky-600 drop-shadow-sm"/>
    </button>
  );
};



const App = () => {
  return (
    <>
      <ScrollToTopOnRouteChange />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/faculty"
          element={<Faculty />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
        path="/mycourses"
        element={<MyCoursePage />}
        />

        <Route
          path="/course/:id"
          element={<CourseDetailPageHome />}
        />

        <Route
          path="/courses/:id"
          element={<CourseDetailPage />}
        />

        <Route
          path="/booking/success"
          element={<VerifyPaymentPage />} 
        />

        <Route
          path="/booking/cancel"
          element={<VerifyPaymentPage />} 
        />

      </Routes>

      <ScrollTopButton threshold={250}/>
    </>
  );
};

export default App;