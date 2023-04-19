import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    return (
        <div style={{ background: "#000" }}>
            <footer className="footer-area">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-12">
                            <p><i className="flaticon-copyright" /> <a href="#" target="_blank">Digitalraiz</a>. All Rights Reserved, @{/* */}2023</p>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <ul className="social">
                                <li><a target="_blank" href="#"><i className="flaticon-facebook-logo" /></a></li>
                                <li><a target="_blank" href="#"><i className="flaticon-twitter" /></a></li>
                                <li><a target="_blank" href="#"><i className="flaticon-instagram" /></a></li>
                                <li><a target="_blank" href="#"><i className="flaticon-linkedin" /></a></li>
                                <li><a target="_blank" href="#"><i className="flaticon-youtube" /></a></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <ul className="info-link">
                                <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                                <li><Link to="/termscondition">Terms &amp; Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
export default Footer