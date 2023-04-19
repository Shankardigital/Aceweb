import React, { useEffect, useState } from "react";

import img1 from "../assets/images/football/footb-playing.png"
import img2 from "../assets/images/football/footb-field.jpg"
import termsandconditions from "../assets/images/letast/contac.png"
import Footer from "./Footer";
import Headers from "./Header";
import { Link } from "react-router-dom";
import { URL } from "../Apiurls";
import axios from "axios";


const Contact = () => {

    const [form, setform] = useState([])

    const accessToken = sessionStorage.getItem("accessToken")
    const getAbout = () => {
        axios
            .post(URL.getprivacypolicy, {},
                // {
                //     headers: { Authorization: `Bearer ${accessToken}` },
                // }
            )
            .then(res => {
                setform(res.data.privacyPolicy.privacyPolicy)
            })
    }

    useEffect(() => {
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
                                        <h2 style={{ color: "#c45100" }}>Contact Us</h2>
                                    <div className="mt-5 ">

                                       <div>
                                        <h5>
                                        8700 North Rainbow Farm Rd Bentonville
                                        </h5>
                                        <span>Email :contact@acebatting.com</span><br/>
                                        <span>Facebook : AceBatting</span><br/>
                                        <span>Instagram : acebatting</span><br/>
                                       </div>
                                    </div>
                                </div>
                                <div className="shape1"><img src={img1} alt="image" /></div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 pt-5 mt-5 mb-5">
                            <div className=""><img src={termsandconditions} alt="image" /></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    )
}
export default Contact;