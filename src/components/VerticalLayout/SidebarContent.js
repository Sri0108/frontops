import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";


// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";
//i18n
import { withTranslation } from "react-i18next";
import { ReactComponent as Bizzy_gray } from '../../assets/images/Icon_Ask_gray.svg'
import { useSelector } from "react-redux";

import Bz from '../../assets/images/BZ_New_No_Border1.png'

const SidebarContent = props => {
  const status = useSelector((sas)=> {
    // console.log(sas.Layout.leftSideBarType);
    return sas.Layout;
  })
  const [image, setImg] = useState(<Bizzy_gray />)
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  function tToggle() {
    var body = document.body;
    var icon = document.querySelector(".collapse-icon");
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
    if (icon) {
        icon.classList.toggle("rotated");
    }

  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu" >



            {/* <li style={{marginTop: "30%"}}>
              <Link to="/ui/daily-digest" >
                <i className="bx bx-calendar" ></i>
                <span>{props.t("Daily Digest")}</span>
              </Link>
            </li> */}

            {/* <li>
              <Link to="/ui/business-dashboard" >
                <i className='bx bx-briefcase'></i>
                <span>{props.t("Business Dashboard")}</span>
              </Link>
            </li> */}
            <li>
              <Link to="/ui/dashboard">  {/*marginTop: "60%" */}
                {/* <i className='bx bx-home-alt' ></i> */}
                <i><svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.45 15.5C10.85 15.9 11.3667 16.0958 12 16.0875C12.6333 16.0792 13.1 15.85 13.4 15.4L19 7L10.6 12.6C10.15 12.9 9.9125 13.3583 9.8875 13.975C9.8625 14.5917 10.05 15.1 10.45 15.5ZM12 4C12.9833 4 13.9292 4.1375 14.8375 4.4125C15.7458 4.6875 16.6 5.1 17.4 5.65L15.5 6.85C14.95 6.56667 14.3792 6.35417 13.7875 6.2125C13.1958 6.07083 12.6 6 12 6C9.78333 6 7.89583 6.77917 6.3375 8.3375C4.77917 9.89583 4 11.7833 4 14C4 14.7 4.09583 15.3917 4.2875 16.075C4.47917 16.7583 4.75 17.4 5.1 18H18.9C19.2833 17.3667 19.5625 16.7083 19.7375 16.025C19.9125 15.3417 20 14.6333 20 13.9C20 13.3 19.9292 12.7167 19.7875 12.15C19.6458 11.5833 19.4333 11.0333 19.15 10.5L20.35 8.6C20.85 9.38333 21.2458 10.2167 21.5375 11.1C21.8292 11.9833 21.9833 12.9 22 13.85C22.0167 14.8 21.9083 15.7083 21.675 16.575C21.4417 17.4417 21.1 18.2667 20.65 19.05C20.4667 19.35 20.2167 19.5833 19.9 19.75C19.5833 19.9167 19.25 20 18.9 20H5.1C4.75 20 4.41667 19.9167 4.1 19.75C3.78333 19.5833 3.53333 19.35 3.35 19.05C2.91667 18.3 2.58333 17.5042 2.35 16.6625C2.11667 15.8208 2 14.9333 2 14C2 12.6167 2.2625 11.3208 2.7875 10.1125C3.3125 8.90417 4.02917 7.84583 4.9375 6.9375C5.84583 6.02917 6.90833 5.3125 8.125 4.7875C9.34167 4.2625 10.6333 4 12 4Z" fill="#5F6368" />
                  <defs>
                    <linearGradient id="linearcol1" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E87F2" />
                      <stop offset="1" stopColor="#9651FF" />
                    </linearGradient>

                  </defs>
                </svg></i>
                <span>{props.t("Hub")}</span>
              </Link>
            </li>
            <li>
              <Link to="/ui/IA">
                {/* <i className='bx bx-bar-chart-alt'></i> */}
                <i><svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.625 14.025L2 12.85L7 4.85L10 8.35L14 1.85L17 6.35L20.375 1L22 2.175L17.05 10.025L14.075 5.55L10.275 11.725L7.25 8.2L3.625 14.025ZM15.5 18C16.2 18 16.7917 17.7583 17.275 17.275C17.7583 16.7917 18 16.2 18 15.5C18 14.8 17.7583 14.2083 17.275 13.725C16.7917 13.2417 16.2 13 15.5 13C14.8 13 14.2083 13.2417 13.725 13.725C13.2417 14.2083 13 14.8 13 15.5C13 16.2 13.2417 16.7917 13.725 17.275C14.2083 17.7583 14.8 18 15.5 18ZM20.6 22L17.9 19.3C17.55 19.5333 17.1708 19.7083 16.7625 19.825C16.3542 19.9417 15.9333 20 15.5 20C14.25 20 13.1875 19.5625 12.3125 18.6875C11.4375 17.8125 11 16.75 11 15.5C11 14.25 11.4375 13.1875 12.3125 12.3125C13.1875 11.4375 14.25 11 15.5 11C16.75 11 17.8125 11.4375 18.6875 12.3125C19.5625 13.1875 20 14.25 20 15.5C20 15.9333 19.9417 16.3542 19.825 16.7625C19.7083 17.1708 19.5333 17.55 19.3 17.9L22 20.6L20.6 22Z" fill="#5F6368" />
                  <defs>
                    <linearGradient id="linearcol1" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E87F2" />
                      <stop offset="1" stopColor="#9651FF" />
                    </linearGradient>

                  </defs>
                </svg>
                </i>
                <span>{props.t("Insights & Actions")}</span>
              </Link>
            </li>
            <li>
              <Link to="/ui/watch-list">
                {/* <i className="bx bx-line-chart"></i> */}
                <i><svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z" fill="#5F6368" />
                  <defs>
                    <linearGradient id="linearcol1" x1="3" y1="12" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#1E87F2" />
                      <stop offset="1" stopColor="#9651FF" />
                    </linearGradient>
                  </defs>
                </svg>
                </i>
                <span>{props.t("Watchlist")}</span>
              </Link>
            </li>
            <li>
              <Link to="/ui/askdata" >
                {/* <i className='bx bx-chat'></i> */}
                <i>
                  {/* <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#33A8FF" />
                      <stop offset="100%" stopColor="#D699FF" />
                    </linearGradient>
                    <clipPath id="clip0_28_579">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#clip0_28_579)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M19.2351 4.37931C17.9456 3.08984 17.6144 0 17.6144 0C17.6144 0 17.2831 3.08984 15.9937 4.37931C14.7042 5.66878 11.6144 6 11.6144 6C11.6144 6 14.7042 6.33122 15.9937 7.62069C17.2831 8.91016 17.6144 12 17.6144 12C17.6144 12 17.9456 8.91016 19.2351 7.62069C20.5245 6.33122 23.6144 6 23.6144 6C23.6144 6 20.5245 5.66878 19.2351 4.37931ZM11.431 11.6956C9.49683 9.76142 9 5.12665 9 5.12665C9 5.12665 8.50317 9.76142 6.56897 11.6956C4.63476 13.6298 0 14.1267 0 14.1267C0 14.1267 4.63476 14.6235 6.56897 16.5577C8.50317 18.4919 9 23.1267 9 23.1267C9 23.1267 9.49683 18.4919 11.431 16.5577C13.3652 14.6235 18 14.1267 18 14.1267C18 14.1267 13.3652 13.6298 11.431 11.6956ZM20 16C20 16 20.2208 18.0599 21.0805 18.9195C21.9401 19.7792 24 20 24 20C24 20 21.9401 20.2208 21.0805 21.0805C20.2208 21.9401 20 24 20 24C20 24 19.7792 21.9401 18.9195 21.0805C18.0599 20.2208 16 20 16 20C16 20 18.0599 19.7792 18.9195 18.9195C19.7792 18.0599 20 16 20 16ZM4.67235 5.63767C4.02761 4.99294 3.862 3.44802 3.862 3.44802C3.862 3.44802 3.69639 4.99294 3.05166 5.63767C2.40692 6.28241 0.862004 6.44802 0.862004 6.44802C0.862004 6.44802 2.40692 6.61362 3.05166 7.25836C3.69639 7.90309 3.862 9.44802 3.862 9.44802C3.862 9.44802 4.02761 7.90309 4.67235 7.25836C5.31708 6.61362 6.862 6.44802 6.862 6.44802C6.862 6.44802 5.31708 6.28241 4.67235 5.63767Z" fill="url(#gradient)" />
                  </g>
                </svg> */}

                <img src={Bz}/>

                </i>
                <span>{props.t("Ask Bizzy")}</span>
              </Link>
            </li>
            <li style={{position:'absolute',bottom:0}}>
              <a onClick={(e)=>{
                e.preventDefault()
                tToggle();
              }}>
                <i className='mdi mdi-arrow-collapse-left collapse-icon' style={{fontSize: '32px',marginRight: "0.5rem"}}></i>
                <span>{props.t("Collapse")}</span>
              </a>
            </li>
            {/* <li>
              <Link to="/ui/timeline" >
                <i className='bx bx-timer'></i>
                <span>{props.t("Timeline")}</span>
              </Link>
            </li> */}
            {/* <li style={{marginTop: "50%"}}>
                <Link to="/ui/help" >
                  <i className='bx bx-timer'></i>
                  <span>{props.t("Help & Support")}</span>
                </Link>
              </li> */}
            {/* <li style={{ marginTop: "100%" }}>
              <Link to="/ui/logout" >
                <i className='bx bx-log-out-circle ' style={{ color: '#ff0000' }} ></i>
                <span>{props.t("Logout")}</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
