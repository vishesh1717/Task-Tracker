import React,{useState,useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Header from "./components/Header"
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
// function App() {
//     //task Assigned
//     //showtask or not
//     const [showTask,setShowTask]=React.useState(false)
//     const [tasks,setTasks]=React.useState([])
//     React.useEffect(()=>{
//       const getTasks=async()=>{
//         const tasksFromServer=await fetchTasks()
//         setTasks(tasksFromServer)
//       }
//     getTasks()
//     },[])
//     const fetchTasks = async()=>{
//       const res=await fetch('http://localhost:5000/tasks')
//       const data =await res.json()
//       return data
//     }
//     const fetchTask = async(id)=>{
//       const res=await fetch(`http://localhost:5000/tasks/${id}`)
//       const data =await res.json()
//       return data
//     }
    
//     //Add TAsk
//     const addTask=async(task)=>{
//       const res=await fetch('http://localhost:5000/tasks',{
//         method:'POST',
//       headers:{
//         'Content-type':'application/json',
//       },
//       body:JSON.stringify(task)
      
//       })
//       const data=await res.json()

//       setTasks([...tasks,data])
//       // const id= Math.floor(Math.random()*10000)+1
//       // const newTask={id,...task}
//       // setTasks([...tasks,newTask])
//     }

//     //Delete function
//     const deleteTask=async(id)=>{
//       await fetch(`http://localhost:5000/tasks/${id}`,{
//         method:'DELETE'
//       })
//       setTasks(tasks.filter((task)=>task.id !==id))
//     }
//     //Reminder
//     const toggleReminder=async(id)=>{
//       const taskToToggle=await fetchTask(id)
//       const updTask={...taskToToggle,
//       reminder: !taskToToggle.reminder}
//       const res=await fetch(`http://localhost:5000/tasks/${id}`,{
//         method:'PUT',
//         headers:{
//           'Content-type':'application/json'
//         },
//         body:JSON.stringify(updTask)
//       })
//       const data = await res.json()
//       setTasks(tasks.map((task)=>task.id === id ? {...task , reminder:data.reminder} : task))
//     }

//   return (
//     <Router>
//     <div className="container">
//       <Header onAdd={()=>setShowTask(!showTask)} showAdd={showTask}/>
      
//       <Route path='/'
//       exact render={(props)=>(
//         <>
//           {showTask && <AddTask onAdd={addTask} ></AddTask>}
//       {tasks.length>0 ? 
//       (<Tasks 
//       tasks={tasks} 
//       onDelete={deleteTask}
//       onToggle={toggleReminder}
//       /> ):<h3>NO Task to Show</h3>}

//         </>
//       )}/>
//       <Route path='/about' component={About}/>
//       <Footer/>
//     </div>
//     </Router>
//   );
// }


// export default App;

const App = () => {
  const [showTask, setShowTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowTask(!showTask)}
          showAdd={showTask}
        />
        <Route
          path='/'
          exact
          render={(props) => (
            <>
              {showTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          )}
        />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App