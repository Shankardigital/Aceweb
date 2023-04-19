import React, { useState, useEffect } from "react";

import img1 from "../assets/images/football/footb-playing.png"
import img2 from "../assets/images/football/footb-field.jpg"
import Footer from "./Footer";
import Headers from "./Header";
import { Link } from "react-router-dom";
import { URL } from "../Apiurls";
import axios from "axios";


const About = () => {

    const [form, setform] = useState([])

    const getAbout = () => {
        axios
            .post(URL.getaboutus,

            )
            .then(res => {
                setform(res.data.aboutUs.aboutUs)
            })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getAbout()
    }, [])

    return (
        <div style={{ background: "#000" }}>
            <Headers />
            <section style={{ marginTop: "100px" }} id="partners" className="next-match-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="next-match-content">
                                <div className="content">
                                    <div className="row align-items-center">
                                        <h2 style={{ color: "#c45100" }}>About</h2>
                                        <div dangerouslySetInnerHTML={{
                                            __html: form,
                                        }}
                                        />
                                        {/* <div className="col-lg-5 col-md-5">
                          <h2>Next Match</h2><span className="sub-title">Champions League - 20 April,
                            2020</span>
                        </div>

                        <div className="col-lg-7 col-md-7">
                          <div id="timer" className="flex-wrap d-flex justify-content-center">
                            <div id="days" className="align-items-center flex-column d-flex justify-content-center">
                              <span>Days</span></div>
                            <div id="hours" className="align-items-center flex-column d-flex justify-content-center">
                              <span>Hours</span></div>
                            <div id="minutes" className="align-items-center flex-column d-flex justify-content-center">
                              <span>Minutes</span></div>
                            <div id="seconds" className="align-items-center flex-column d-flex justify-content-center">
                              <span>Seconds</span></div>
                          </div>
                        </div> */}

                                    </div>
                                </div>
                                <div className="shape1"><img src={img1} alt="image" /></div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="next-match-image"><img src={img2} alt="image" /></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    )
}
export default About;