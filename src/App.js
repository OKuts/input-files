import './App.scss';
import {useState} from "react";

function App() {
    const [drag, setDrag] = useState(false)
    const [cn, setCn] = useState('drop-area')

    const dragStartHandler = (e) => {
        e.preventDefault()
        setDrag(true)
        setCn('drop-area drop')
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault()
        setDrag(false)
        setCn('drop-area')
    }

    const onDropHandler = (e) => {
        e.preventDefault()
        let files = [...e.dataTransfer.files]
        files.forEach((file, i) => {
            const formData = new FormData()
            formData.append(`file${i}`, file)
            console.log(formData)
            // send formData
        })

        setDrag(false)
        setCn('drop-area')
    }

    const inputHandler = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        console.log(formData.get('file'))
        // send formData
    }

    return (
        <div className="app">
                {drag
                    ? <div className={cn}
                           onDragOver={dragStartHandler}
                           onDragLeave={dragLeaveHandler}
                           onDragStart={dragStartHandler}
                           onDrop={onDropHandler}>
                        Отпусти файл
                </div>
                    : <div className={cn}
                        onDragOver={dragStartHandler}
                        onDragLeave={dragLeaveHandler}
                        onDragStart={dragStartHandler} >
                        Перемести файл сюда<br/>
                        <form action="post" onSubmit={inputHandler}>
                            <label htmlFor="file">Choose images to upload (TXT, PDF)</label>
                            <input type="file" accept=".txt" id="file" name="file"/>
                            <button>Send</button>
                        </form>
                    </div>}

        </div>
    );
}

export default App;
