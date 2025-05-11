import React, { useState } from "react";
import { Spinner, Table, Tooltip } from "reactstrap";
import { date } from "yup";
import infoIcon from "../../assets/images/hub/Info Icon.svg"
import { useRef } from "react";
import { useEffect } from "react";


const LabourSchedule = (props) => {
    let user_id = JSON.parse(localStorage.getItem("authUser")).uid;
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltipSOpen, setTooltipSOpen] = useState(false);
    const stoggle = () => setTooltipSOpen(!tooltipSOpen);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const myref = useRef()

    useEffect(() => {
        const updateHeight = () => {
          if (myref.current) {
            console.warn(myref.current.clientHeight);
            props.setcardheight(myref.current.clientHeight / 150)
          }
        };
    
        const resizeObserver = new ResizeObserver(updateHeight);
        if (myref.current) {
          resizeObserver.observe(myref.current);
        }
    
        return () => resizeObserver.disconnect(); // Cleanup
      }, []);
      
    return (
        <div className="custom-card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}>
                    <p>{props.name}</p>
                    {/* <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} className="dripicons-information"></i> */}
                    <i id={props.name.replaceAll(' ', '-')} style={{ marginLeft: "0.3rem", cursor: "pointer" }} ><img src={infoIcon} /></i>
                    <Tooltip
                        isOpen={tooltipOpen}
                        target={props.name.replaceAll(' ', '-')}
                        toggle={toggle}
                    >
                        {props.name}
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
            <div ref={myref}>
                {
                    JSON.stringify(props.labour) !== "{}" ?
                        <Table className="table table-sm mb-0">
                            {/* <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Schedule</th>
                                        <th>Date</th>
                                    </tr>
                                </thead> */}
                            <tbody>
                                {
                                    props.labour.map((e, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{e.Date}</td>
                                                <td>{e.Employee}</td>
                                                <td>{e.Schedule}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        :
                        <center>
                           <Spinner color="primary" />
                        </center>
                }
            </div>
        </div>
    );
};

export default LabourSchedule;