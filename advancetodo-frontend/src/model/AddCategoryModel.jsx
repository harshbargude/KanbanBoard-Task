import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function AddCategoryModel({ isOpen, onClose, onCategoryAdded }) {
    // console.log(props)

    const navigate = useNavigate();
    const [name, setName] = useState("");
    // console.log(name);
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");

    if (!isOpen) return null;

    async function onsubmit(e) {
        if (!name) {
            alert("Please add a category name before saving.");
            return;
        }
        let cat = name;
        // console.log(name);

        e.preventDefault();
        try {
            const newCategory = {
                name,
                description,
                color
            }

            await api.post("/category/create", newCategory)
            onCategoryAdded()
            setName("")
            setDescription("")
            setColor("");
            onClose();
            navigate("/")
        } catch (error) {
            console.error("Error creating category:", error);
        }
    }
    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[100]">
                <div className="bg-white rounded h-[90vh] w-full max-w-md md:h-auto md:max-w-lg  shadow-xl animate-in slide-in-from-bottom duration-300 ">
                    <div className="border-b-2 p-6 border-gray-200 add-task-header p-2 flex justify-between align-middle items-center">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-black"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-xl">Add New Category</h2>
                        <button
                            onClick={onsubmit}
                            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xl font-semibold p-[0.2rem] pr-[1rem] pl-[1rem] rounded"
                        >
                            Save
                        </button>
                    </div>
                    <form className="">
                        <div className="space-y-2 mt-[2rem] p-6">
                            <input
                                autoFocus
                                className="w-full text-4xl font-semibold placeholder:text-gray-300 focus:outline-none border-none"
                                placeholder="Category name?"
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                name="name"
                            />
                            <input
                                placeholder="Add details or description..."
                                className="mt-2 text-2xl w-full text-gray-400 placeholder:text-gray-200 focus:outline-none border-none resize-none h-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <input type="color" name="color" onChange={(e)=>setColor(e.target.value)} />
                        </div>
                        
                        
                    </form>
                    {/* <div className="border-t-2 border-gray-300 p-6">Add New Category</div> */}
                </div>
            </div>
        </>
    );
}
