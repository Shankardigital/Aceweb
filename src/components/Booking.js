import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Apiurls";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
// import ReactDOM from "react-dom";
// import paypal from "paypal-checkout";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });


const Booking = () => {
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("accessToken")
    const planid = sessionStorage.getItem("planid")
    const jsonString = sessionStorage.getItem('bookingdata');
    const bookingdata = JSON.parse(jsonString);
    const [plans, setplans] = useState([])
    console.log(plans)
    const [user, setuser] = useState([])
    const [paypal, setpaypal] = useState(false)
    const [coupon, setcoupon] = useState([])
    const [getcoupon, setgetcoupon] = useState([])
    const [codes, setcodes] = useState([])
    const [paymentdata, setpaymentdata] = useState([])
    console.log(paymentdata.orderID)
    // const [totalval, settotalval] = useState([])
    console.log(getcoupon)

    const timelength = bookingdata.length

    const getPlans = () => {
        const params = {
            id: planid
        }
        axios.post(URL.planbyid, params, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }, {}).then((res) => {
            setplans(res.data.planResult)
            setpaypal(true);
        })
    }

    const getcustmer = () => {
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

    const getCountrycodes = () => {
        axios.post(URL.getallCountrycodes).then((res) => {
            console.log(res.data)
            setcodes(res.data.countrycodes)
        })
    }


    const handlechange = (e) => {
        const myform = { ...user }
        myform[e.target.name] = e.target.value
        setuser(myform)
    }

    const handlechange2 = (e) => {
        const myform = { ...coupon }
        myform[e.target.name] = e.target.value
        setcoupon(myform)
    }

    const counts = plans.price * timelength
    const counts1 = plans.price

    
    const addcoupon = () => {
        setpaypal(false);
        const mydata = {
            couponName: coupon.couponName,
        }

        axios.post(URL.getbycouponname, mydata,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setgetcoupon(res.data.couponResult)
                // mydetails()
                setpaypal(true);
            }
        },
            error => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
            }
        )
    }

    const couponsubmit = (e) => {
        e.preventDefault()
        addcoupon()
    }

    let percentage;
    if (plans.type === "RentalEquipment" || plans.type === "RentalLine") {
        percentage = (parseFloat(counts) * parseFloat(plans.tax)) / 100
    } else {
        percentage = (parseFloat(plans.price) * parseFloat(plans.tax)) / 100
    }

    let couponvalue = 0;
    if (getcoupon.type === "percent") {
        if (plans.type === "RentalEquipment" || plans.type === "RentalLine") {
            couponvalue = (parseFloat(getcoupon.value) * parseFloat(counts)) / 100
        } else {
            couponvalue = (parseFloat(getcoupon.value) * parseFloat(counts1)) / 100
        }

    } else {
        couponvalue = parseFloat(getcoupon.value)
    }

    const addbookings = (paymentdata) => {
        console.log(paymentdata.orderID)
        const mydata = {
            planId: planid,
            transactionId: paymentdata.orderID,
            subAmount: plans.type === "RentalEquipment" || plans.type === "RentalLine" ? counts : plans.price,
            tax: plans.type === "RentalEquipment" || plans.type === "RentalLine" ? percentage : plans.tax,
            totalAmount: parseFloat(total).toFixed(2),
            bookingTypeArr: bookingdata,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            couponPrice:couponvalue,
            couponId: getcoupon._id
        };
        axios.post(URL.addbooking, mydata,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                navigate("/successmsg")
            }
        },
            error => {
                if (error.response && error.response.status === 400) {
                    navigate("/failedmsg")
                }
            }
        )
    }

    // const formsubmit = (e) => {
    //     e.preventDefault()
    //     addbookings()
    // }

    // const percentage123 = plans.price * plans.tax / 100

    // const couponvalue = () => {
    //     if (getcoupon.length === 0 || getcoupon.length == "0" || getcoupon == [] ) {
    //         const total = parseFloat(percentage) + parseFloat(plans.price)
    //         console.log(total)
    //         settotalval(total)
    //     } else {
    //         const total = parseFloat(percentage) + parseFloat(plans.price) + parseFloat(getcoupon.value)
    //         settotalval(total)
    //     }
    // }

    var total = 0;
    if (getcoupon.length === 0) {
        total = parseFloat(percentage) + parseFloat(counts);
    }
    else {
        total = parseFloat(percentage) + parseFloat(counts) - couponvalue;
    }
    // var total = (getcoupon.length === 0) ?
    // parseFloat(percentage) + parseFloat(counts) :
    // parseFloat(percentage) + parseFloat(counts) - couponvalue;

    //     const total123 = (getcoupon.length === 0) ?
    //         parseFloat(percentage) + parseFloat(plans.price) :
    //         parseFloat(percentage) + parseFloat(plans.price) + parseFloat(getcoupon.value);
    // console.log(parseFloat(plans.price) + percentage)
    // (getcoupon.length === 0) ? total = parseFloat(percentage) + parseFloat(plans.price) : total = parseFloat(percentage) + parseFloat(plans.price) + parseFloat(getcoupon.value)


    useEffect(() => {
        getPlans()
        getcustmer()
        getCountrycodes()
    }, [])

    const dataclear = () => {
        window.location.reload()
        setgetcoupon(0)
    }

    const [paid, setPaid] = useState(false);
    console.log(total);
    const handleCreateOrder = (data, actions, total) => {
        console.log(total);
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: parseFloat(total).toFixed(2)
                    },
                    description: "Example purchase", // set the transaction description
                }
            ]
        });
    };


    // const handleClick = () => {
    //     handleCreateOrder()
    // };

    const handleApprove = async (data, actions) => {
        const order = await actions.order.capture().then(() => {
            setPaid(true);
            // 
        });
        // console.log(order);
        console.log(data);
        setpaymentdata(data);
        addbookings(data)
        return order;
    };

    return (
        <div  >
            <Header />
            <div style={{ marginTop: "170px" }} className="container mb-5">
                <div>
                    <h2 style={{ color: "#ff6f0b" }}>Checkout</h2>
                </div>
                {/* <div className="pb-2">
                    <Link to="/lanes">
                        <button className="btn btn-dark" style={{ float: "right", width:"100px" }}>Back  <i className="fa fa-hand-o-left"></i> </button>
                    </Link>
                </div> */}
                <form >
                    <div className="row mt-5">
                        <div className="col col-lg-4">
                            <div className="card ">
                                <div className="card-body">
                                    <h2 className="text-dark">Order Summary</h2>
                                    <div className="row text-dark">
                                        <div className="col">
                                            <div>
                                                <p className="text-dark">Plan</p>
                                                <p className="text-dark">Duration</p>
                                                <p className="text-dark">Sessions</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ direction: "rtl" }}>
                                                <p className="text-dark">{plans.name}</p>
                                                {plans.type === "Team_subcription" || plans.type === "Membership" ? (

                                                    <p className="text-dark">One Month</p>
                                                ) : (

                                                    <p className="text-dark">One Day</p>
                                                )}
                                                {plans.type === "RentalEquipment" || plans.type === "RentalLine" ? (

                                                    <p className="text-dark">{timelength}</p>
                                                ) : (
                                                    <p className="text-dark">1</p>
                                                )}

                                            </div>
                                        </div>
                                    </div><hr />
                                    <div className="row">
                                        {getcoupon.length == 0 ? (
                                            <form className="form-inline">
                                                <div className="form-group mx-sm-3 mb-2">
                                                    <label htmlFor="inputPassword2" className="sr-only text-dark">Coupon Code</label>
                                                    <input name="couponName" onChange={(e) => { handlechange2(e) }} type="text" className="form-control" id="inputPassword2" placeholder="Coupon Code" />
                                                </div>
                                                <button onClick={(e) => { couponsubmit(e) }} style={{ width: "100px" }} type="button" className="btn btn-dark mb-2">Apply</button>
                                            </form>
                                        ) : (
                                            <div style={{ width: "90%" }} className="card bg-success p-2">
                                                <div className="row">
                                                    <div className="col-lg-10 col">
                                                        Coupon added successfully
                                                    </div>
                                                    <div className="col-lg-2 col">
                                                        <i onClick={() => { dataclear() }} style={{ fontSize: "20px" }} class="fa fa-times-circle-o" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div><hr />

                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <p className="text-dark">Subtotal</p>
                                                <p className="text-dark">Sales Tax ({plans.tax} %)</p>
                                                <p className="text-dark">Coupon Price </p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div style={{ direction: "rtl" }}>
                                                {plans.type === "RentalEquipment" || plans.type === "RentalLine" ? (

                                                    <p className="text-dark">${counts}</p>
                                                ) : (
                                                    <p className="text-dark">${plans.price}</p>
                                                )}

                                                {plans.type === "RentalEquipment" || plans.type === "RentalLine" ? (

                                                    <p className="text-dark">${percentage}</p>
                                                ) : (
                                                    <p className="text-dark">${percentage}</p>
                                                )}

                                                {getcoupon.value == undefined ? (
                                                    <p className="text-dark">$0</p>
                                                ) : (
                                                    <p className="text-dark">${couponvalue}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div><hr />
                                    <div className="row">
                                        <div className="col">
                                            <div>
                                                <p className="text-dark" style={{ fontSize: "20px" }}>Total</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div>
                                                {plans.type === "RentalEquipment" || plans.type === "RentalLine" ? (

                                                    <p className="text-dark" style={{ fontSize: "20px" }}>$ {parseFloat(total).toFixed(2)}</p>

                                                ) : (
                                                    <p className="text-dark" style={{ fontSize: "20px" }}>$ {parseFloat(total).toFixed(2)}</p>

                                                )}

                                            </div>
                                        </div>
                                    </div><hr />
                                </div>
                            </div>
                        </div>
                        <div className="col col-lg-8">
                            <div className="card ">
                                <div className="card-body">
                                    <h2 className="text-dark">User Details</h2>
                                    <div className="row mt-4">

                                        <div className=" col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                <input type="text" value={user.firstName} required className="form-control" placeholder="EnterFirst Name" />
                                            </div>
                                        </div>
                                        <div className=" col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                <input type="text" value={user.lastName} required className="form-control" placeholder="Enter Last Name" />
                                            </div>
                                        </div>
                                        <div className=" col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">Email  <span className="text-danger">*</span> </label>
                                                <input required type="text" value={user.email} className="form-control" placeholder="Enter Your Email Id" />
                                            </div>
                                        </div>

                                        <div className=" col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">Address <span className="text-danger">*</span></label>
                                                <input type="text" value={user.address} className="form-control" placeholder="Address" />
                                            </div>
                                        </div>
                                        {/* <div className="col col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">City  <span className="text-danger">*</span></label>
                                                <input name="city" onChange={(e) => { handlechange(e) }} type="text" required className="form-control" placeholder="City" />
                                            </div>
                                        </div> */}
                                        {/* <div className="col col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">Country   <span className="text-danger">*</span></label>
                                                <select name="country" required onChange={(e) => { handlechange(e) }} className="custom-select">
                                                    <option value="">Select</option>
                                                    {codes.map((data, key) =>
                                                    (
                                                        <option key={key} value={data.countryCode}>{data.countryCode}</option>
                                                    )
                                                    )}

                                                </select>
                                            </div>
                                        </div> */}
                                        {/* <div className="col col-lg-6 mt-2">
                                            <div>
                                                <label className="text-dark">Zip / Postal Code  <span className="text-danger">*</span></label>
                                                <input name="zipcode" onChange={(e) => { handlechange(e) }} type="text" required className="form-control" placeholder="Zip / Postal Code " />
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div style={{ float: "right" }} className="mt-4">
                                        <button type="submit" style={{ width: "120px" }} className="btn btn-dark">Buy Now</button>
                                    </div> */}

                                    <div className="m-5 ">
                                        {paypal ? (
                                            <PayPalScriptProvider options={{ "client-id": "ATogY-QW2buinPQoSaiahHVymkWxZx0oapjUHwK2rXNiE45aKqoUPtJswvheeC4TsoNtwN5EmezdiV_M" }}>
                                                <div>
                                                    {/* <a  style={{color:"#ff0000"}}>{total}</a> */}
                                                    {paid ? (
                                                        ""
                                                    ) : (
                                                        <>
                                                            <PayPalButtons
                                                                createOrder={(data, actions) => handleCreateOrder(data, actions, total)}
                                                                onApprove={handleApprove}
                                                                style={{ display: "none" }} // Hide default PayPal button
                                                            />
                                                            {/* <button onClick={handleClick} >
                                                            Pay with PayPal
                                                        </button> */}
                                                        </>
                                                    )}
                                                </div>
                                            </PayPalScriptProvider>
                                        ) : ("")}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
            <Footer />

        </div>
    )
}
export default Booking