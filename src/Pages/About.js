import React from "react"
import Navbar from "../Components/Navbar";
class About extends React.Component{
    render(){
        return(
          <div>
          <Navbar />
            <div className="container">
                <div className="alert alert-info">
                    Ini adalah Halaman About
                </div>
            </div>
           </div>
        )
    }
}
export default About;