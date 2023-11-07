import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import klee from '../img/klee_icon.png'

export class Navbar extends Component {
    render() {
        return (
            <Disclosure as="nav" className="bg-blue-500 sticky top-0">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    {/* LOGO */}
                                    <div className="flex items-center  justify-center flex-shrink-0">
                                    <img src={klee} alt='logo' className='h-14'/>  
                                    <Link to="/" className='text-white font-bold'>                                   
                                        Wibu Corner</Link>
                                    </div>
                                    {/* ẨN KHI Ở MOBILE */}
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {/* CHUNG */}
                                            <div>
                                                <Link to={"/"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                    Trang chủ
                                                </Link>
                                            </div>
                                            {/* PHÂN QUYỀN */}
                                        </div>
                                    </div>
                                </div>
                                {/* ẨN KHI Ở MOBILE */}
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/* THÔNG BÁO */}
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-blue-600 p-1 text-white hover:text-gray-600"
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
                                                    <img className="h-8 w-8 rounded-full bg-slate-200" alt="user_pic" src="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                {/* MENU NGƯỜI DÙNG */}
                                                <Menu.Items as="div" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {this.props.authenticated ? (
                                                        // KHI ĐĂNG NHẬP
                                                        <Menu.Item as="div">
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                                <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                                    Thông tin
                                                                </Link>
                                                            </div>
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                                <a className="block px-4 py-2 text-sm" onClick={this.props.onLogout} href='/'>Đăng xuất</a>
                                                            </div>
                                                        </Menu.Item>
                                                    ) : (
                                                        // KHI CHƯA ĐĂNG NHẬP
                                                        <Menu.Item as="div">
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                                <Link to={"/login"} className="block px-4 py-2 text-sm">
                                                                    Đăng nhập
                                                                </Link>
                                                            </div>

                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                                <Link to={"/signup"} className="block px-4 py-2 text-sm">
                                                                    Đăng ký
                                                                </Link>
                                                            </div>
                                                        </Menu.Item>
                                                    )}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                {/* ẨN KHI Ở MÀN RỘNG */}
                                <div className="-mr-2 flex md:hidden">
                                    {/* NÚT BẤM KHI Ở DẠNG MOBILE */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-blue-600 p-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600">
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
                                        <Disclosure.Button>
                                            <Link to={"/"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                Trang chủ
                                            </Link>
                                        </Disclosure.Button>
                                        {/* PHÂN QUYỀN */}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    {/* NÚT THÔNG BÁO */}
                                    <Disclosure.Button
                                        type="button"
                                        className="relative rounded-full bg-blue-600 p-1 text-white hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Xem thông báo</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </Disclosure.Button>
                                    {/* MENU MỞ XUỐNG */}
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu as="div" className="relative ml-3">
                                            <Menu.Items as="div" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {this.props.authenticated ? (
                                                    // KHI ĐĂNG NHẬP
                                                    <Menu.Item as="div">
                                                        <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                            <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                                Thông tin
                                                            </Link>
                                                        </Disclosure.Button>
                                                        <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                            <a className="block px-4 py-2 text-sm" onClick={this.props.onLogout} href='/'>Đăng xuất</a>
                                                        </Disclosure.Button>
                                                    </Menu.Item>
                                                ) : (
                                                    // KHI CHƯA ĐĂNG NHẬP
                                                    <Menu.Item as="div">
                                                        <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                            <Link to={"/login"} className="block px-4 py-2 text-sm">
                                                                Đăng nhập
                                                            </Link>
                                                        </Disclosure.Button>
                                                        <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                            <Link to={"/signup"} className="block px-4 py-2 text-sm">
                                                                Đăng ký
                                                            </Link>
                                                        </Disclosure.Button>
                                                    </Menu.Item>
                                                )}
                                            </Menu.Items>
                                        </Menu>
                                    </Transition>
                                </div>
                            </div>
                            {/* PHẦN NGƯỜI DÙNG */}
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    {/* ẢNH USER */}
                                    <div className="flex flex-nowrap">
                                    </div>
                                    {/* NÚT THÔNG BÁO */}
                                    <Disclosure.Button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-black hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Xem thông báo</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </Disclosure.Button>
                                </div>
                                {/* CÁC NÚT KHI ẤN VÀO ẢNH NGƯỜI DÙNG */}
                                <Menu as="div" className="relative ml-3">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {/* CHUNG */}
                                        <Disclosure.Button>
                                            <Link to={"/"} className="text-white hover:bg-white hover:text-black rounded-md px-3 py-2 text-sm font-medium">
                                                Trang chủ
                                            </Link>
                                        </Disclosure.Button>
                                        {/* PHÂN QUYỀN */}
                                        {this.props.authenticated ? (
                                            // KHI ĐĂNG NHẬP
                                            <Menu.Item as="div">
                                                <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                    <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                        Thông tin
                                                    </Link>
                                                </Disclosure.Button>
                                                <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                    <a className="block px-4 py-2 text-sm" onClick={this.props.onLogout} href='/'>Đăng xuất</a>
                                                </Disclosure.Button>
                                            </Menu.Item>
                                        ) : (
                                            // KHI CHƯA ĐĂNG NHẬP
                                            <Menu.Item as="div">
                                                <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                    <Link to={"/login"} className="block px-4 py-2 text-sm">
                                                        Đăng nhập
                                                    </Link>
                                                </Disclosure.Button>
                                                <Disclosure.Button className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                    <Link to={"/signup"} className="block px-4 py-2 text-sm">
                                                        Đăng ký
                                                    </Link>
                                                </Disclosure.Button>
                                            </Menu.Item>
                                        )}
                                    </div>
                                </Menu>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        )
    }
}

export default Navbar