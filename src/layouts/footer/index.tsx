import React from 'react';
import ocp from "@/asset/ocp_pattern.png";

function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t bg-repeat" style={{backgroundImage: `url(${ocp})`, backgroundSize: '300px 300px'}} >
            <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Humphreys' Taxi Share. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <div className="text-xs hover:underline underline-offset-4" >
                    Privacy Policy
                </div>
                <div className="text-xs hover:underline underline-offset-4" >
                    Terms of Service
                </div>
            </nav>
        </footer>
    );
}

export default Footer;