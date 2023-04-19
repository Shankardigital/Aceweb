import React, { useEffect, useState } from "react";

import img1 from "../assets/images/football/footb-playing.png"
import img2 from "../assets/images/football/footb-field.jpg"
import termsandconditions from "../assets/images/letast/termsandconditions.gif"
import Footer from "./Footer";
import Headers from "./Header";
import { Link } from "react-router-dom";
import { URL } from "../Apiurls";
import axios from "axios";

const TermsCondition = () => {

    const [form, setform] = useState([])

    const accessToken = sessionStorage.getItem("accessToken")
    const getAbout = () => {
        axios
            .post(URL.gettermscondition, 
                // {
                //     headers: { Authorization: `Bearer ${accessToken}` },
                // }
            )
            .then(res => {
                setform(res.data.termsCondition.termsCondition)
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
                                    <div className="row align-items-center">
                                        <h2 style={{ color: "#c45100" }}>Terms & Condition</h2>

                                        <div dangerouslySetInnerHTML={{
                                            __html: form,
                                        }}
                                         />
                                       
                                    </div>
                                </div>
                                <div className="shape1"><img src={img1} alt="image" /></div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 pt-5 mt-5">
                            <div className="p-5 m-5"><img src={termsandconditions} alt="image" /></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    )
}
export default TermsCondition;