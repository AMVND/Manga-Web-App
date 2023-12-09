import React from 'react'
import ThemeSwitcher from './ThemeSwitcher'

export const SearchBar = () => {
    return (
        <>
            <div className="relative flex flex-row justify-center overflow-hidden">
                <div className="relative flex flex-row space-x-4 px-6 sm:mx-auto sm:px-0">
                    <div className="mx-auto max-w-md">
                        <form action="" className="relative mx-auto w-max">
                            <input
                                type="search"
                                className="peer cursor-pointer relative z-10 h-8 w-8 rounded-full bg-transparent border pl-12 outline-none 
                                 focus:w-full focus:border-blue-300 focus:pl-16 focus:pr-4 text-white"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-white px-3.5 dark:stroke-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </form>
                    </div>
                    <ThemeSwitcher />
                </div>
            </div>
        </>
    )
}
