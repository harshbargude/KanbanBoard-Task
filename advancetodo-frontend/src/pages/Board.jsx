import { useCallback, useEffect, useRef, useState } from "react"
import api from "../api/axiosConfig";
import TaskCard from "../components/TaskCard";
import AddTodoModel from "../model/AddTodoModel";

import taskGif from "../assets/gif/icons8-task.gif"

export default function Board() {
    const [activeTab, setActiveTab] = useState("todo");
    const [todos, setTodo] = useState([]);
    const [isModelOpen, setIsModelOpen] = useState(false);
    // console.log(todos);

    const [dropIndicator, setDropIndicator] = useState({ status: null, index: null });
    const dragRef = useRef(null);

    const getTargetIndex = (e, columnElement, tasks) => {
        const cards = Array.from(columnElement.querySelectorAll('[data-task-card]'));
        let insertIndex = tasks.length;

        for (let i = 0; i < cards.length; i++) {
            const rect = cards[i].getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (e.clientY < midY) {
                insertIndex = i;
                break;
            }
        }
        return insertIndex;
    };

    const getTaskByStatus = useCallback(
        (status) => todos
            .filter(t => t.status === status)
            .sort((a, b) => a.position - b.position),
        [todos]
    )

    const fetchTodo = async () => {
        try {
            const response = await api.get('/todos');
            setTodo(response.data);
        } catch (error) {
            console.error("Fetch failed:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    // const todoTasksCount = todoTasks.length;
    // const inProgressTasksCount = inProgressTasks.length;
    // const doneTasksCount = doneTasks.length;

    const handleDragStart = (e, taskId, status, index) => {
        dragRef.current = { taskId, sourceStatus: status, sourceIndex: index }
        e.dataTransfer.effectAllowed = 'move';

    }
    const handleDragOver = (e, status) => {
        e.preventDefault();

        // 1. Calculate the index based on current mouse position
        const index = getTargetIndex(e, e.currentTarget, getTaskByStatus(status));

        // 2. Update state so the UI shows the blue line
        if (dropIndicator.status !== status || dropIndicator.index !== index) {
            setDropIndicator({ status, index });
        }
    };
    const handleDrop = async (targetStatus) => {
        const drag = dragRef.current;
        if (!drag) return;

        const targetIndex = dropIndicator.index;
        const { taskId } = drag;
        dragRef.current = null;
        setDropIndicator({ status: null, index: null });
        try {
            await api.put(`/todos/${taskId}/move`, {
                status: targetStatus,
                position: targetIndex
            });
            fetchTodo();
        } catch (err) {
            console.error("Failed to move task:", err);
            fetchTodo(); 
        }
    };

    const renderColumn = (status) => {
        const tasks = getTaskByStatus(status);
        return (
            <div className="flex flex-col gap-0">
                {tasks.map((todo, index) => (
                    <div key={`container-${todo.id}`}>
                        {dropIndicator.status === status && dropIndicator.index === index && (
                            <div className="h-1 bg-blue-500 rounded-full my-1 transition-all" />
                        )}
                        <TaskCard
                            index={index}
                            todo={todo}
                            onDragStart={handleDragStart}
                        />
                    </div>
                ))}
                {dropIndicator.status === status && dropIndicator.index === tasks.length && (
                    <div className="h-1 bg-blue-500 rounded-full mt-1" />
                )}
            </div>
        );
    };


    // add addTodo

    return (
        <>
            <section className=" lg:flex lg:justify-between">
                <div>
                    <h1 className=" nunito-regular font-bolder text-2xl text-center md:text-left ">Advance Todo App</h1>
                    <p className="text-gray-500 text-center">Manage your project phases and tracking workflow</p>
                </div>
                <div className="hidden md:flex gap-2 items-end">
                    {/* <button className="bg-blue-100 pl-2 pr-2 rounded-sm" type="button">Filter</button>
                    <button className="bg-blue-100 pl-2 pr-2 rounded-sm" type="button">Sort</button> */}
                    <button onClick={() => setIsModelOpen(true)} className="bg-blue-500 px-4 py-3 flex flex-row gap-1 text-gray-50 rounded-lg nunito-regular" type="button">
                        <img
                            src={taskGif}
                            alt="task logo"
                            className="w-6 h-6 rounded object-contain"
                        />New Task</button>
                </div>

                <div className="flex md:hidden gap-2 justify-center">
                    {/* <button className=" bg-[#b7edf96c] shadow border-4 border-[#fff] text-gray-700 px-3 py-1 font-bold text-lg  rounded-xl">Filter</button>
                    <button className=" bg-[#b7edf96c] shadow border-4 border-[#fff] text-gray-700 px-3 py-1 font-bold text-lg  rounded-xl"> Sort</button> */}
                </div>
            </section>

            <AddTodoModel
                isOpen={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                onTaskAdded={fetchTodo}
            />

            {/* add todo button for the mobile */}
            <button
                onClick={() => setIsModelOpen(true)} // We will replace this with modal state later
                className="md:hidden  fixed bottom-24 right-10 w-20 h-20 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center text-4xl  hover:bg-blue-600 hover:shadow-xl transition-all z-40"
            >
                +
            </button>

            {/* mobile */}
            <section className="bg-[#b7e3f9] border-4 transition-all duration-300 border-[#ffffff] shadow flex justify-between px-1 py-1 rounded-4xl mt-4 md:hidden ">
                <button
                    onClick={() => setActiveTab("todo")}
                    className={`bg-${activeTab === "todo" ? "white shadow w-full" : "none"} nunito-regular flex flex-nowrap whitespace-nowrap justify-center font-bold pl-5 pr-5 pt-2  pb-2  rounded-4xl   transition-all duration-300`}>
                    TODO
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("TODO").length}</span>
                </button>
                <div className="border-l-2 border-[#ffffff] mx-0.5">

                </div>
                <button
                    onClick={() => setActiveTab("inProgress")}
                    className={`bg-${activeTab === "inProgress" ? "white shadow w-full" : "none"} nunito-regular flex justify-center items-center  flex-nowrap whitespace-nowrap w-fit font-bold pl-4 pr-4 pt-2  pb-2   rounded-4xl  transition-all duration-300 `}>
                    IN PROGRESS
                    <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("IN_PROGRESS").length}</span>
                </button>
                <div className="border-l-2 border-[#fff] mx-0.5">

                </div>
                <button
                    onClick={() => setActiveTab("done")}
                    className={`bg-${activeTab === "done" ? "white shadow w-full" : "none"} nunito-regular flex flex-nowrap justify-center whitespace-nowrap w-fit font-bold pl-4 pr-4 pt-2  pb-2  rounded-4xl  transition-all duration-300 }`}>
                    DONE <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("DONE").length}</span>
                </button>
            </section>
            {/* desktop */}
            <section className="flex gap-6 overflow-x-auto mt-4 pb-4">
                <div
                    onDragOver={(e) => handleDragOver(e, "TODO")}
                    onDrop={() => handleDrop("TODO")}
                    className={`${activeTab === "todo" ? "block" : "hidden"} md:block w-full md:w-80 shrink-0`}>
                    <div className="hidden md:flex items-center gap-2 mb-4 font-semibold text-sm text-gray-500 uppercase tracking-wider">
                        TODO <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("TODO").length}</span>
                    </div>
                    <div className="min-h-[500px] flex flex-col gap-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-2">
                        {renderColumn("TODO")}
                    </div>
                </div>

                <div
                    onDragOver={(e) => handleDragOver(e, "IN_PROGRESS")}
                    onDrop={() => handleDrop("IN_PROGRESS")}
                    className={`${activeTab === "inProgress" ? "block" : "hidden"} md:block w-full md:w-80 shrink-0`}>
                    <div className="hidden md:flex items-center gap-2 mb-4 font-semibold text-sm text-gray-500 uppercase tracking-wider">
                        IN PROGRESS <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("IN_PROGRESS").length}</span>
                    </div>
                    <div className="min-h-[500px] flex flex-col gap-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-2">
                        {renderColumn("IN_PROGRESS")}
                    </div>
                </div>

                <div
                    onDragOver={(e) => handleDragOver(e, "DONE")}
                    onDrop={() => handleDrop("DONE")}
                    className={`${activeTab === "done" ? "block" : "hidden"} md:block w-full md:w-80 shrink-0`}>
                    <div className="hidden md:flex items-center gap-2 mb-4 font-semibold text-sm text-gray-500 uppercase tracking-wider">
                        DONE <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">{getTaskByStatus("DONE").length}</span>
                    </div>
                    <div className="min-h-[500px] flex flex-col gap-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-2">
                        {renderColumn("DONE")}
                    </div>
                </div>
            </section>
        </>
    )
}