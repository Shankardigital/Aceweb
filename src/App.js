import logo from './logo.svg';
import './App.css';
// import '../src/freshman/Freshman.ttf'
import "../src/assets/_next/static/css/a254c171da4d315d7164.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Members from './components/Members';
import Classes from './components/Classes';
import Login from './components/auth/Login';
import Loginback from './components/auth/Loginback';
import Forgote from './components/auth/Forgote';
import Profile from './components/auth/Profile';
import Booking from './components/Booking';
import Planbooking from './components/Planbooking';
import About from './components/About';
import Lanes from './components/Lanes';
import Register from './components/auth/Register';
import OTP from './components/auth/OTP';
import Reset from './components/auth/Reset';
import Setpsw from './components/auth/Setpsw';
import Team from './components/Team';
import Batchdetails from './components/Batchdetails';
import TermsCondition from './components/TermsCondition';
import PrivacyPolicy from './components/PrivacyPolicy';
import Membership from './components/Membership';
import Successmsg from './components/Successmsg';
import Failedmsg from './components/Failedmsg';
import Membershipdata from './components/Membershipdata';
import Contact from './components/Contact';



function App() {


  return (
    <div >
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/log_in" element={<Loginback />} />
        <Route path="/forgot_password" element={<Forgote />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/planbooking" element={<Planbooking />} />
        <Route path="/about" element={<About />} />
        <Route path="/lanes" element={<Lanes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/OTP" element={<OTP />} />
        <Route path="/reset/:id" element={<Reset />} />
        <Route path="/team" element={<Team />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setpsw" element={<Setpsw />} />
        <Route path="/batchdetails" element={<Batchdetails />} />
        <Route path="/termscondition" element={<TermsCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/successmsg" element={<Successmsg  />} />
        <Route path="/failedmsg" element={<Failedmsg />} />
        <Route path="/membershipdata" element={<Membershipdata />} />
        <Route path="/contact" element={<Contact />} />
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
