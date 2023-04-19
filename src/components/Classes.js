import React from "react";
import Slider from "react-slick";

import img3 from "../assets/images/football/footb-player1.png"
import gallery1 from "../assets/images/football/footb-gallery1.jpg"
import gallery2 from "../assets/images/football/footb-gallery2.jpg"
import gallery3 from "../assets/images/football/footb-gallery3.jpg"
import gallery4 from "../assets/images/football/footb-gallery4.jpg"
import img8 from "../assets/images/football/footb-player2.png"
import cir1 from "../assets/images/cir1.jpg"
import cir2 from "../assets/images/cir2.jpg"
import cir3 from "../assets/images/cir3.jpg"

import Footer from "./Footer";
import Headers from "./Header";
import Class from "./Class";

const Members = () => {


    return (
        <div style={{ background: "#000" }}>
            <Headers />
           <div style={{marginTop:"100px"}}>
           <Class/>
           </div>
            <Footer />

        </div>
    )
}
export default Members;