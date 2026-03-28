import React, { useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '../layout/Layout'
import Board from './pages/Board'
import Trash from './pages/Trash'
import Analytics from './pages/Analytics'
import Categories from './pages/Categories'
import TaskDetails from "./components/TaskDetails"
function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Board />}/>
                        <Route path='todo/:id' element={<TaskDetails />}/>
                        <Route path="analytics" element={<Analytics/>} />
                        <Route path="categories" element={<Categories/>} />
                        <Route path="trash" element={<Trash />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
