import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import AddCategoryModel from "./AddCategoryModel";

export default function AddTodoModel({ isOpen, onClose, onTaskAdded }) {
    // console.log(props)

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [dueDate, setDueDate] = useState("")

    const [allCategories, setAllCategories] = useState([]);
    // console.log(allCategories);
    const [isCategoryModelOpen, setIsCategoryModelOpen] = useState(false);

    async function getAllCategories() {
        try {
            const res = await api.get("/category/get-all")
            setAllCategories(res.data)
        } catch (error) {
            console.error("Fetch failed:", error.response?.data || error.message);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const categoryOptions = allCategories.map(cat => {
        return (
            <option key={cat.name} value={cat.name}>
                {cat.name}
            </option>
        )
    })

    if (!isOpen) return null;

    async function onsubmit(e) {
        if (!category) {
            alert("Please select a category before saving.");
            return;
        }
        let cat = category;
        // console.log(category);

        e.preventDefault();
        try {
            const newTask = {
                title,
                description,
                categoryName: category,
                dueDate: dueDate ? `${dueDate}` : new Date().toISOString(),
            }

            await api.post("/todos", newTask)
            onTaskAdded()

            setTitle("")
            setDescription("")
            setDueDate("");
            onClose();
        } catch (error) {
            console.error("Error creating todo:", error);
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
                        <h2 className="text-xl">New Task</h2>
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
                                placeholder="What needs to be done?"
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                            />
                            <textarea
                                placeholder="Add details or description..."
                                className="mt-2 text-2xl w-full text-gray-400 placeholder:text-gray-200 focus:outline-none border-none resize-none h-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex  items-center justify-between border-y border-gray-100 py-4 px-10">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M17 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M12 14H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M8 14H8.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M16 14H16.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <span className="text-xl text-gray-500">Due Date</span>
                            </label>

                            {/* Native DateTime Picker */}
                            <input
                                type="datetime-local"
                                className="text-sm text-gray-500 bg-transparent border-none outline-none focus:ring-0 cursor-pointer text-right"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="py-4 px-10 sm:block">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 8H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M7 12H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                    <path d="M7 16H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <span className="text-xl text-gray-500">Category</span>
                            </label>
                            <select
                                name="category"
                                value={category}
                                onChange={(e) => {
                                    // console.log("Selected:", e.target.value);
                                    setCategory(e.target.value);
                                }}
                                defaultValue="default"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white text-gray-700 font-medium transition-all duration-200">
                                <option
                                    value=""
                                    disabled="disabled">Select Category</option>
                                {categoryOptions}
                            </select>
                        </div>
                        <div className="p-6 text-center pt-0">

                        <button
                            onClick={onsubmit}
                            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white text-xl font-semibold p-[0.2rem] pr-[1rem] pl-[1rem] rounded"
                            >
                            Save
                        </button>
                            </div>
                    </form>
                    <div className="border-t-2 border-gray-300 p-6">
                        <div className=" p-4 pt-2">
                            <button type="button" onClick={() => setIsCategoryModelOpen(true)} className="p-4 bg-blue-300 rounded-2xl">+ Add New Category</button>
                        </div>


                        <AddCategoryModel
                            isOpen={isCategoryModelOpen}
                            onClose={() => setIsCategoryModelOpen(false)}
                            onCategoryAdded={getAllCategories}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
