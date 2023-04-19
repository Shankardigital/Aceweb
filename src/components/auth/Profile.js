import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { Link } from "react-router-dom";
import { Row, Col, Card, Modal, ModalBody, ModalHeader, CardTitle, Button, FormGroup, Label, Input, TabContent, TabPane, CardText } from "reactstrap";
import img1 from "../../assets/images/letast/acelogo.png"
import Invoice from "../../assets/images/letast/Invoice-0000004.pdf";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { URL } from "../../Apiurls";
import Barcode from 'react-barcode';
import { saveAs } from 'file-saver'
import ReactPaginate from 'react-paginate';
import QRCode from "react-qr-code";
import Moment from 'react-moment';

const Profile = () => {

    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    const [showAll, setShowAll] = useState(false);
    const [show, setshow] = useState(false)
    const toggle1 = () => setshow(!show);

    const accessToken = sessionStorage.getItem("accessToken")
    const [form, setform] = useState([])
    const [codes, setcodes] = useState([])
    const [wallet, setwallet] = useState([])
    const [plans, setplans] = useState([])
    const [qrcode, setqrcode] = useState([])
    console.log(qrcode)
    const [Files, setFiles] = useState("");
    const [passwordType, setPasswordType] = useState("password");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType12, setPasswordType12] = useState("password");
    const [book, setbook] = useState([])
    const [payAsYou, setpayAsYou] = useState([])
    const [members, setmembers] = useState([])
    const [rental, setrental] = useState([])
    const [classess, setclassess] = useState([])
    const [rentalEqui, setrentalEqui] = useState([])
    const [clinicss, setclinicss] = useState([])
    const [teamSub, setteamSub] = useState([])

    const [user, setuser] = useState([])
    const [user1, setuser1] = useState({ gender: user.gender })

    const handleChangepws = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
    };

    const handlechange = (e) => {
        const myUser = { ...user }
        myUser[e.target.name] = (e.target.value)
        setuser(myUser)
    }
    const handleChange = (e) => {
        setuser1({ ...user1, [e.target.name]: e.target.value });
    };

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    const togglePassword1 = () => {
        if (passwordType1 === "password") {
            setPasswordType1("text")
            return;
        }
        setPasswordType1("password")
    }
    const togglePassword12 = () => {
        if (passwordType12 === "password") {
            setPasswordType12("text")
            return;
        }
        setPasswordType12("password")
    }

    const mydetails = () => {
        axios.post(URL.getprofile, {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                setuser(res.data.customerResult)

            }
        })
    }

    const mybookings = () => {
        axios.post(URL.customerbookinghistory, {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                setpayAsYou(res.data.payAsYouGo)
                setmembers(res.data.membership)
                setrental(res.data.rentalLine)
                setclassess(res.data.classes)
                setrentalEqui(res.data.rentalEquipment)
                setclinicss(res.data.clinics)
                setteamSub(res.data.teamSubscription)
            }
        })
    }
    const mybookingdata = [...payAsYou, ...members, ...rental, ...classess, ...rentalEqui, ...clinicss, ...teamSub]
    console.log(mybookingdata)

    const mywallet = () => {
        axios.post(URL.getmywallet, {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                setwallet(res.data.walletResult)
            }
        })
    }

    const mypayments = () => {
        axios.post(URL.getallpayments, {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                setplans(res.data.PaymentResult)
            }
        })
    }

    const showqrcode = (data) => {
        setshow1(true)
        setqrcode(data)

    }

    const showmore = (data) => {
        setshow(true)
        setqrcode(data)

    }

    const getCountrycodes = () => {
        axios.post(URL.getallCountrycodes).then((res) => {
            console.log(res.data)
            setcodes(res.data.countrycodes)
        })
    }

    const editform = () => {
        const mydata = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            countryCode: user.countryCode,
            phone: user.phone,
            gender: user.gender,
            address: user.address,
        }
        axios.put(URL.editprofile, mydata,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                toast.success(res.data.message)
                mydetails()
                console.log(res.data.customerResult.gender)

            }
        },
            error => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
            }
        )
    }

    const formsubmit = (e) => {
        e.preventDefault();
        editform()
    }

    const changepassword = () => {
        const mydata = {
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
            confirmPassword: form.confirmPassword,

        }
        axios.post(URL.changepassword, mydata,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                toast.success(res.data.message)
                mydetails()
                setform([])
                clearform()
            }
        },
            error => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
            }
        )
    }

    const clearform = () => {
        setform({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }

    const pwsSubmit = (e) => {
        e.preventDefault();
        changepassword()
    }


    const changeHandler = (e) => {
        const file = e.target.files
        setFiles(e.target.files)
        console.log(file)
        const dataArray = new FormData()
        for (let i = 0; i < file.length; i++) {
            dataArray.append("avatar", file[i])
        }
        axios.put(URL.updateprofilepic, dataArray,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }, {}
        ).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                console.log(res.data);
                mydetails()
            }
        },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            }
        )

    }

    useEffect(() => {
        getCountrycodes()
        mydetails()
        mybookings()
        mypayments()
        mywallet()
    }, [])

    const downloadImage = (data) => {
        saveAs(`http://103.186.185.77:5027/${data.invoice}`) // Put your image url here.
        // axios.get(`http://103.186.185.77:5027/acebatting/website/booking/invoice/${data._id}`).then((res)=>{
        //     console.log(res.data)
        // })
    }

    const [listPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = mybookingdata.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(mybookingdata.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [listPerPage1] = useState(7);
    const [pageNumber1, setPageNumber1] = useState(0);

    const pagesVisited1 = pageNumber1 * listPerPage1;
    const lists1 = plans.slice(pagesVisited1, pagesVisited1 + listPerPage);
    const pageCount1 = Math.ceil(plans.length / listPerPage);
    const changePage1 = ({ selected }) => {
        setPageNumber1(selected);
    };

    return (
        <div  >
            <Header />
            <div style={{ marginTop: "170px" }} className="container mb-5">
                <div>
                    <h2 style={{ color: "#ff6f0b" }}>My Profile</h2>
                </div>
                <div className="row ">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="text-center ">
                                    <div  >
                                        {user.profilePic == undefined || user.profilePic == "" ? (
                                            <img style={{ borderRadius: "50%", background: "#e9e9e9d1", width: "120px" }} src={img1} />
                                        ) : (

                                            <img style={{ borderRadius: "50%", background: "#e9e9e9d1", width: "120px" }} src={"http://103.186.185.77:5027/" + user.profilePic} />
                                        )}

                                    </div>
                                    <div className="mt-2">
                                        <span className="text-dark">Full Name :</span> <span className="text-primary">{user.fullName}</span><br />
                                        <span className="text-dark">Email :</span> <span className="text-primary">{user.email}</span>
                                        <div className="text-center">
                                            <Barcode style={{ width: "200px" }} className="barcodest" width={0.8} value={user._id} />
                                        </div>
                                    </div>
                                    <Button style={{ width: "120px" }} tag={Label} className='mb-75 me-75 mt-3' size='sm' color='warning'>
                                        Upload  <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                        <Input name="avatar" type='file'
                                            onChange={changeHandler}
                                            hidden accept='image/*' />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-3 p-4">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <button className="nav-link active btn-outline" id="v-pills-home-tab" data-toggle="pill" data-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">My Details</button>
                                <button className="nav-link btn-outline" id="v-pills-profile-tab" data-toggle="pill" data-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">My Subscribe</button>
                                <button className="nav-link btn-outline" id="v-pills-payasyoygo-tab" data-toggle="pill" data-target="#v-pills-payasyoygo" type="button" role="tab" aria-controls="v-pills-payasyoygo" aria-selected="false">My Payments</button>
                                <button className="nav-link btn-outline" id="v-pills-wallet-tab " data-toggle="pill" data-target="#v-pills-wallet" type="button" role="tab" aria-controls="v-pills-wallet" aria-selected="false">My Wallet</button>
                                <button className="nav-link btn-outline" id="v-pills-settings-tab" data-toggle="pill" data-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Edit Profile</button>
                                <button className="nav-link btn-outline" id="v-pills-messages-tab" data-toggle="pill" data-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Change Password</button>

                                {/* <button className="nav-link btn-outline" id="v-pills-messages-tab" data-toggle="pill" data-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Wallets</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-body mt-5 mb-4 pb-3">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        {user.gender == null || user.gender == undefined ? (
                                            <p className="text-danger text-center">Please set your gender</p>
                                        ) : ""}
                                        <h3 className="text-primary">My Details</h3>
                                        <Row>
                                            <Col sm="12">
                                                <CardText className="mb-0">
                                                    <p className="text-primary">
                                                        A personal profile is something that gives whoever wants to
                                                        hire you or needs your services the first impression<br /> that you are
                                                        the best candidate for this website.These sites take things to the next level.

                                                    </p>

                                                    <Row className="mt-4">
                                                        <Col md={8}>
                                                            <Row >
                                                                <Col md={4}>
                                                                    <p ><b>First Name</b></p>
                                                                    <p><b>Last Name</b></p>
                                                                    <p><b>Gender</b></p>
                                                                    <p><b>Email</b></p>
                                                                    <p><b>Phone</b></p>
                                                                    <p><b>Address</b></p>
                                                                </Col>
                                                                <Col md={8}>

                                                                    <p className="text-primary"><b>:</b><span> {user.firstName}</span></p>
                                                                    <p className="text-primary"><b>:</b><span> {user.lastName}</span></p>
                                                                    <p className="text-primary"><b>:</b><span> {user.gender}</span></p>
                                                                    <p className="text-primary"><b>:</b><span> {user.email}</span></p>
                                                                    <p className="text-primary"><b>:</b><span> {user.countryCode} {user.phone}</span></p>
                                                                    <p className="text-primary"><b>:</b><span> {user.address}</span></p>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                        <Col md={6}></Col>
                                                    </Row>
                                                </CardText>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <h3 className="text-primary">My Subscriptions</h3>
                                        <div class="table-responsive">
                                            <table className="table table-hover" >
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Booking No
                                                        </th>
                                                        <th>
                                                            Plan Name
                                                        </th>
                                                        <th>
                                                            Plan Type
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                        <th>
                                                            Amount
                                                        </th>
                                                        <th>
                                                            Invoice
                                                        </th>
                                                        <th>
                                                            QR Code
                                                        </th>
                                                        <th>
                                                            More
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lists.map((data) => (
                                                        <tr>
                                                            <td>{data.bookingNo}</td>
                                                            <td>{data.planName}</td>
                                                            <td>{data.type}</td>
                                                            <td>{data.date == null || data.date == undefined ? (
                                                                // <Moment format="DD/MM/YYYY">
                                                                <span>    {data.startDate}</span>
                                                                // </Moment>
                                                            ) : (
                                                                <Moment format="DD/MM/YYYY">
                                                                    {data.date}
                                                                </Moment>
                                                            )}</td>
                                                            <td>$ {data.totalAmount}</td>

                                                            <td>
                                                                <Button onClick={() => downloadImage(data)} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="bx bx-cloud-download"></i></Button>
                                                            </td>
                                                            <td>
                                                                <Button onClick={() => { showqrcode(data) }} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="fa fa-qrcode"></i></Button>
                                                            </td>
                                                            <td>
                                                                <Button onClick={() => { showmore(data) }} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="fa fa-ellipsis-v"></i></Button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3" style={{ float: "right" }}>
                                            <ReactPaginate
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"previousBttn"}
                                                nextLinkClassName={"nextBttn"}
                                                disabledClassName={"disabled"}
                                                activeClassName={"active"}
                                                total={lists.length}
                                            />
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-payasyoygo" role="tabpanel" aria-labelledby="v-pills-payasyoygo-tab">
                                        <h3 className="text-primary">My Payments</h3>
                                        <div class="table-responsive">
                                            <table className="table table-hover " >
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Booking No
                                                        </th>
                                                        <th>
                                                            Transaction Id
                                                        </th>
                                                        <th>
                                                            Plan
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                        <th>
                                                            Discount Price
                                                        </th>
                                                        <th>
                                                            Amount
                                                        </th>
                                                        {/* <th>
                                                        Total
                                                    </th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lists.map((data) => (
                                                        <tr>
                                                            <td>{data.bookingNo}</td>
                                                            <td>{data.transactionId}</td>
                                                            <td>{data.type}</td>
                                                            <td>{data.date == null || data.date == undefined ? (
                                                                // <Moment format="DD/MM/YYYY">
                                                                <span>    {data.startDate}</span>
                                                                // </Moment>
                                                            ) : (
                                                                <Moment format="DD/MM/YYYY">
                                                                    {data.date}
                                                                </Moment>
                                                            )}</td>
                                                            <td>$ {data.couponPrice}</td>
                                                            <td>$ {data.totalAmount}</td>


                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="mt-3" style={{ float: "right" }}>
                                            <ReactPaginate
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                                pageCount={pageCount}
                                                onPageChange={changePage}
                                                containerClassName={"pagination"}
                                                previousLinkClassName={"previousBttn"}
                                                nextLinkClassName={"nextBttn"}
                                                disabledClassName={"disabled"}
                                                activeClassName={"active"}
                                                total={lists.length}
                                            />
                                        </div>
                                        {/* <p className="text-center">No Subscriptions</p> */}
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-wallet" role="tabpanel" aria-labelledby="v-pills-wallet-tab">
                                        <h3 className="text-primary">My Wallet</h3>
                                        {wallet.map((data, key) => (
                                            <div className="card m-2">
                                                <div className="row p-2">
                                                    <div className="col col-lg-5 ml-3">
                                                        <h5 className="text-dark">{data.planType}</h5>
                                                        <span className="text-secondary">Credit Balls</span>
                                                    </div>
                                                    <div className="col col-lg-4 ml-3">
                                                        <h5 className="text-dark">Date</h5>
                                                        <span className="text-secondary">{data.bookingDate}</span>
                                                    </div>
                                                    <div className="col col-lg-2">
                                                        <h5 className="text-dark text-center mt-3"> {data.credits}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <h3 className="text-primary">Change Password</h3>
                                        <form
                                            onSubmit={(e) => { pwsSubmit(e) }}
                                        >
                                            <Row>
                                                <Col sm="12">
                                                    <CardText className="mb-0">
                                                        <Row className="mt-3">
                                                            <Col md="4">
                                                                <FormGroup className="mb-3">
                                                                    <Label htmlFor="validationCustom01">Current Password <span className="text-danger">*</span></Label>
                                                                    <div className="input-group">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                handleChangepws(e);
                                                                            }}
                                                                            value={form.oldPassword}
                                                                            type={passwordType} name="oldPassword" className="form-control" placeholder="Password" />
                                                                        <div className="input-group-btn">
                                                                            <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword() }}>
                                                                                {passwordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="4">
                                                                <FormGroup className="mb-3">
                                                                    <Label htmlFor="validationCustom02">New Password <span className="text-danger">*</span></Label>

                                                                    <div className="input-group">
                                                                        <input
                                                                            onChange={(e) => {
                                                                                handleChangepws(e);
                                                                            }}
                                                                            value={form.newPassword}
                                                                            type={passwordType1} name="newPassword" className="form-control" placeholder="Password" />
                                                                        <div className="input-group-btn">
                                                                            <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword1() }}>
                                                                                {passwordType1 === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="4">
                                                                <FormGroup className="mb-3">
                                                                    <Label htmlFor="validationCustom02">Confirm Password <span className="text-danger">*</span></Label>

                                                                    <div className="input-group">
                                                                        <input type={passwordType12}
                                                                            onChange={(e) => {
                                                                                handleChangepws(e);
                                                                            }}
                                                                            value={form.confirmPassword}
                                                                            name="confirmPassword" className="form-control" placeholder="Password" />
                                                                        <div className="input-group-btn">
                                                                            <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword12() }}>
                                                                                {passwordType12 === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                    </CardText>
                                                </Col>
                                            </Row>
                                            <div className="mt-3" style={{ float: "right" }}>
                                                <Button style={{ width: "100px" }} color="primary" type="submit">
                                                    Submit <i className="fa fa-check-circle" aria-hidden="true"></i>
                                                </Button>
                                            </div>
                                        </form>

                                    </div>
                                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                                        <h3 className="text-primary mb-3">Edit Profile</h3>

                                        <form onSubmit={(e) => { formsubmit(e) }}>
                                            <Row >
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>First Name </label>
                                                    <input type="text" required name="firstName" value={user.firstName} onChange={(e) => { handlechange(e) }} placeholder="Please Enter First Name " className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>Last Name </label>
                                                    <input required name="lastName" value={user.lastName} onChange={(e) => { handlechange(e) }} type="text" placeholder="Please Enter Last Name " className="form-control" id="exampleInputPassword1" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>Email </label>
                                                    <input required name="email" value={user.email} onChange={(e) => { handlechange(e) }} type="email" placeholder="Please Enter Your Email id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>Mobile No</label>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <select required value={user.countryCode} onChange={(e) => { handlechange(e) }} style={{ width: "70px" }} name="countryCode" className="form-select">
                                                                <option value="">Choose</option>
                                                                {codes.map((data, key) =>
                                                                (
                                                                    <option key={key} value={data.countryCode}>{data.countryCode}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <input name="phone" required value={user.phone} onChange={(e) => { handlechange(e) }} type="number" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                    {/* <input type="password" placeholder="Please Enter Your Password" className="form-control" id="exampleInputPassword1" /> */}
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>Gender</label>
                                                    <div className="row mt-2 ml-2">
                                                        <div className="form-check col">
                                                            <input value="male" onChange={(e) => { handlechange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios1" checked={user.gender === "male"} />
                                                            <label className="form-check-label text-dark" htmlFor="exampleRadios1">
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check col">
                                                            <input value="female" onChange={(e) => { handlechange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios2" checked={user.gender === "female"} />
                                                            <label className="form-check-label text-dark" htmlFor="exampleRadios2">
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label style={{ color: "#000" }}>Address </label>
                                                    <textarea required name="address" value={user.address} onChange={(e) => { handlechange(e) }} type="email" placeholder="Please Enter Your Address" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                                </div>

                                            </Row>
                                            <div style={{ float: "righ" }}>
                                                <button style={{ float: "right", width: "120px" }} type="submit" className="text-end btn btn-primary">Submit</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
            <Footer />

            <Modal size="sm" centered isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <div>
                        <div className="text-center">
                            {/* <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qrcode._id}
                                viewBox={`0 0 256 256`}
                            /> */}
                            <img style={{ width: "280px" }} src={`http://103.186.185.77:5027/${qrcode.qrCode}`} />
                        </div>
                        <div className="text-end mt-3">
                            {/* <Button  type="button" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button> */}
                            <Button style={{ float: "right" }} type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>

            <Modal centered isOpen={show} toggle={toggle1}>
                <ModalBody>
                    <div className="row text-dark ">
                        <div className="col-6">
                            More Details
                        </div>
                        <div className="col-6">
                            <div className="mr-3" onClick={toggle1} style={{ float: "right", fontSize: "20px" }}>
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div><hr />

                    <div>
                        <div className="row">
                            <div className="col-4">
                                <img style={{ width: "100%", height: "175px" }} src={`http://103.186.185.77:5027/${qrcode.qrCode}`} />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-4">
                                        <p style={{ color: "#ff6f0b" }}>Booking Id </p>
                                        <p style={{ color: "#ff6f0b" }}>Plane Name </p>
                                        <p style={{ color: "#ff6f0b" }}>Balls </p>
                                        <p style={{ color: "#ff6f0b" }}>Date </p>
                                    </div>
                                    <div className="col-8">
                                        <p className="text-dark">: {qrcode.bookingNo} </p>
                                        <p className="text-dark">: {qrcode.planName} </p>
                                        <p className="text-dark">: {qrcode.credits} </p>
                                        <p className="text-dark">: {qrcode.date} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {qrcode.type == "RentalEquipment" || qrcode.type == "RentalLine" ? (
                            <div className="row">
                                <p className="p-3">Booking List</p><br></br>
                                <table className="text-dark table text-center">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Lane Number</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {qrcode.bookingTypeArr.map((data, key) => (
                                            <tr key={key}>
                                                <td>{data.date}</td>
                                                <td>{data.laneNumber}</td>
                                                <td>{data.time}</td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        ) : ""}

                        {qrcode.type == "Team_subcription" ? (
                            <div >
                                <p className="p-3">Team Members</p><br></br>
                                <table className="text-dark table text-center">
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone No</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qrcode.teamMembers.slice(0, showAll ? qrcode.teamMembers.length : 5).map((data, key) => (
                                            <tr key={key}>
                                                <td>{data.firstName + " " + data.lastName}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                {qrcode.teamMembers.length > 5 && (
                                    <div >
                                        {showAll ? (
                                            <p type="button" style={{ color: "#ff6f0b", float: "right" }} onClick={() => setShowAll(false)}>Show Less</p>
                                        ) : (
                                            <p type="button" style={{ color: "#ff6f0b", float: "right" }} onClick={() => setShowAll(true)}>Show More</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : ""}


                        <div className="text-end mt-3">
                            {/* <Button  type="button" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button> */}
                            {/* <Button style={{ float: "right" }} type="button" onClick={toggle1} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button> */}

                        </div>
                    </div>

                </ModalBody>

            </Modal>

        </div>
    )
}
export default Profile;