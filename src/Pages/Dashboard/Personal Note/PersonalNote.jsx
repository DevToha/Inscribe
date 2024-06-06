import { useEffect, useState } from "react";


const PersonalNote = () => {

    const [note, setNote] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/note')
            .then(res => res.json())
            .then(data => setNote(data));
    }, []);

    return (
        <div>
            <div className="mt-14 grid grid-cols-3">

                {note.map((notes) => (
                    <div key={notes._id}>
                        <div className="card16 mb-10 ml-16">
                            Your Note : {notes.description}
                            <button className="btn btn-accent">Delete</button>
                            <button className="btn btn-accent">update</button>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    );
};

export default PersonalNote;