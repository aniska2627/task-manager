import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "https://task-manager-mzn7.onrender.com";

function App() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        assignedTo: "",
    });

    const fetchTasks = async() => {
        const res = await axios.get(`${API_BASE}/tasks`);
        setTasks(res.data.tasks || []);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleChange = (e) =>
        setForm({...form, [e.target.name]: e.target.value });

    const addTask = async() => {
        if (!form.title) return alert("Enter title");
        await axios.post(`${API_BASE}/tasks`, form);
        fetchTasks();
        setForm({
            title: "",
            description: "",
            status: "pending",
            priority: "low",
            assignedTo: "",
        });
    };

    return ( <
        div className = "container" >
        <
        h1 > 🚀Task Management Dashboard < /h1>

        <
        div className = "form" >
        <
        h2 > ➕Add Task < /h2>

        <
        input placeholder = "Title"
        name = "title"
        value = { form.title }
        onChange = { handleChange }
        />

        <
        input placeholder = "Description"
        name = "description"
        value = { form.description }
        onChange = { handleChange }
        />

        <
        select name = "status"
        value = { form.status }
        onChange = { handleChange } >
        <
        option value = "pending" > Pending < /option> <
        option value = "inprogress" > In Progress < /option> <
        option value = "completed" > Completed < /option> < /
        select >

        <
        select name = "priority"
        value = { form.priority }
        onChange = { handleChange } >
        <
        option value = "low" > Low < /option> <
        option value = "medium" > Medium < /option> <
        option value = "high" > High < /option> < /
        select >

        <
        input placeholder = "Assigned To"
        name = "assignedTo"
        value = { form.assignedTo }
        onChange = { handleChange }
        />

        <
        button onClick = { addTask } > Add Task < /button> < /
        div >

        <
        div className = "task-grid" > {
            tasks.length === 0 ? ( <
                p > No tasks available < /p>
            ) : (
                tasks.map((task, i) => ( <
                    div className = "card"
                    key = { i } >
                    <
                    h3 > { task.title } < /h3> <
                    p > { task.description } < /p> <
                    p className = "status" > Status: { task.status } < /p> <
                    p className = { `priority-${task.priority}` } >
                    Priority: { task.priority } <
                    /p> <
                    p > Assigned To: { task.assignedTo } < /p> < /
                    div >
                ))
            )
        } <
        /div> < /
        div >
    );
}

export default App;