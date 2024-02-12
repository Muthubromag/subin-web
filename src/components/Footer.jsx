import _ from "lodash";

import { useLocation, useNavigate } from "react-router-dom";
import { Menus } from "../helper/datas/menu";
import { getFooterData } from "../helper/api/apiHelper";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { colorTheme } from "../redux/authSlice";
import { MdLocationPin } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import "../assets/css/footer.css";
function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [footerData, setFooterData] = useState(null);
  const [color, setColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFooterData();
        setFooterData(response?.data);
        setColor(response?.data[0]?.colors);
        dispatch(
          colorTheme({
            primaryColor: response?.data[0]?.colors?.primaryColor,
            secondaryColor: response?.data[0]?.colors?.secondaryColor,
            thirdColor: response?.data[0]?.colors?.thirdColor,
            fourthColor: response?.data[0]?.colors?.fourthColor,
          })
        );
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchData();
  }, []);

  if (footerData === null) {
    return null;
  }

  const firstFooterData = footerData[0];
  const socialMediaLinks = firstFooterData.socialMediaLinks || [];

  const social = [
    {
      id: 1,
      link: "https://www.instagram.com/iftar_restaurant_ambur/?igshid=ZDdkNTZiNTM%3D",
      name: "igram",
    },
    {
      id: 2,
      link: "https://www.facebook.com/people/Iftar-Restaurant/100090336356764/?mibextid=ZbWKwL",
      name: "fbook",
    },
    {
      id: 3,
      link: "https://whatsapp.com/channel/0029VaBEhJ40gcfSjIZsQV04",
      name: "wup",
    },
    {
      id: 4,
      link: "https://www.youtube.com/@BROMAGINDIA",
      name: "ytube",
    },
    {
      id: 5,
      link: "https://www.linkedin.com/company/bromagindia/",
      name: "linkedin",
    },
  ];

  const footerLinks = [
    { id: 1, name: "Who we are", link: "/whoweare" },
    { id: 2, name: "Privacy Policy", link: "/privacy" },
    { id: 3, name: "Refund and Cancellation", link: "/cancellation" },
    { id: 4, name: " Terms and Condition", link: "/termsandcondition" },
  ];
  return (
    <div
      className={` py-4 lg:min-h-[53vh] text-white z-50 pb-10 ${
        ["/booking-details", "/play-my-contest", "/my-profile"].includes(
          _.get(location, "pathname", "")
        )
          ? "rounded-none"
          : "lg:rounded-t-[50px] rounded-t-[25px]"
      }`}
      style={{
        backgroundColor: color?.secondaryColor
          ? color?.secondaryColor
          : "#000000",
      }}
    >
      <div className="footer-container">
        {/* <div className="ultraSm:px-4 lg:px-8 py-2">
          {/* Logo */}
        {/* <img
            src={firstFooterData?.logo}
            className="lg:w-[150px] lg:h-[150px]"
            alt="Footer Logo"
          /> 
        </div> */}
        <div className="footer-wrapper">
          {/* About Us */}

          <div className="footer-part1">
            <div className="flex flex-col lg:gap-y-10 gap-y-8">
              <h1 className="lg:text-2xl text-sm font-bold   text-[#EFEFEF] footer-link-header">
                ABOUT US
                <img
                  src="/assets/icons/footerborder.png"
                  alt="Footer Border"
                  className="lg:pt-1 pt-2 footer-line"
                />
              </h1>

              <div className="flex flex-col lg:gap-y-2 gap-y-5 lg:text-2xl text-sm footer-link-wrapper">
                <div className="flex gap-2 items-center">
                  <FaPhoneAlt className="text-[10] lg:text-sm hidden" />
                  <span className="text-[10px] ">Who we are</span>
                </div>

                <div className="flex items-center">
                  <IoMailOutline className="text-sm hidden" />
                  <span className="text-[9px] ">Privacy Policy</span>
                </div>
                <div className="flex lg:items-center">
                  <MdLocationPin className="text-2xl lg:text-lg  hidden" />
                  <span className="text-[10px] ">Refund and Cancellation</span>
                </div>
                <div className="flex lg:items-center">
                  <MdLocationPin className="text-2xl lg:text-lg  hidden" />
                  <span className="text-[10px] ">Refund and Cancellation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="footer-part2">
            <div className="flex flex-col lg:gap-y-10 sm:gap-y-8 gap-y-7 ">
              <h1 className="lg:text-2xl text-sm font-bold   text-[#EFEFEF]  footer-link-header">
                CONTACT US
                <img
                  src="/assets/icons/footerborder.png"
                  alt="Footer Border"
                  className="lg:pt-1 pt-2 footer-line"
                />
              </h1>

              <div className="flex flex-col lg:gap-y-7 gap-y-5 lg:text-2xl text-sm footer-link-wrapper">
                <div className="flex gap-2 items-center">
                  <FaPhoneAlt size={15} />
                  <a
                    href={`tel:${firstFooterData?.contactNumber}`}
                    className="text-[10px] "
                  >
                    {firstFooterData?.contactNumber}
                  </a>
                </div>

                <div className="flex gap-2 items-center">
                  <IoMailOutline size={15} />
                  <a
                    href={`mailto:${firstFooterData?.email}`}
                    className="text-[10px] "
                  >
                    {firstFooterData?.email}
                  </a>
                </div>
                <div className="flex gap-2 lg:items-center">
                  <MdLocationPin size={15} />
                  <span className="text-[10px] text-capitalize ">
                    {firstFooterData?.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <div className="footer-part3">
            <div className="flex flex-col border-l border-white/50 pl-10 pr-3">
              <h1 className="text-2xl font-sans  text-[#5e5e5e] font-extrabold mb-1">
                GIVE YOUR FEEDBACK
              </h1>
              <div className="flex flex-col lg:gap-y-2 gap-y-5 lg:text-2xl text-sm pr-3">
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full bg-transparent border "
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your e-mail"
                    className="input input-bordered w-full bg-transparent border "
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full bg-transparent border "
                  />
                </div>

                <div className="w-full flex items-center py-1 gap-2">
                  <textarea
                    className="textarea textarea-bordered w-[60%] h-16 resize-none bg-white"
                    placeholder="Write something..."
                  ></textarea>
                  <button className="btn w-[40%] h-16 bg-primary_color border-none text-lg text-white">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Social Links */}
        </div>
        <div className="flex gap-x-5 justify-center items-center mt-6">
          {social.map((res, index) => (
            <a key={index} href={res.link} target="_blank" rel="noreferrer">
              <img
                src={`/assets/icons/${res.name}.png`}
                className="footer_icons"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
