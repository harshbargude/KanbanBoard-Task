import { Children } from "react";
import SearchBar from "../src/components/SearchBar";
import SidebarNav from "../src/components/SidebarNav";
import UserActions from "../src/components/UserActions";
import MobileNav from "../src/components/MobileNav";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50 text-gray-900 w-full">
                <aside className="hidden md:flex w-64 flex-col shadow bg-blue-50 sticky top-0 h-screen ">
                    <SidebarNav />
                </aside>

                <div className="flex-1 flex flex-col min-w-0 h-full">
                    {/* <header className="h-16 border-b-gray-50 bg-white shadow-sm px-8 flex items-center justify-between">
                        <SearchBar />
                        <UserActions />
                    </header> */}

                    <div className="p-4 md:p-8 pb-24 md:pb-8 ">
                        {<Outlet />}
                    </div>
                </div>

                <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow flex  justify-evenly items-center">
                    <MobileNav />
                </nav>
            </div>
        </>
    )
}