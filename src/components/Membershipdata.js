import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Headers from "./Header";
import Membership from "./Membership";


const Membersdata = () => {

    return (
        <div style={{ background: "#000" }}>
            <Headers />
            <div style={{ marginTop: "100px", marginBottom:"50px" }} >
                <Membership />
            </div>
            <Footer />

        </div>
    )
}
export default Membersdata;