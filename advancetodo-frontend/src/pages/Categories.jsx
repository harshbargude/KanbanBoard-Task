import { useEffect, useState } from "react"
import api from "../api/axiosConfig";
import AddCategoryModel from "../model/AddCategoryModel";
import deleteIMG from "../assets/images/icons8-delete-100.png";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);

    async function fetchCategories() {
        try {
            const res = await api.get("/category/get-all")
            setCategories(res.data);
            console.log("data:", res.data);

        } catch (error) {
            console.error("Fetch failed:", error.response?.data || error.message);
        }

    }

    async function deleteCategory(id) {
        if (!window.confirm('Are you sure you want to delete this Category?')) {
            return;
        }
        try {
            const res = await api.delete(`category/delete/${id}`)
            fetchCategories();
        } catch (error) {
            console.error("Failed to delete category!", error.response?.data || error.message);
        }

    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const CategoryEle = categories.map(cat => {
        const style = {
            background: cat.color,
        }
        return (
            <div key={cat.name} style={style} className="border-2 flex justify-between p-2 md:w-[15rem] bg-white rounded shadow m-1">
                <div className="flex w-full flex-col">
                    <div className="cat-name "><span className=" nunito-regular">Category Name:</span> {cat.name}</div>
                    <div className="cat-name"><span className=" nunito-regular">Description:</span> {cat.description}</div>
                    {/* <div className={`cat-name `}>Color: <span style={style}>{cat.color}</span></div> */}
                </div>
                <div className="flex items-end ">
                    <div className={`bg-gray-50 shadow-2xl p-0.5 rounded-2xl flex justify-center align-middle text-center`}>
                        <button onClick={() => deleteCategory(cat.id)}><img className="h-7" src={deleteIMG} alt="" /></button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div
         className="max-w-[1200px] m-auto">
            <div className="text-center flex align-items-center items-center justify-between p-4 pt-2">
                <h1 className="text-2xl font-extrabold">Category</h1>
                <button type="button" onClick={() => setIsModelOpen(true)} className="p-4 bg-blue-300 rounded-2xl">Add Category</button>
            </div>


            <AddCategoryModel
                isOpen={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                onCategoryAdded={() => fetchCategories()}
            />

            <div className="md:flex flex-wrap">
                {CategoryEle}
            </div>
        </div>

    )
}