import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import "../index.css"
import api from "../api/axiosConfig.js"
import { useEffect, useState } from "react";
import EditTaskModel from "../model/EditTaskModel.jsx";

import editIMG from "../assets/images/icons8-edit-90.png";
import deleteIMG from "../assets/images/icons8-delete-100.png"


export default function TaskDetails() {
    const location = useLocation();
    const { id } = useParams()
    const todoData = location.state?.todo;
    // console.log(todoData);

    const [isEditModelOpen, setIsEditModelOpen] = useState(false);

    const navigate = useNavigate();

    async function Delete() {
        if (!window.confirm('Are you sure you want to delete this Task?')) {
            return;
        }
        // console.log("delete");
        
        try {
            const res = await api.delete(`/todos/delete?id=${id}`, {
                method: 'DELETE',
            })

            if (res.ok) {
                alert('Category deleted successfully');
            }
            navigate("/")
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Error deleting category');
        }
    }

    return (
        <div className="w-full">
            <NavLink to="/" className="text-blue-500 mb-4 inline-block">← Back to Board</NavLink>
            <div className="flex flex-row">
                <div className="w-full">
                    <div className="flex justify-between p-4 border-b-2 border-gray-300">
                        <h1 className="text-2xl font-bold nunito-regular">Task details</h1>
                        <div className="flex gap-2">

                            <button onClick={() => setIsEditModelOpen(true)} className="bg-[#ddf4fa] flex border-1 border-blue-100 shadow px-4 rounded-xl py-0.5 nunito-regular items-center"><img className="h-5 " src={editIMG} alt="" /> Edit</button>

                            <EditTaskModel
                                isOpen={isEditModelOpen}
                                onClose={() => setIsEditModelOpen(false)}
                                todo={todoData} 
                            />

                            <button onClick={() => Delete()} className="bg-red-400 border-1  border-gray-100 shadow px-4 rounded-xl py-0.5 nunito-regular flex items-center"><img className="h-5" src={deleteIMG} alt="" />Delete</button>
                        </div>
                    </div>

                    {todoData ? (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <h2 className="text-xl font-semibold nunito-regular">Title: <span className=" handlee-regular text-xl">{todoData.title}</span></h2>
                            <p className="text-gray-600 mt-2 nunito-regular">description: <span className="handlee-regular text-sm">{todoData.description}</span></p>
                            <p className="mt-4 text-sm font-medium nunito-regular">Category: {todoData.categoryName}</p>
                        </div>
                    ) : (
                        <p className="mt-4 text-red-500">No data found. Please navigate from the board.</p>
                    )}
                </div>
            </div>
        </div>
    )
}