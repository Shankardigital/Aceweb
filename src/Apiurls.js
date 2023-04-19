const ACE_WEB_URL = "http://acebattingapi.digitalraiz.co.in/"
export const URL = {
    login: ACE_WEB_URL + "acebatting/website/customer/login",
    signup: ACE_WEB_URL + "acebatting/website/customer/customersignup",
    setup: ACE_WEB_URL + "acebatting/website/customer/setprofilepassword",
    forgot: ACE_WEB_URL + "acebatting/website/customer/forgotpassword",
    compareotp: ACE_WEB_URL + "acebatting/website/customer/compareotp",
    resetpassword: ACE_WEB_URL + "acebatting/website/customer/resetpassword",

    //profile 

    getallCountrycodes: ACE_WEB_URL + "acebatting/website/customer/getallcountrycodes",
    getprofile: ACE_WEB_URL + "acebatting/website/customer/getprofile",
    editprofile: ACE_WEB_URL + "acebatting/website/customer/editprofile",
    updateprofilepic: ACE_WEB_URL + "acebatting/website/customer/updateprofilepic",
    changepassword: ACE_WEB_URL + "acebatting/website/customer/changepassword",

    customerbookinghistory: ACE_WEB_URL + "acebatting/website/booking/customerbookinghistory",

    getmywallet: ACE_WEB_URL + "acebatting/website/payments/getmywallet",

    //lanes

    getallactivelanes: ACE_WEB_URL + "acebatting/adminportal/lanes/getallactivelanes_notoken",
    lanebooking: ACE_WEB_URL + "acebatting/website/booking/lanebooking",
    getbookedlanes: ACE_WEB_URL + "acebatting/website/booking/getbookedlanebydate_notoken",
    addbooking: ACE_WEB_URL + "acebatting/website/booking/addbooking",
    addmyteamSubscription: ACE_WEB_URL + "acebatting/website/teamSubscriptionWeb/addmyteamSubscription",
    
    // Booking
    addteamsubscription: ACE_WEB_URL + "acebatting/website/teamSubscription/addteamsubscription",
    addmembership: ACE_WEB_URL + "acebatting/website/membership/addmembership",
    addclinic: ACE_WEB_URL + "acebatting/website/clinics/addclinic",
    addmyclass: ACE_WEB_URL + "acebatting/website/classes/addmyclass",
    addpayasyougo: ACE_WEB_URL + "acebatting/website/payasyougo/addpayasyougo",
    

    //plans..
    getallplans: ACE_WEB_URL + "acebatting/adminportal/plans/getallactiveplans",
    planbyid: ACE_WEB_URL + "acebatting/adminportal/plans/getplanbyid",
    getplansbytypes: ACE_WEB_URL + "acebatting/adminportal/plans/plansbytypesgametypes",
    getplansby: ACE_WEB_URL + "acebatting/adminportal/plans/getplansbytypes",
    getallclass: ACE_WEB_URL + "acebatting/adminportal/plans/getclassesbygametypes",
    // bookclass: ACE_WEB_URL + "acebatting/website/classes/addmyclass",

    // batchs
    getallbatchs: ACE_WEB_URL + "acebatting/adminportal/batch/getallactivebatchs",
    getbatchbyid: ACE_WEB_URL + "acebatting/adminportal/batch/getbatchbyid",


    // coupons
    getbycouponname: ACE_WEB_URL + "acebatting/app/coupons/getbycouponname",

    // Banners
    getallbanners: ACE_WEB_URL + "acebatting/website/banners/getallbanners",

    // payments
    getallpayments: ACE_WEB_URL + "acebatting/website/payments/getallpayments",

    //Oters
    getaboutus: ACE_WEB_URL + "acebatting/website/companypolicy/getaboutus",
    getprivacypolicy: ACE_WEB_URL + "acebatting/website/companypolicy/getprivacypolicy",
    gettermscondition: ACE_WEB_URL + "acebatting/website/companypolicy/gettermscondition",
    getrefundpolicy: ACE_WEB_URL + "acebatting/website/companypolicy/getrefundpolicy",


}