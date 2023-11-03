import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import AuthService from "./services/auth.service";
import klee from '../assests/klee_icon.png';
import Routes from '../router/Routes';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            // console.log(user);
            setShowModeratorBoard(user.role.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.role.includes("ROLE_ADMIN"));
        }
    }, []);

   

    const logOut = () => {
        AuthService.logout();
    };


    return (
        <Router>
            <div className="sticky top-0 min-h-full">
                <Disclosure as="nav" className="bg-red-600">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        {/* LOGO */}
                                        <div className="flex-shrink-0">
                                            <Link to={"/home"} >
                                                <img
                                                    className="h-16 w-16"
                                                    src={klee}
                                                    alt="Your Company"
                                                /></Link>
                                        </div>
                                        {/* ẨN KHI Ở MOBILE */}
                                        <div className="hidden md:block">

                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {/* CHUNG */}
                                                <div>
                                                    <Link to={"/home"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        Trang chủ
                                                    </Link>
                                                </div>
                                                {/* PHÂN QUYỀN */}
                                                {/* MODERATOR */}
                                                {showModeratorBoard && (
                                                    <div>
                                                        <Link to={"/mod"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            Moderator Menu
                                                        </Link>
                                                    </div>
                                                )}
                                                {/* ADMIN */}
                                                {showAdminBoard && (
                                                    <div>
                                                        <Link to={"/admin"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            Admin Menu
                                                        </Link>
                                                    </div>
                                                )}
                                                {/* USER */}
                                                {currentUser && (
                                                    <div>
                                                        <Link to={"/user"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            User Menu
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {/* ẨN KHI Ở MOBILE */}
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* THÔNG BÁO */}
                                            <button
                                                type="button"
                                                className="relative rounded-full bg-red-600 p-1 text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* MENU MỞ XUỐNG */}
                                            <Menu as="div" className="relative ml-3">
                                                {/* ẢNH NGƯỜI DÙNG */}
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src={klee} />
                                                        {/* {currentUser ? ( <img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src={currentUser.username}/> ):(<img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src={currentUser.username}/>)} */}
                                                    </Menu.Button>
                                                </div>
                                                {/* MENU NGƯỜI DÙNG */}
                                                <Menu.Items as="div" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {currentUser ? (
                                                        // KHI ĐĂNG NHẬP
                                                        <Menu.Item as="div">
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                                <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                                    {currentUser.username}
                                                                </Link>
                                                            </div>
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                                <a href="/login" className="block px-4 py-2 text-sm" onClick={logOut}>
                                                                    LogOut
                                                                </a>
                                                            </div>
                                                        </Menu.Item>
                                                    ) : (
                                                        // KHI CHƯA ĐĂNG NHẬP
                                                        <Menu.Item as="div">
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                                <Link to={"/login"} className="block px-4 py-2 text-sm">
                                                                    Login
                                                                </Link>
                                                            </div>

                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                                <Link to={"/register"} className="block px-4 py-2 text-sm">
                                                                    Sign Up
                                                                </Link>
                                                            </div>
                                                        </Menu.Item>
                                                    )}
                                                </Menu.Items>
                                            </Menu>
                                        </div>
                                    </div>
                                    {/* ẨN KHI Ở MÀN RỘNG */}
                                    <div className="-mr-2 flex md:hidden">
                                        {/* NÚT BẤM KHI Ở DẠNG MOBILE */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-red-600 p-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-600">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                {/* PHẦN NAV TÙY CHỌN */}
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {/* CHUNG */}
                                            <div>
                                                <Link to={"/home"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                    Trang chủ
                                                </Link>
                                            </div>
                                            {/* MODERATOR */}
                                            {showModeratorBoard && (
                                                <div>
                                                    <Link to={"/mod"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        Moderator Menu
                                                    </Link>
                                                </div>
                                            )}
                                            {/* ADMIN MENU */}
                                            {showAdminBoard && (
                                                <div>
                                                    <Link to={"/admin"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        Admin Menu
                                                    </Link>
                                                </div>
                                            )}
                                            {/* USER MENU */}
                                            {currentUser && (
                                                <div>
                                                    <Link to={"/user"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        User Menu
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/* NÚT THÔNG BÁO */}
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-red-600 p-1 text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                        {/* MENU MỞ XUỐNG */}
                                        <Menu as="div" className="relative ml-3">
                                            <Menu.Items as="div" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {currentUser ? (
                                                    // KHI ĐĂNG NHẬP
                                                    <Menu.Item as="div">
                                                        <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                            <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                                {currentUser.username}
                                                            </Link>
                                                        </div>
                                                        <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                            <a href="/login" className="block px-4 py-2 text-sm" onClick={logOut}>
                                                                LogOut
                                                            </a>
                                                        </div>
                                                    </Menu.Item>
                                                ) : (
                                                    // KHI CHƯA ĐĂNG NHẬP
                                                    <Menu.Item as="div">
                                                        <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                            <Link to={"/login"} className="block px-4 py-2 text-sm">
                                                                Login
                                                            </Link>
                                                        </div>

                                                        <div className="block px-4 py-2 text-sm text-black hover:bg-red-500 hover:text-white">
                                                            <Link to={"/register"} className="block px-4 py-2 text-sm">
                                                                Sign Up
                                                            </Link>
                                                        </div>
                                                    </Menu.Item>
                                                )}
                                            </Menu.Items>
                                        </Menu>
                                    </div>
                                </div>
                                {/* PHẦN NGƯỜI DÙNG */}
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        {/* ẢNH USER */}
                                        <div className="flex flex-nowrap">
                                            {currentUser ? (
                                            <>
                                            <div><img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src={currentUser.img}/></div>
                                            <div className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">{currentUser.username}</div>
                                            </>) : (<img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src={klee} />)}
                                        </div>
                                        {/* NÚT THÔNG BÁO */}
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    {/* CÁC NÚT KHI ẤN VÀO ẢNH NGƯỜI DÙNG */}
                                    <Menu as="div" className="relative ml-3">
                                        <div className="mt-3 space-y-1 px-2">
                                            {/* MODERATOR */}
                                            {showModeratorBoard && (
                                                <div>
                                                    <Link to={"/mod"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        Moderator Menu
                                                    </Link>
                                                </div>
                                            )}
                                            {/* ADMIN */}
                                            {showAdminBoard && (
                                                <div>
                                                    <Link to={"/admin"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        Admin Menu
                                                    </Link>
                                                </div>
                                            )}
                                            {/* USER */}
                                            {currentUser && (
                                                <div>
                                                    <Link to={"/user"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                        User Menu
                                                    </Link>
                                                </div>
                                            )}
                                            {currentUser ? (
                                                // KHI ĐĂNG NHẬP
                                                <Menu.Item as="div" className="space-y-1">
                                                    <div >
                                                        <Link to={"/profile"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            {currentUser.username}
                                                        </Link>
                                                    </div>
                                                    <div >
                                                        <a href="/login" onClick={logOut} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            LogOut
                                                        </a>
                                                    </div>
                                                </Menu.Item>
                                            ) : (
                                                // KHI CHƯA ĐĂNG NHẬP
                                                <Menu.Item as="div"  className="space-y-1">
                                                    <div >
                                                        <Link to={"/login"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            Login
                                                        </Link>
                                                    </div>

                                                    <div >
                                                        <Link to={"/register"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                            Sign Up
                                                        </Link>
                                                    </div>
                                                </Menu.Item>
                                            )}
                                        </div>
                                    </Menu>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                {/* PHẦN THÔNG TIN */}
                <main>
                    <div className="mt-3 space-y-1 px-2">
                        <Routes />
                    </div>
                </main>
            </div>
        </Router>
    )
}