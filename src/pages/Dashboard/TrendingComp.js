import React, { useState } from "react";
import { Row, Col, Card, CardBody, CardTitle, Spinner, Tooltip } from "reactstrap";
import infoIcon from "../../assets/images/hub/Info Icon.svg"

const TrendingComp = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    console.log("trending comp", props.pin)
    return (
        <React.Fragment>
            <div className="custom-card">

                <div style={{ textAlign: "center" }}>
                    <i id={props.name.replaceAll(' ', '-') + "-pin"} className={props.pin[user_id].includes(props.name) ? 'bx bxs-pin' : 'bx bx-pin'} style={{ transform: 'rotate(45deg)', fontSize: 'large', cursor: 'pointer', height: 'fit-content', float: 'right' }}
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
                    <div style={{ display: 'flex' }}>
                        {/* <h5>{props.name}</h5> */}
                        <p style={{ marginBottom: '0.5rem' }}>{props.name}</p>
                        {/* <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} className="dripicons-information"></i> */}
                        <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} ><img src={infoIcon}/></i>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={props.name.replaceAll(' ', '-')}
                            toggle={toggle}
                        >
                            {props.toolText}
                        </Tooltip>
                    </div>
                </div>
                {(props.sales === undefined) ?
                    <center>
                        <Spinner color="primary" />
                    </center>
                    :
                    <>
                        <div style={{ textAlign: "center" }}>
                            <h2 style={{ fontSize: "calc(100% + 0.1rem)" }}>{props.day} {props.time}</h2>
                            <p style={{ marginBottom: 8 }}>Busiest time</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: "calc(100% + 0.005rem)" }}>
                            <p style={{ margin: 0, textAlign: 'center' }}>{props.sales}% <br />of sales</p>
                            <p style={{ margin: 0, textAlign: 'center' }}> €{props.avgSales} <br />average sale</p>
                            {/* <p style={{ margin: 0, textAlign: 'center' }}>{props.transactions}% <br />of transactions</p> */}
                        </div>
                    </>

                }
            </div>
        </React.Fragment >
    )
}
export default TrendingComp;