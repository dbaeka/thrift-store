/*
|--------------------------------------------------------------------------
| A collection of navbar components.
|--------------------------------------------------------------------------
|
| Use any one you like. Once you decided for one, you might want to consider
| deleting the others to keep you javascript bundle size as small as possible.
|
*/

import Link from "next/link";
import Image from "next/image";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {AdminSidebarLayout} from "@/components/Layout/AdminLayout/Sidebar";

/**
 * The default navbar.
 */
export function AdminNavbar() {
    const [showSidebar, toggleSidebar] = useState(false);

    const toggleNavbar = () => {
        toggleSidebar(!showSidebar);
    };

    const sidebarOffset = `${
        showSidebar
            ? "right-0"
            : "-right-full md:-right-1/2 lg:-right-1/3 xl:-right-1/4"
    }`;
    return (
        <>
            <nav
                className="header-navbar navbar fixed-top font-gilroy">
                <div className="navbar-wrapper">
                    <div className="navbar-header bg-lilac-800">
                        <ul className="nav navbar-nav flex-row items-center">
                            <li className="nav-item mobile-menu d-md-none mr-auto">
                                <a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                    <i className="ft-menu font-large-1"></i></a>
                            </li>
                            <li className="nav-item">
                                <Link href="/dashboard">
                                    <a className="navbar-brand">
                                        <div className="h-6 w-6 rounded bg-lilac-400 d-inline-block"></div>
                                        <h6 className="brand-text d-inline-block align-middle ml-2">April Store</h6>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item d-md-none">
                                <a className="nav-link open-navbar-container"
                                   data-toggle="collapse" data-target="#navbar-mobile">
                                    <i className="la la-ellipsis-v"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <RightContentNav/>
                </div>
            </nav>

            {/*  Begin Sidebar  */}
            <AdminSidebarLayout showSidebar={true}/>
            {/*  End Sidebar  */}
        </>
    );
}


export function RightContentNav() {
    const [showSidebar, toggleSidebar] = useState(false);

    const [searchFocus, setSearchFocus] = useState(false);

    const toggleNavbar = () => {
        toggleSidebar(!showSidebar);
    };

    const sidebarOffset = `${showSidebar ? "right-0" : "-right-full"}`;

    return (
        <div className="navbar-container content">
            <div className="collapse navbar-collapse" id="navbar-mobile">
                <ul className="nav navbar-nav mr-auto float-left items-center">
                    <li className="nav-item d-none d-md-block"><a
                        className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                        <i className="fas fa-bars menu-icon text-gray-500 hover:text-gray-600 transition-colors duration-400 ease-in-out"></i></a>
                    </li>
                    <li className="nav-item nav-search ml-4">
                        <a className="nav-link nav-link-search d-inline-block ml-2" href="#">
                            <i className={"fas fa-search transition-colors duration-300 ease-in-out " + (searchFocus ? "text-gray-500" : "text-gray-400")}></i>
                        </a>
                        <div className="search-input d-inline-block">
                            <input onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)}
                                   className="ml-2 focus:outline-none" type="text" placeholder="Search here"/>
                        </div>
                    </li>
                </ul>
                <ul className="nav navbar-nav float-right items-center">
                    <li className="dropdown dropdown-notification nav-item">
                        <a className="nav-link nav-link-label pt-3" href="#" data-toggle="dropdown">
                            <i className="ticon-bell text-2xl"></i>
                            <span className="notification-badge">
                            </span>
                        </a>
                    </li>
                    <li className="dropdown dropdown-user avatar nav-item ml-3">
                        <a
                            className="dropdown-toggle nav-link dropdown-user-link py-0" href="#"
                            data-toggle="dropdown">
                            <img
                                src={require("../..//images/avatars/april.png")}
                                alt="avatar"
                                className="avatar-image align-middle d-inline-block"
                                width={30}
                                height={30}
                            />
                            <span className="ml-2 user-name">April Nutakor</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
