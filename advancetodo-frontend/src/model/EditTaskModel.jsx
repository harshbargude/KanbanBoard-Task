import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditTaskModel({ isOpen, onClose, todo }) {

    const navigate = useNavigate();

    // 1. Initialize local state with the existing todo data
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (todo) {
            setTitle(todo.title || "");
            setDescription(todo.description || "");
            setStatus(todo.status || "TODO")
            if (todo.dueDate) {
                setDueDate(todo.dueDate.substring(0, 16));
            } else {
                setDueDate(new Date().toISOString().substring(0, 16));
            }
        }
    }, [todo]);

    if (!isOpen) return null;

    const handleUpdate = async (e) => {
        e.preventDefault();
        const finalDate = dueDate
            ? (dueDate.length === 16 ? `${dueDate}:00` : dueDate)
            : new Date().toISOString().substring(0, 19);

        // console.log(finalDate);

        try {
            const updatedTask = {
                ...todo, // Keep existing fields (like ID and status)
                title: title,
                description: description,
                dueDate: finalDate,
                status: status
            };
            // console.log(updatedTask)

            await api.patch("/todos/update", updatedTask);
            alert("Task updated successfully!");
            onClose();

            // Redirect back to the board so the user sees the updated data immediately
            navigate("/");
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task.");
        }
    };
    return (
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[100]">

                <div className="bg-white rounded h-[90vh] w-full max-w-md md:h-auto md:max-w-lg  shadow-xl animate-in slide-in-from-bottom p-2 duration-300 ">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h1 className="text-xl font-bold">Edit Task</h1>
                        <button className="text-gray-400 hover:text-black" onClick={onClose}>
                            Cancel ✕
                        </button>
                    </div>
                    <div>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-500 mb-1 block">Title</label>
                                <input
                                    className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 focus:outline-none"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-500 mb-1 block">Description</label>
                                <textarea
                                    className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-blue-500 focus:outline-none h-24 resize-none"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-500 font-bold text-sm mb-1" >Status</label>
                                <select name="status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full border-2 border-gray-100 rounded-lg p-2 focus:border-blue-400 focus:outline-none bg-gray-50 text-sm"
                                >
                                    <option value="TODO">TODO</option>
                                    <option value="IN_PROGRESS">IN PROGRESS</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-500 font-bold text-sm mb-1">DueDate</label>
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full border-2 border-gray-100 rounded-lg p-2 focus:border-blue-400 focus:outline-none bg-gray-50 text-sm"
                                />
                            </div>
                            <div className="pt-4 flex justify-end gap-2">
                                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-bold">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}