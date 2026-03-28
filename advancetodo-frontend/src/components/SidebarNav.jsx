import { NavLink } from "react-router-dom";
import "../index.css";

// 1. IMPORT ALL INACTIVE (GRAY) IMAGES
import boardGray from "../assets/images/Container-b.png";
import analyticsGray from "../assets/images/Container-1.png";
import categoriesGray from "../assets/images/Container-2.png";
import settingsGray from "../assets/images/Container-3.png";

// 2. IMPORT ALL ACTIVE (BLUE) IMAGES
import boardBlue from "../assets/images/Container.png";
import analyticsBlue from "../assets/images/Container-1-b.png";
import categoriesBlue from "../assets/images/Container-2-b.png";
import settingsBlue from "../assets/images/Container-3-b.png";

import todoLogo from "../assets/images/todoLogo.svg";

export default function SidebarNav() {
    return (
        <div className="flex flex-col h-full">
            
            {/* --- LOGO SECTION --- */}
            <div className="h-16 flex items-center px-6 border-b border-transparent mb-4 mt-2">
                {/* Replace with your actual TaskFlow logo image if you have one */}
                <div className="w-8 h-8  rounded-md flex items-center justify-center text-white font-bold mr-3">
                    <img src={todoLogo} typeof="svg" alt="" sizes="" srcSet="" />
                </div>
                <span className="text-xl font-bold text-gray-900 handlee-regular">TaskFlow</span>
            </div>

            {/* --- NAVIGATION LINKS --- */}
            <nav className="flex flex-col gap-1 px-4">
                
                {/* BOARD */}
                <NavLink
                    to={"/"}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors nunito-regular text-sm ${
                            isActive 
                                ? "bg-blue-50 text-blue-600 font-semibold" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img 
                                className="w-5 h-5 object-contain nunito-regular" 
                                src={isActive ? boardBlue : boardGray} 
                                alt="Board" 
                            />
                            Board
                        </>
                    )}
                </NavLink>

                {/* ANALYTICS */}
                <NavLink
                    to={"/analytics"}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors nunito-regular text-sm nunito-regular ${
                            isActive 
                                ? "bg-blue-50 text-blue-600 font-semibold" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img 
                                className="w-5 h-5 object-contain nunito-regular" 
                                src={isActive ? analyticsBlue : analyticsGray} 
                                alt="Analytics" 
                            />
                            Analytics
                        </>
                    )}
                </NavLink>

                {/* CATEGORIES */}
                <NavLink
                    to={"/categories"}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm nunito-regular ${
                            isActive 
                                ? "bg-blue-50 text-blue-600 font-semibold" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img 
                                className="w-5 h-5 object-contain" 
                                src={isActive ? categoriesBlue : categoriesGray} 
                                alt="Categories" 
                            />
                            Categories
                        </>
                    )}
                </NavLink>

                {/* Trash */}
                <NavLink
                    to={"/trash"}
                    className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm nunito-regular ${
                            isActive 
                                ? "bg-blue-50 text-blue-600 font-semibold" 
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img 
                                className="w-5 h-5 object-contain" 
                                src={isActive ? settingsBlue : settingsGray} 
                                alt="Trash" 
                            />
                            Trash
                        </>
                    )}
                </NavLink>

            </nav>
        </div>
    );
}