import React from 'react'

const AddTask = ({onAdd}) => {
    const [text,setText]=React.useState('')
    const [day,setDay]=React.useState('')
    const [reminder,setReminder]=React.useState(false)

    const onSubmit=(e)=>{
        e.preventDefault()
        if(!text){
            alert('Please add task')
            return
        }
        onAdd({text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input
                type='text' 
                placeholder='Add Task' 
                value={text} 
                onChange={(e)=>{setText(e.target.value)}}/>
            </div>
            <div className='form-control'>
                <label>Day and TIme</label>
                <input type='text' placeholder='Add Day and TIme' value={day} onChange={(e)=>setDay(e.target.value)}></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input 
                type='checkbox' 
                value={reminder} 
                checked={reminder}
                onChange={(e)=>setReminder(e.currentTarget.checked)}></input>
            </div>
            <input type='submit'  value='Save Task' className='btn btn-block'></input>
        </form>
        
    )
}

export default AddTask
