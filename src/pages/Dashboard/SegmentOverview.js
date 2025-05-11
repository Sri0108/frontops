import React from "react";
import Knob from "../AllCharts/knob/knob"

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

const SegmentOverview = (props) => {
    let height = Math.min(window.innerHeight / 20, window.innerHeight / 5);
    const values = [20, 40, 60, 80]
    const headhing = ["Breakfast", "lunch", "dinner", "happy hour"]
    return (
        <React.Fragment>
            <p>{props.name}</p>
            <Row>
                {
                    headhing.map((item, index) => {
                        return <Col key={index}>
                            <Knob
                                onChange = {(e)=>e}
                                value={values[index]}
                                fgColor="#03a65a"
                                thickness={0.4}
                                readOnly={true}
                                height={height}
                                width={height}

                            />
                            <p style={{ fontSize: "medium", fontWeight: 500 }}>{item}</p>
                        </Col>
                    })
                }
            </Row>
        </React.Fragment>
    );
};

export default SegmentOverview;
