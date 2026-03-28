// src/components/TaskCard.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TaskCard({ todo, index, onDragStart }) {
    const { categoryColor, categoryName } = todo

    const dotColor = categoryName?.toLowerCase() === 'default' || !categoryColor
        ? '#94a3b8' // A nice slate gray for default
        : categoryColor;
    // console.log(todo);
    const formattedDate = new Date(todo.dueDate).toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <>
            <div
                draggable
                data-task-card
                onDragStart={(e) => onDragStart(e, todo.id, todo.status, index)}
                className='cursor-grab active:cursor-grabbing mb-2'
            >

                <NavLink
                    to={`/todo/${todo.id}`}
                    state={{ todo }}
                >

                    <div
                        className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm mb-4 hover:shadow-md transition-shadow flex flex-col"
                        id="1"
                    >

                        <div className="flex justify-between items-center mb-3">
                            <div className=" flex items-center gap-1.5 bg-slate-50 text-slate-600 text-[11px] font-medium px-2 py-1 rounded-md">
                                <span style={{ backgroundColor: categoryColor || '#fff' }} className={`w-4.5 h-2.5 rounded-full `}></span>
                                <span className={`capitalize nunito-regular `}>{todo.categoryName || 'Default'}</span>
                            </div>


                        </div>

                        {/* Content Section */}
                        <div className="mb-4">
                            <h3 className="handlee-regular font-semibold text-gray-900 text-[14px] leading-tight mb-2">
                                {todo.title}
                            </h3>
                            <p className="text-gray-500 text-[12px] leading-relaxed line-clamp-2 handlee-regular ">
                                {todo.description}
                            </p>
                        </div>

                        <div className="w-full border-t border-dashed border-gray-200 mb-3 mt-auto"></div>

                        <div className="flex justify-between items-center" >
                            <div className="flex items-center justify-center text-gray-500 text-[11px] font-medium gap-1.5">
                                <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className='text-blue-600 nunito-regular '>Due Date:</span>{formattedDate}
                            </div>

                            {/* User Avatar
        <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden">
          <img 
            src={`https://ui-avatars.com/api/?name=${todo.title}&background=random&color=fff`} 
            alt="assignee" 
            className="w-full h-full object-cover"
          />
        </div> */}
                        </div>
                    </div>
                </NavLink>
            </div>

        </>
    );
}