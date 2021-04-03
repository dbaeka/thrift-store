/*
|--------------------------------------------------------------------------
| Email verification view.
|--------------------------------------------------------------------------
|
| The user will get the link to this view per mail. It includes userId, hash,
| expiration data and signature in the url, which will be sent to the api upon
| mount of the app. If the email verification was successful, the user will be
| redirected to the dashboard.
|
*/

import {useRouter} from "next/router";
import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {verifyEmail} from "@/store/auth/authActions";
import {TextInput} from "@/components/Form/FormElement";
import {PrimaryButton} from "@/components/Button/Button";
import {UserValidator} from "@/services/UserValidator";

function VerifyPassword(props: any) {
    const router = useRouter();
    const {expires, signature, userID, hash} = router.query;

    // State.
    const [state, setState] = useState({
        error: "",
        loaded: false
    })

    const [formData, setFormData] = useState({
        email: "",
        emailError: "",
    });

    //TODO
    // Send api request to api upon mount of the component.
    // @ts-ignore
    // useEffect(async () => {
    //     // const res = await props.verifyEmail(userID, hash, expires, signature);
    //
    //     // Successful verification.
    //     // if (res.success) {
    //     //     setState({
    //     //         ...state,
    //     //         loading: false,
    //     //         error: "",
    //     //     });
    //
    //         // Redirect to Home route of the user after 3 seconds.
    //         // setTimeout(() => {
    //         //     router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
    //         // }, 3000);
    //         // return;
    //     // }
    //
    //     // Set error message if verification failed.
    //     // if (res.error) {
    //     //     setState({
    //     //         ...state,
    //     //         loading: false,
    //     //         error: res.error,
    //     //     });
    //     // }
    // }, []);


    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value,
            emailError: "",
        });
    };

    /**
     * Submit the form.
     */
    const submit = () => {
        const userValidator = new UserValidator();
        const {email} = formData;

        // Check for valid email address.
        const isEmailValid = userValidator.validateEmail(email);
        if (!isEmailValid) {
            setFormData({
                ...formData,
                emailError: "Please provide a valid email address",
            });
            return;
        }
        setState({
            ...state,
            loaded: true
        });

        setTimeout(() => {
            router.push(process.env.NEXT_PUBLIC_USER_HOME_ROUTE);
        }, 3000);

        // Make API call if everything is fine.
        props.verifyEmail(userID, hash, expires, signature);
    };

    return (
        <div className="w-screen h-screen relative">
            <div
                className="w-full">
                <div
                    className="d-flex flex-column justify-center items-center"
                >
                    <>
                        {/* Header */}
                        <div className="login-title mt-5">
                            Verify e-mail address
                        </div>
                        <form className="login-form pt-4">
                            {/* Email */}
                            <TextInput
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
                            />
                            {/* Submit Button */}
                            <PrimaryButton
                                additionalClasses="mt-4 login-button"
                                onClick={() => {
                                    submit();
                                }}
                            >
                                Send e-mail
                            </PrimaryButton>
                            {state.loaded && !state.error && (
                                <div
                                    className="text-sm text-center mt-3 p-2 text-lavender-500 rounded bg-lavender-100">
                                    Check your mail for an e-mail to reset your password
                                </div>)}
                        </form>
                    </>
                </div>
            </div>
        </div>
    );
}

export default connect(null, {verifyEmail})(VerifyPassword);
