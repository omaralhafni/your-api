import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex content-center items-center justify-center h-screen">
            <div className="w-full lg:w-7/12 text-[#1d92fa]">
                <h1 className="text-[120px] text-center "> 404</h1>
                <h1 className="text-[40px] text-center italic text-slate-500">
                    Oooops....
                    <br />
                    <small> page not found</small>
                    <br />
                    <Link to="auth/login" className="underline underline-offset-1 text-[24px] text-center italic text-[#1d92fa]"> go home </Link>
                </h1>
            </div>
        </div>
    )
}

export default NotFound;