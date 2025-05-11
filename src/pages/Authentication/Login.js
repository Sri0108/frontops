import PropTypes from "prop-types";
import React from "react";

import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label, Button } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import { loginUser, socialLogin } from "../../store/actions";

// import images
import './login.css'
import logoDark from "assets/images/Vector.svg";

import logo from "assets/images/logo.svg";
import google from "assets/images/Google_logo.svg"
import potato from "assets/images/Bizzy4.svg"

const Login = props => {

  //meta title
  document.title = "Opsentrix";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    }
  });


  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      error: login.error
    })
  );

  const {
    error
  } = useSelector(LoginProperties);


  return (
    <React.Fragment>
      <Row style={{ margin: 0, padding: 0, minHeight: '100vh', backgroundColor: 'white' }}>
        <Col md={6} className="leftcontent">
          <Col md={8} lg={6} xl={6} >
            <div>
              <center>
                <img src={logoDark} alt="opsentrix" height="90" className="mb-4" style={{ width: "100%", height: "auto", maxWidth: "250px" }} />
              </center>

            </div>
            <CardBody className="pt-0">
              <div>
                <Link to="/" className="logo-light-element">
                  <div className="avatar-md profile-user-wid mb-4">
                    <span className="avatar-title rounded-circle bg-light">
                      <img
                        src={logo}
                        alt=""
                        className="rounded-circle"
                        height="34"
                      />
                    </span>
                  </div>
                </Link>
              </div>
              <div>
                <Form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    validation.handleSubmit();
                    return false;
                  }}
                  
                >
                  {error ? <Alert color="danger">{error}</Alert> : null}

                  <div className="mb-4 enter">
                    <Label className="form-label">Email address</Label>
                    <Input
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      type="email"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.email || ""}
                      invalid={
                        validation.touched.email && validation.errors.email ? true : false
                      }
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                    ) : null}
                  </div>

                  <div className="mb-0 enter">
                    <Label className="form-label">Password</Label>
                    <Input
                      name="password"
                      value={validation.values.password || ""}
                      type="password"
                      placeholder="Enter Password"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.password && validation.errors.password ? true : false
                      }
                    />
                    {validation.touched.password && validation.errors.password ? (
                      <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                    ) : null}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    
                      <div className="form-check mt-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                          style={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 500,
                            fontSize:"12px",
                            color: "#919BA1", 
                          }}
                        >
                          Remember me
                        </label>
                      
                    </div>
                          
                    <Link
                      to="/reset-password"
                      onClick={e => {
                        e.preventDefault();
                        console.log("Reset Password");
                      }}
                      className="reset-pass"
                      // style={{
                      //   fontFamily: "'Poppins', sans-serif",
                      //   fontWeight: 400, // SemiBold
                      //   textDecoration: 'none'
                      // }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="mt-3">
                    <button className="sign-in-button"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 120, // SemiBold
                        padding: "10px  "
                      }}
                    >Log in </button>
                  </div>


                  {/* <div className="mt-3 d-grid">
                    <button
                      className="btn btn-primary btn-block signin"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div> */}

                  <div className="mt-3 text-center">
                    <h5 className="divider">OR</h5>

                    <ul className="list-inline">
                      <Button block className="google-button" onClick={e => {
                        e.preventDefault();
                        console.log("Google-Login");
                      }}>
                        <img
                          src={google}
                          alt="Google Logo"
                          className="google-logo"
                        />
                        Continue with Google
                      </Button>
                      {/* <li className="list-inline-item">
                        <Link
                          to="#"
                          className="social-list-item bg-danger text-white border-danger"
                          onClick={e => {
                            e.preventDefault();
                            socialResponse("google");
                          }}
                        >
                          <i className="mdi mdi-google" />
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                </Form>
              </div>
            </CardBody>
          </Col>
        </Col>
        <Col md="6" className="rightcontent">
          {/* <div className="righttext">
            <h4 className="gradient-text" style={{ fontFamily: "'Poppins', sans-serif",fontWeight: 600,fontSize: "50px", height: "90px" }}>Unlock your</h4>
            <h4 className="gradient-text" style={{ fontFamily: "'Poppins', sans-serif",fontWeight: 600,fontSize: "50px", height: "110px" }}>Business Potential with</h4>
            <h3 style={{ fontFamily: "'Poppins', sans-serif",fontWeight: 500,fontSize: "50px", color: "#fcfffd"}}>Smart Insights for <br />Small Business!</h3>
          </div> */}
          {/* <span style={{ left: '10px',fontSize: "15px",color: "#fcfffd" }}>©Opsentrix</span>
          <span style={{ right: '20px',fontSize: "15px",color: "#fcfffd"}}>help@opsentrix.com</span> */}
          {/* <div> */}
          <div
  style={{
    backgroundImage: `url(${potato})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    objectFit: "contain",
    width: "100%",
    height: "100vh",
    margin: "auto",
  }}
></div>
          {/* </div> */}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};