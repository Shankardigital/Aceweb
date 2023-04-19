import React from "react";
import imglog from "../assets/images/letast/acelogo.png"
import { Link, useNavigate } from "react-router-dom";

const Header =()=>{

    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem("accessToken")
    console.log(accessToken)

    const sessiionClear = () => {
        sessionStorage.clear()
        navigate("/login")
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };



    return(
        <div style={{background:"#000"}}>
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid"><Link to="/" className="navbar-brand" > <img style={{width:"120px"}}  src={imglog} /></Link>
                       <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item"><Link onClick={scrollToTop} className={window.location.pathname === "/" ? 'nav-link active' : 'nav-link'} to="/">Home</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className={window.location.pathname === "/members" ? 'nav-link active' : 'nav-link'} to="/members">Plans</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className={window.location.pathname === "/membershipdata" ? 'nav-link active' : 'nav-link'} to="/membershipdata">Membership</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className={window.location.pathname === "/classes" ? 'nav-link active' : 'nav-link'}  to="/classes">Classes</Link></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="#highlights">Groups</a></li> */}
                                    <li className="nav-item"><Link onClick={scrollToTop} to="/about" className={window.location.pathname === "/about" ? 'nav-link active' : 'nav-link'}>About</Link></li>
                                    <li className="nav-item"><Link to="/contact" onClick={scrollToTop} className={window.location.pathname === "/contact" ? 'nav-link active' : 'nav-link'}>Contact</Link></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="#news">Hours</a></li> */}
                                    {/* <li className="nav-item"><a className="nav-link" href="#news"></a></li> */}
                                    {accessToken == null ? (
                                        <li className="nav-item"><Link className="nav-link" to="/login"><i class="fa fa-user-circle-o" aria-hidden="true"></i></Link></li>

                                    ) : (
                                        <div className="dropdown">
                                            <li className="nav-item dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user-circle-o" aria-hidden="true"></i></li>

                                            <div class="dropdown-menu drop promenubar">
                                                <Link to="/profile" class="dropdown-item">
                                                    <div className="row">
                                                        <div className="col col-3"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>
                                                        <div className="col col-9">Profile</div>
                                                    </div>
                                                </Link>
                                                <a onClick={()=>{sessiionClear()}} role="button" class="dropdown-item" >
                                                    <div className="row">
                                                        <div className="col col-3"><i class="fa fa-sign-out text-danger" aria-hidden="true"></i></div>
                                                        <div className="col col-9">Log Out</div>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>

        </div>
    )
}
export default Header;