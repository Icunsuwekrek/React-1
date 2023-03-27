import React from "react"
import Navbar from "../Components/Navbar";
class NotFound extends React.Component{
    render(){
        return(
           <div>
          <Navbar />
            <div className="container">
                <div className="alert alert-danger">
                    Ini adalah Halaman Yang Anda Kunjungi NotFound
                </div>
            </div>
          </div>
        )
    }
}
export default NotFound;
