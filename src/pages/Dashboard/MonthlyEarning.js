import { Scale } from "chart.js";
import { size } from "lodash";
import React, { useState } from "react";
import infoIcon from "../../assets/images/hub/Info Icon.svg"
import { Row, Col, Card, CardBody, CardTitle, Spinner, Tooltip } from "reactstrap";


const MonthlyEarning = (props) => {
  let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
  let percentChange = props.percentChange
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipSOpen, setTooltipSOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const stoggle = () => setTooltipSOpen(!tooltipSOpen);
  let state = <span>
    {" "}
    <i className="mdi mdi-arrow-up text-success"></i>{" "}{percentChange}%
  </span>
  if (percentChange < 0) {
    state = <span>
      {" "}
      <i className="mdi mdi-arrow-down text-danger"></i>{" "}{Math.abs(percentChange)}%
    </span>
  }
  if (percentChange === 0) {
    state = <span className="me-2">
      {" "}
      {percentChange}%{" "}
    </span>
  }

  return (
    <React.Fragment>
      <div className="custom-card">
        <div style={{ display: 'flex', justifyContent: 'space-between' , marginBottom:"1rem", marginTop:"0.5rem"}}>
          <div style={{border:"2px whitesmoke solid" , padding: "3px", borderRadius:"7px"}}>
            {/* <i className={props.icon} style={{fontSize:"50px", marginRight: '1.3rem', color:"rgba(223,223,223,255)", fontWeight:"100",strokeWidth:"0.5px"}}></i> */}
            <img src={props.icon} />
          </div>

          <i id={props.name.replaceAll(' ', '-') + "-pin"} className={props.pin[user_id].includes(props.name) ? 'bx bxs-pin' : 'bx bx-pin'} style={{ transform: 'rotate(45deg)', fontSize: 'large', cursor: 'pointer', height: 'fit-content' }}
            onClick={(e) => {
              if (props.pin[user_id].includes(props.name)) {
                var index = props.pin[user_id].indexOf(props.name);
                if (index !== -1) {
                  props.pin[user_id].splice(index, 1);
                }
                localStorage.setItem("pins", JSON.stringify(props.pin))
                props.setpins(JSON.parse(localStorage.getItem('pins')))
              }
              else {
                props.pin[user_id].push(props.name)
                localStorage.setItem("pins", JSON.stringify(props.pin))
                props.setpins(JSON.parse(localStorage.getItem('pins')))
              }
            }}></i>
          <Tooltip
            isOpen={tooltipSOpen}
            target={props.name.replaceAll(' ', '-') + "-pin"}
            toggle={stoggle}
          >
            {props.pin[user_id].includes(props.name) ? 'Unpin from Watchlist' : 'Pin to Watchlist'}
          </Tooltip>
        </div>
        {
          (props.value === undefined || props.value === "undefined%" || props.value === "€ NaN" || props.value === "€ undefined") ?
            <center>
              <Spinner color="primary" />
            </center>
            :
            <React.Fragment>
              {/* <h3>{props.value}</h3> */}
              <div style={{ display: 'flex' }}>
                <p>{props.name}</p>
                <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }}> <img src={infoIcon} alt="info icon"/></i>
                <Tooltip
                  isOpen={tooltipOpen}
                  target={props.name.replaceAll(' ', '-')}
                  toggle={toggle}
                >
                  {props.toolText}
                </Tooltip>
              </div>
              <React.Fragment>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', whiteSpace: 'nowrap' }}>
                  <h2 style={{ fontSize: "calc(100% + 0.5rem)", margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {props.value}
                  </h2>
                  {percentChange && (
                    <p  style={{ margin: 0, whiteSpace: 'nowrap', flexShrink: 0, background: "whitesmoke", borderRadius: "15px", paddingLeft:"0.3rem", paddingRight:"0.3rem" }}>
                      {state}
                    </p>
                  )}
                </div>



              </React.Fragment>

            </React.Fragment>
        }
      </div>
    </React.Fragment>
  );
};

export default MonthlyEarning;
