import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { navLinks } from '../util/Navigation';
import klee from '../img/klee_icon.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export class Navbar extends Component {
    render() {
        return (
            <Disclosure as="nav" className="bg-blue-500 sticky top-0 z-50">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center flex-shrink-0">
                                        <img src={klee} alt='logo' className='h-14' />
                                        <Link to="/" className='text-white font-bold'>Wibu Corner</Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navLinks.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="a"
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                                                        'block rounded-md px-3 py-2 text-base font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="relative rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Xem thông báo</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    {this.props.authenticated ? (<img className="h-8 w-8 rounded-full" src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} /> ):(<img className="h-8 w-8 rounded-full" src={klee} alt='no_user' />)}
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
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {this.props.authenticated ? (
                                                        // KHI ĐĂNG NHẬP
                                                        <Menu.Item as="div">
                                                            <div className="block px-4 py-2 text-sm text-black hover:bg-blue-500 hover:text-white">
                                                                <Link to={"/profile"} className="block px-4 py-2 text-sm">
                                                                    {this.props.currentUser.name}
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
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-blue-800 p-2 text-blue-400 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
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
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navLinks.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-blue-900 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-blue-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                    {this.props.authenticated ? (<img className="h-8 w-8 rounded-full" src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} /> ):(<img className="h-8 w-8 rounded-full" src={klee} alt='no_user' />)}
                                    </div>
                                    {this.props.authenticated ? (
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{this.props.currentUser.name}</div>
                                        <div className="text-sm font-medium leading-none text-blue-400">{this.props.currentUser.email}</div>
                                    </div>):(
                                        <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">Username</div>
                                        <div className="text-sm font-medium leading-none text-blue-400">Email</div>
                                    </div>
                                    )}
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {this.props.authenticated ? (
                                        // KHI ĐĂNG NHẬP
                                        <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                                            <Disclosure.Button as="a" href='/profile' className="text-gray-300 hover:bg-blue-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                                    {this.props.currentUser.name}
                                            </Disclosure.Button>
                                            <Disclosure.Button as="a"  onClick={this.props.onLogout} href='/' className="text-gray-300 hover:bg-blue-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                                Đăng xuất
                                            </Disclosure.Button>
                                        </div>
                                    ) : (
                                        // KHI CHƯA ĐĂNG NHẬP
                                        <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                                            <Disclosure.Button as="a" href='/login' className="text-gray-300 hover:bg-blue-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                                    Đăng nhập
                                            </Disclosure.Button>
                                            <Disclosure.Button as="a" href='/signup' className="text-gray-300 hover:bg-blue-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
                                                    Đăng ký
                                            </Disclosure.Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        )
    }
}

export default Navbar