import React, { useState } from "react";
// import loginimg from "../../assets/images/loginimg.gif";
import successpay from "../assets/images/letast/successpay.gif";

import { useNavigate, Link } from "react-router-dom";

const Successmsg = () => {

    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "80px", }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "none" }} className="card-body">
                            <div className=" successfailedcard text-center" >
                                <div className="text-center">
                                    <img src={successpay} style={{ width: "400px" }} />
                                </div>
                                <span className="text-secondary">Congratulations! Your payment has been successfully processed.Thank you for choosing our services.</span>
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
export default Successmsg;