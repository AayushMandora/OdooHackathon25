import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../helpers/userApi";

export default function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [profile, setProfile] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isProfilePage, setIsProfilePage] = useState(false)
    const menuRef = useRef();

    // Close menu if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            // const fetchProfile = async () => {
            //     const response = await getProfile();
            //     setProfile(response.data);
            // }
            // fetchProfile();
        } else {
            setIsLoggedIn(false);
        }
        setIsProfilePage(window.location.pathname === "/profile");
    }, []);

    return (
        <header
            className="flex items-center justify-between px-6 py-4 border-2 rounded"
            style={{
                background: "#121212", // Jet Black
                borderColor: "#F8F8FF", // Snow White
                color: "#F8F8FF", // Snow White
                fontFamily: "'Indie Flower', cursive, sans-serif",
            }}
        >
            <div className="text-[1.2rem]">
                Skill Swap
            </div>
            <div className="flex items-center gap-6">
                {!isLoggedIn ? (
                    <Link to={'/login'}
                        className="px-6 py-1 border-2 border-gray-100 rounded-full bg-transparent text-[1.1rem] cursor-pointer text-gray-100"
                    >
                        Login
                    </Link>
                ) : (
                    <>
                        <Link to={'/swap-requests'}
                            className="underline text-[1.1rem] bg-transparent border-none cursor-pointer text-gray-100"
                        >
                            Swap request
                        </Link>
                        <Link to={'/'}
                            className="underline text-[1.1rem] bg-transparent border-none cursor-pointer text-gray-100"
                        >
                            Home
                        </Link>
                        <div className="relative" ref={menuRef}>
                            <button
                                className="w-10 h-10 rounded-lg overflow-hidden bg-gray-500 flex items-center justify-center"
                                onClick={() => setShowMenu((v) => !v)}
                            >
                                <img
                                    src={profile?.profileImage || "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1709146838/catalog/1598681187300978688/yykd1tqjshuppacb0fz0.webp"}
                                    alt="avatar"
                                    className="w-full h-full object-cover"
                                />
                            </button>
                            {showMenu && (
                                <div className="absolute right-0 mt-2 w-40 bg-neutral-800 border border-gray-200 rounded-lg shadow-lg z-50">
                                    <Link to={'/profile'}
                                        className="block w-full text-left px-4 py-2 hover:bg-neutral-700"
                                    >
                                        Go to Profile
                                    </Link>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-neutral-700 text-red-500"
                                        onClick={() => { setShowMenu(false); localStorage.removeItem("token"); window.location.href = "/login"; }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
} 