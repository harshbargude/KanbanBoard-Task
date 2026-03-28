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

export default function NavLinks() {
    return (
        // Spread the links out evenly across the bottom
        <section className="flex justify-around w-full px-2 pt-2 pb-1">
            
            {/* BOARD */}
            <NavLink
                to={"/"}
                className={({ isActive }) => 
                    `flex flex-col items-center justify-center min-w-[72px] p-2 rounded-lg transition-colors ${
                        isActive ? "text-blue-600" : "text-gray-500 hover:bg-gray-100"
                    }`
                }
            >
                {/* 3. Use the isActive boolean to swap the image src */}
                {({ isActive }) => (
                    <>
                        <img 
                            className="w-6 h-6 object-contain mb-1" 
                            src={isActive ? boardBlue : boardGray} 
                            alt="Board" 
                        />
                        <span className="text-[10px] font-medium nunito-regular">Board</span>
                    </>
                )}
            </NavLink>

            {/* ANALYTICS */}
            <NavLink
                to={"/analytics"}
                className={({ isActive }) => 
                    `flex flex-col items-center justify-center min-w-[72px] p-2 rounded-lg transition-colors ${
                        isActive ? " text-blue-600" : "text-gray-500 hover:bg-gray-100"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        <img 
                            className="w-6 h-6 object-contain mb-1" 
                            src={isActive ? analyticsBlue : analyticsGray} 
                            alt="Analytics" 
                        />
                        <span className="text-[10px] font-medium nunito-regular">Analytics</span>
                    </>
                )}
            </NavLink>

            {/* CATEGORIES */}
            <NavLink
                to={"/categories"}
                className={({ isActive }) => 
                    `flex flex-col items-center justify-center min-w-[72px] p-2 rounded-lg transition-colors ${
                        isActive ? " text-blue-600" : "text-gray-500 hover:bg-gray-100"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        <img 
                            className="w-6 h-6 object-contain mb-1" 
                            src={isActive ? categoriesBlue : categoriesGray} 
                            alt="Categories" 
                        />
                        <span className="text-[10px] font-medium nunito-regular">Categories</span>
                    </>
                )}
            </NavLink>

            {/* Trash */}
            <NavLink
                to={"/trash"}
                className={({ isActive }) => 
                    `flex flex-col items-center justify-center min-w-[72px] p-2 rounded-lg transition-colors ${
                        isActive ? " text-blue-600" : "text-gray-500 hover:bg-gray-100"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        <img 
                            className="w-6 h-6 object-contain mb-1" 
                            src={isActive ? settingsBlue : settingsGray} 
                            alt="Trash" 
                        />
                        <span className="text-[10px] font-medium nunito-regular">Trash</span>
                    </>
                )}
            </NavLink>

        </section>
    );
}