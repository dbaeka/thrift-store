import "tailwindcss/tailwind.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/app.scss";
import '../fonts/icons/thrift/style.css';
import React from "react";
import store from "@/store/store";
import {Provider} from "react-redux";
import PropTypes from "prop-types";
import {AuthGuard} from "@/services/Auth/AuthGuard";
import {useEffect} from "react";
import * as types from "@/store/actionTypes";
import TagManager from "react-gtm-module";
import {AdvancedFooter} from "@/components/Navigation/Footer";
import {useRouter} from "next/router";
import {protectedRoutes} from "../config/config";
import {AdminNavbar} from "@/components/Navigation/AdminNavbar";

require("./../config/config.tsx");


function MyApp(props: any) {
    // TODO Initialize Google Tag Manager via react-gtm-module.
    // if (process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) {
    //     const tagManagerArgs = {
    //         gtmId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    //     };
    //     if (process.browser) {
    //         TagManager.initialize(tagManagerArgs);
    //     }
    // }

    const router = useRouter();
    // Check if we're on a protected route.
    const isNoProtectedRoute = protectedRoutes.every((route) => {
        return !router.pathname.startsWith(route);
    });

    const isAdminRoute = router.pathname.startsWith('/dashboard');

    //TODO
    // Handle current user in redux.
    // useEffect(() => {
    //     // Store current user if we have one.
    //     if (props.user) {
    //         store.dispatch({
    //             type: types.USER_LOADED,
    //             payload: props.user,
    //         });
    //         return;
    //     }
    //     // Dispatch user loading error if no user is present.
    //     store.dispatch({
    //         type: types.USER_LOADED_ERROR,
    //     });
    // }, []);

    return (
        <Provider store={store}>
            {isAdminRoute && <AdminNavbar/>}
            <props.Component {...props.pageProps} />
            {/*{!isNoProtectedRoute && <AdvancedFooter/>}*/}
        </Provider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType,
    pageProps: PropTypes.object,
};

/**
 * Fetch some data server side before rendering the page client side.
 *
 * @param {object} context
 *   The context object.
 */
MyApp.getInitialProps = async ({ctx}) => {
    const req = ctx.req;
    const pathname = ctx.pathname;
    const res = ctx.res;

    /**
     * Abort if one var is not present.
     * For example, the req obj will be undefined if we don't
     * have a page reload but a page switch via the Next Router.
     */
    if (!req || !pathname || !res) {
        return {};
    }
//TODO
    return {}
    // const authenticator = new AuthGuard();
    // return await authenticator.authenticateUser(req, res, pathname);
};

export default MyApp;