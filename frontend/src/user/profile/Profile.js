import React, { Component } from 'react'

export class Profile extends Component {
    render() {
        return (
            // component 
            <div className="h-full bg-gray-200 p-8">
                <div className="bg-white rounded-lg shadow-xl pb-8">
                    <div className="w-full h-[250px]">
                        <img src="https://th.bing.com/th/id/R.fc186881876915d7008f4add90bed2e4?rik=Wwk56jGsa4rHwg&riu=http%3a%2f%2fwallpaperswide.com%2fdownload%2fwindows_11_abstract_folded-wallpaper-2304x720.jpg&ehk=ZriQ6sdReLxlyXnfqK5Jf85XceHBknRAuEpB6zfxBIs%3d&risl=&pid=ImgRaw&r=0" className="w-full h-full rounded-tl-lg rounded-tr-lg" alt='bg' />
                    </div>
                    {/* Informations */}
                    <div className="flex flex-col items-center -mt-20">
                        {
                            this.props.currentUser.imageUrl ? (
                                <img src={this.props.currentUser.imageUrl} alt={this.props.currentUser.name} className="w-40 border-4 border-white rounded-full" />
                            ) : (
                                <div className="flex items-center space-x-2 mt-2">
                                    <p className="text-2xl">{this.props.currentUser.name && this.props.currentUser.name[0]}</p>
                                    <span className="bg-blue-500 rounded-full p-1" title="Verified">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </span>
                                </div>
                            )
                        }
                        <p className="text-gray-700 font-bold text-3xl font-sans subpixel-antialiased uppercase pt-4">{this.props.currentUser.name}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                        {/* SOCIAL */}
                        <div className="flex items-center space-x-4 mt-2">
                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 1000 1000"
                                >
                                    <rect width="100%" height="100%" fill='transparent'></rect>
                                    <path
                                        style={{ isCustomFont: "none", fontFileUrl: "none" }}
                                        fill="#FFF"
                                        d="M200-200h57l391-391-57-57-391 391v57zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120zm640-584l-56-56 56 56zm-141 85l-28-29 57 57-29-28z"
                                        transform="translate(499.99 499.99) scale(1.2626) translate(-480 480)"
                                        vectorEffect="non-scaling-stroke"
                                    ></path>
                                </svg>
                                <span>Chỉnh sửa</span>
                            </button>
                            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 1000 1000"
                                >
                                    <rect width="100%" height="100%" fill='transparent' ></rect>
                                    <path
                                        style={{ isCustomFont: "none", fontFileUrl: "none" }}
                                        fill="#FFF"
                                        strokeWidth="0"
                                        d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12zM241-600l66-66-17-94h-89q5 41 14 81t26 79zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67zM241-600zm358 358z"
                                        transform="translate(499.49 499.49) scale(1.2626) translate(-480 480)"
                                        vectorEffect="non-scaling-stroke"
                                    ></path>
                                </svg>
                                <span>Liên lạc</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
                    <div className="w-full flex flex-col 2xl:w-1/3">
                        {/* PERSONAL INFO */}
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
                            <ul className="mt-2 text-gray-700">
                                <li className="flex border-y py-2">
                                    <span className="font-bold w-24">Full name:</span>
                                    <span className="text-gray-700">{this.props.currentUser.name}</span>
                                </li>
                                <li className="flex border-b py-2">
                                    <span className="font-bold w-24">Email:</span>
                                    <span className="text-gray-700">{this.props.currentUser.email}</span>
                                </li>
                            </ul>
                        </div>
                        {/* ACTIVITY LOG */}
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
                            <div className="relative px-4">
                                <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

                                {/* start::Timeline item  */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">Profile informations changed.</p>
                                        <p className="text-xs text-gray-500">3 min ago</p>
                                    </div>
                                </div>
                                {/* // end::Timeline item  */}

                                {/* // start::Timeline item  */}
                                <div className="flex items-center w-full my-6 -ml-1.5">
                                    <div className="w-1/12 z-10">
                                        <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-11/12">
                                        <p className="text-sm">
                                            Message received from <b className="text-blue-600 font-bold">Jane Stillman</b>.</p>
                                        <p className="text-xs text-gray-500">2 hours ago</p>
                                    </div>
                                </div>
                                {/* // end::Timeline item  */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full 2xl:w-2/3">
                        {/* ABOUT */}
                        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                            <h4 className="text-xl text-gray-900 font-bold">About</h4>
                            <p className="mt-2 text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates obcaecati numquam error et ut fugiat asperiores. Sunt nulla ad incidunt laboriosam, laudantium est unde natus cum numquam, neque facere. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, magni odio magnam commodi sunt ipsum eum! Voluptas eveniet aperiam at maxime, iste id dicta autem odio laudantium eligendi commodi distinctio!</p>
                        </div>
                        {/* STATISTICS */}
                        <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                            <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                                {/* TOTAL */}
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-indigo-600">Total Revenue</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">$8,141</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">3%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* NEW ORDERS */}
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-green-600">New Orders</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">217</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">5%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* NEW CONNECTIONS */}
                                <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-sm text-blue-600">New Connections</span>
                                        <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">7 days</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-6">
                                        <div>
                                            <svg className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-end">
                                                <span className="text-2xl 2xl:text-3xl font-bold">54</span>
                                                <div className="flex items-center ml-2 mb-1">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                                    <span className="font-bold text-sm text-gray-500 ml-0.5">7%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile