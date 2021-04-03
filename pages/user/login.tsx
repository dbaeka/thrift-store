/*
|--------------------------------------------------------------------------
| Login View.
|--------------------------------------------------------------------------
|
| The view where a user can log in. Redux is used to make the api call.
|
*/

import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login} from "@/store/auth/authActions";
import {UserValidator} from "@/services/UserValidator";
import {TextInput} from "@/components/Form/FormElement";
import {PrimaryButton} from "@/components/Button/Button";
import {Alert} from "@/components/Alert/Alert";
import {useRouter} from "next/router";
import Link from "next/link";
import {SmallSpinner} from "@/components/Spinner/Spinner";
import {Col, Container, Row} from "reactstrap";

const Login = (props: any) => {
    /**
     * The state.
     */
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        otp: "",
        emailError: "",
        passwordError: "",
        otpError: ""
    });

    const [stage, setStage] = useState(0);

    const [canResend, setCanResend] = useState(false);

    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0)
                setTimeLeft(timeLeft - 1);
            else
                setCanResend(true)
        }, 1000);
        // Clear timeout if the component is unmounted
        return () => clearTimeout(timer);
    });

    // The router object used for redirecting after login.
    const router = useRouter();

    // Redirect to user home route if user is authenticated.
    useEffect(() => {
        if (props.isAuthenticated && !props.loading) {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }
    }, [props.isAuthenticated, props.loading]);

    /**
     * Handle input change.
     *
     * @param {object} e
     *   The event object.
     */
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            emailError: "",
            passwordError: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = () => {
        const userValidator = new UserValidator();
        const {email, password} = formData;

        // Check for valid email address.
        const isEmailValid = userValidator.validateEmail(email);
        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please provide a valid email address",
            });
            return;
        }

        // Check for valid password.
        if (!password) {
            setFormData({
                ...formData,
                passwordError: "Please provide a valid password",
            });
            return;
        }
        if (stage == 0) {
            setStage(1);
        }

        // Make API call if everything is fine.
        props.login(email, password);
    };

    /**
     * The Return statement. Responsible for rendering the markup.
     */
    return (
        <div className="w-screen h-screen relative m-0">
            <Row>
                <Col className="overlay hidden md:block" md={6}>
                    <div>
                    </div>
                </Col>
                <Col className="" md={6}>
                    <div className="mt-3 ml-3 hidden md:block">
                        <div className="title">The April Thrift Store</div>
                        <div className="sub-title">Administrator Portal</div>
                    </div>
                    <div className="mt-5 pt-5 d-flex flex-column justify-content-center">
                        <div
                            className="login-title">{stage == 0 ? "Log in to your account" : "Enter PIN sent to you via SMS"}</div>
                        {props.loginError &&
                        (<div className="text-center text-red-500">{props.loginError}</div>)}
                    </div>
                    <div className={"login-form " + (stage == 1 ? "pt-2" : "")}>
                        <div>
                            {/* Email */}
                            {stage == 0 && (<TextInput
                                type="text"
                                value={formData.email}
                                placeholder="name@company.com"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label"
                                label="E-mail address"
                                name="email"
                                errorMsg={formData.emailError}
                            />)}

                            {/* Password */}
                            {stage == 0 && (<TextInput
                                type="password"
                                value={formData.password}
                                placeholder="your password"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label mt-4"
                                label="Password"
                                name="password"
                                errorMsg={formData.passwordError}
                            />)}

                            {/* OTP Pin */}
                            {stage == 1 && (<TextInput
                                type="password"
                                value={formData.otp}
                                placeholder="enter otp"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label mt-4"
                                label="OTP PIN"
                                name="otp"
                                errorMsg={formData.otpError}
                            />)}

                            {/* Submit Button */}
                            <PrimaryButton
                                additionalClasses="mt-4 login-button"
                                onClick={() => {
                                    submit();
                                }}
                            >
                                {/*<SmallSpinner show={props.loading}/>*/}
                                {stage == 0 ? "Continue" : "Login"}
                            </PrimaryButton>

                            {/* Additional links. */}
                            {stage == 0 &&
                            (<div className="w-full flex justify-center mt-4 text-lavender-500">
                                <Link href="/user/password/forgot">
                                    <a className="text-xs text-lavender-500">
                                        Forgot password?
                                    </a>
                                </Link>
                            </div>)}

                            {stage == 1 && !canResend &&
                            (<div className="w-full flex justify-center mt-4 text-gray-500">
                                <div className="text-xs">You can resend SMS in <span
                                    className="text-sm font-medium">00:{timeLeft}</span></div>
                            </div>)}

                            {stage == 1 && canResend &&
                            (<div className="w-full flex justify-center mt-4 text-gray-500">
                                <div className="text-xs">Did not receive SMS? {' '}
                                    <Link href="/user/login">
                                        <a className="text-xs text-lavender-500">
                                            Resend
                                        </a>
                                    </Link>
                                </div>
                            </div>)}

                            {stage == 1 &&
                            (<div className="w-full flex justify-center mt-4 text-lavender-500">
                                <a style={{cursor: "pointer"}} onClick={() => {
                                    setStage(0);
                                    setCanResend(false)
                                }} className="text-xs text-lavender-500">
                                    Go back
                                </a>
                            </div>)}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

// Map redux states to local component props.
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError,
    loading: state.auth.loginLoading,
});

// Define PropTypes.
Login.propTypes = {
    props: PropTypes.object,
    login: PropTypes.func,
};

export default connect(mapStateToProps, {login})(Login);
