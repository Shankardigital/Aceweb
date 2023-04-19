import React, { useState } from "react";
// import loginimg from "../../assets/images/loginimg.gif";
import failed from "../assets/images/letast/failedpay.gif";
import { useNavigate, Link } from "react-router-dom";

const Failedmsg = () => {

    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "80px", }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "#fefcfc" }} className="card-body">
                            <div className=" successfailedcard  text-center" >
                                <div className="text-center">
                                    <img src={failed} style={{ width: "400px" }} />
                                </div>
                                <span className="text-secondary">I'm sorry to hear that your payment has failed. There can be several reasons why a payment fails, such as insufficient funds, technical issues, or incorrect card information.</span>
                                <p>If you have any questions or concerns regarding your purchase, please don't hesitate to contact our customer service team.</p>
                                <Link to="/">
                                    <span style={{ color: "#ff6f0b" }} ><i class="fa fa-arrow-circle-o-left" aria-hidden="true"></i> Back to home</span>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </body>
        </div>
    )
}
export default Failedmsg;