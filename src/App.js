import "./App.css";
import { Courses } from "./pages/Course";
import Modal from "react-modal";
import React, { Component }  from 'react';

function App() {
  return <Courses />;
}

Modal.setAppElement("#root");
export default App;
