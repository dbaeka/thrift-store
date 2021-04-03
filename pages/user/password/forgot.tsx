import React, {useState} from "react";
import {TextInput} from "@/components/Form/FormElement";
import {PrimaryButton} from "@/components/Button/Button";
import {connect} from "react-redux";
import {forgotPassword} from "@/store/auth/authActions";
import {Alert} from "@/components/Alert/Alert";
import {UserValidator} from "@/services/UserValidator";

function ForgotPassword(props: any) {
    const [formData, setFormData] = useState({
        password: "",
        rePassword: "",
        secretAnswer: "",
        passwordError: "",
        rePasswordError: "",
        secretAnswerError: "",
        notificationAlert: {
            type: "",
            msg: "",
        },
    });

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const submit = async () => {
        const userValidator = new UserValidator();
        // const res = await props.forgotPassword(formData.password);
        // if (res.error) {
        //     setFormData({
        //         ...formData,
        //         notificationAlert: {
        //             type: "danger",
        //             msg: res.error,
        //         },
        //     });
        // } else if (res.success) {
        //     setFormData({
        //         ...formData,
        //         notificationAlert: {
        //             type: "success",
        //             msg: res.success,
        //         },
        //     });
        // }
        // console.log(res);
    };
    return (
        <div className="w-screen h-screen relative">
            <div className="w-full">
                <div className="d-flex flex-column justify-center items-center"
                >
                    <>
                        <div
                            className="login-title mt-5">Reset password
                        </div>
                        {/* Alert message. */}
                        {formData.notificationAlert.type && (
                            <Alert type={formData.notificationAlert.type}>
                                {formData.notificationAlert.msg}
                            </Alert>
                        )}
                        <form className="login-form pt-4">
                            <TextInput
                                type="text"
                                value={formData.secretAnswer}
                                placeholder="secret answer"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label"
                                label="What is the name of your dog?"
                                name="secretAnswer"
                                errorMsg={formData.secretAnswerError}
                            />
                            {/* New Password */}
                            <TextInput
                                type="password"
                                value={formData.password}
                                placeholder="new password"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label mt-4"
                                label="New Password"
                                name="password"
                                errorMsg={formData.passwordError}
                            />
                            {/* Confirm Password */}
                            <TextInput
                                type="password"
                                value={formData.rePassword}
                                placeholder="retype password"
                                onChange={(e) => {
                                    handleInputChange(e);
                                }}
                                labelClasses="login-form-label mt-4"
                                label="Confirm Password"
                                name="rePassword"
                                errorMsg={formData.rePasswordError}
                            />

                            {/* Submit Button */}
                            <PrimaryButton
                                additionalClasses="mt-4 login-button"
                                onClick={() => {
                                    submit().then(() => "");
                                }}
                            >
                                Reset password
                            </PrimaryButton>
                        </form>
                    </>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {forgotPassword})(ForgotPassword);
