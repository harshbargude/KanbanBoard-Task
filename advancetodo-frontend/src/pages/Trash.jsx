import { useEffect, useState } from "react";
// Ensure this points to your configured Axios instance
import api from "../api/axiosConfig";

export default function Trash() {
    const [softDeletedTask, setSoftDeletedTask] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchSoftDeletedTasks() {
        try {
            const res = await api.get("/todos/get-all-deleted-todos");
            setSoftDeletedTask(res.data);
            setError(null);
        } catch (error) {
            console.error("Failed to fetch trash:", error);
            setError("Could not load deleted tasks. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSoftDeletedTasks();
    }, []);

    async function Restore(id) {
        if (!id) return;
        try {
            const res = await api.patch(`/todos/restore/${id}`);
            fetchSoftDeletedTasks();
        } catch (error) {
            console.error("Failed to restore task:", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Trash</h1>
                <span className="bg-slate-200 text-slate-700 py-1 px-3 rounded-full text-sm font-medium">
                    {softDeletedTask.length} Items
                </span>
            </div>

            {loading ? (
                <div className="text-center text-slate-500 py-10 animate-pulse">
                    Loading trash...
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                    {error}
                </div>
            ) : softDeletedTask.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 text-lg">Your trash is empty.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {softDeletedTask.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800 line-through decoration-slate-400">
                                    {todo.title}
                                </h3>
                                {todo.categoryName && (
                                    <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600 mt-2 inline-block">
                                        {todo.categoryName}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => Restore(todo.id)} className="text-sm px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors font-medium">
                                    Restore
                                </button>
                                <button className="text-sm px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors font-medium">
                                    Delete Forever
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}