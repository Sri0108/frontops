import React, { useEffect, useState } from "react";
import infoIcon from "../../assets/images/hub/Info Icon.svg"
import { Row, Col, Card, CardBody, CardTitle, Spinner, Tooltip } from "reactstrap";
import { Value } from "sass";


const PopularSpendingRange = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const perchange = (value) => {
        let state = <span>
            {" "}
            {value}%
        </span>

        if (value < 0) {
            state = <span>
                {" "}
                {Math.abs(value)}%{" "}
            </span>
        }
        if (value === 0) {
            state = <span className="me-2">
                {" "}
                {Math.abs(value)}%{" "}
            </span>
        }

        return state;
    }

    const textChange = (value) => {
        let state = <p style={{ backgroundColor: "whitesmoke", borderRadius: "0.6rem", padding: "0.25rem",width:"fit-content" }}><i className="mdi mdi-arrow-up text-success" style={{marginRight:"0.1rem"}}></i>High </p>
        if (value < 0){
            state = <p style={{ backgroundColor: "whitesmoke", borderRadius: "0.8rem", paddingLeft: "0.4rem", paddingRight:"0.4rem",width:"fit-content" }}><i className="mdi mdi-arrow-down text-danger" style={{marginRight:"0.1rem"}}></i>Low </p>
        }

        return state
    }
    // let font = "unset";
    const [font, setFont] = useState("xlarge")
    useEffect(() => {
        if (window.innerWidth < 889) {
            console.log("working font size med")
            setFont("large")
        }
        else {
            setFont("undefined")
        }
    }, [window.innerWidth])
    console.log(window.innerWidth)

    return (
        <React.Fragment>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', marginBottom:"1rem", marginTop:"0.5rem" }}>
                        <p style={{ marginBottom: "1rem" }}>{props.name}</p>
                        <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }}> <img src={infoIcon} alt="info icon" /></i>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={props.name.replaceAll(' ', '-')}
                            toggle={toggle}
                        >
                            {props.toolText}
                        </Tooltip>
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
                    JSON.stringify(props.value) === "{}" ?
                        <center>
                            <Spinner color="primary" />
                        </center>
                        :
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{display:"flex"}}>
                                    <h4 style={{padding:0, margin: 0, fontSize: `${font}` }}>
                                        {/* {props.value.high_percentage}% */}
                                        {perchange(props.value.high_percentage)}
                                    </h4>
                                    {textChange(props.value.high_percentage)}
                                    {/* <p style={{ backgroundColor: "whitesmoke", borderRadius: "0.5rem", padding: "0.25rem",width:"fit-content" }}>High</p> */}
                                </div>
                                <div>
                                    {`€${props.value.high.first_high} - €${props.value.high.last_high} `}
                                </div>

                            </div>
                            <div>
                                <div style={{display:"flex"}}>
                                    <h4 style={{padding:0, margin: 0, fontSize: `${font}` }}>
                                        {/* {Math.abs(props.value.low_percentage)} */}
                                        {perchange(props.value.low_percentage)}
                                    </h4>
                                    {textChange(props.value.low_percentage)}
                                    
                                </div>
                                <div>
                                    {`€${props.value.low.first_low} - €${props.value.low.last_low} `}
                                </div>
                            </div>
                        </div>
                }
            </div>

        </React.Fragment>
    );
};

export default PopularSpendingRange;