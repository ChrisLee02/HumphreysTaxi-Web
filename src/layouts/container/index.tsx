import {SIGN_IN_PATH, SIGN_UP_PATH} from "@/constants";
import Footer from "@/layouts/footer";
import Header from "@/layouts/header";
import React from "react";
import {Outlet, useLocation} from "react-router-dom";

export default function Container() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow flex justify-center align-middle pt-[66px] pb-[90px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
