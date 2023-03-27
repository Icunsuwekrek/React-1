import React, { Component } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./App.css";
import Login from "./Pages/login";
// import Dashboard from "./Pages/Dashboard";
import Member from "./Pages/Member";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
// import Borrow from "./pages/Borrow";
// import History from "./pages/History";
// import Register from "./pages/Register";
// import Admin from "./pages/Admin";
// import AddBook from "./pages/Book/AddBook";
// import EditBook from "./pages/Book/EditBook";
import AddMember from "./Pages/Member/AddMember";

// class App extends Component {
//   render(){
//     return(
//       <div className="App container">
//       <div>
//         <Main/>
//       </div>
//       </div>
//     );
//   }
// }

function App() {
  const location = useLocation();

  return (
    <>
      <div className="App">
        {location.pathname !== "/Login" &&
          location.pathname !== "/login" &&
          location.pathname !== "*" && <Navbar />}
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Member" element={<Member />} />
          <Route path="Gallery" element={<Gallery />} />
          <Route path="Contact" element={<Contact/>}/>
          <Route path="/" element={<Home/>}/>
          {/* <Route path="Borrow" element={<Borrow />} /> */}
          {/* <Route path="History" element={<History />} /> */}
          {/* <Route path="Register" element={<Register />} /> */}
          {/* <Route path="Admin" element={<Admin />} />
          <Route path="Book/AddBook" element={<AddBook />} />
          <Route path="Book/EditBook" element={<EditBook />} /> */}
          <Route path="Member/AddMember" element={<AddMember />} />
        </Routes>
      </div>
    </>
  );
}

export default App;