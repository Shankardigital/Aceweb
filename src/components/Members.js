import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Headers from "./Header";

import Plans from "./Plans";


const Members = () => {

    return (
        <div style={{ background: "#000" }}>
            <Headers />
            <div style={{ marginTop: "100px" }} >
                <Plans />
            </div>
            <Footer />

        </div>
    )
}
export default Members;