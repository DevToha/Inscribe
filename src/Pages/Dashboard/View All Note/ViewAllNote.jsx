import { useEffect, useState } from "react";
import './allnote.css';

const ViewAllNote = () => {
    const [note, setNote] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/note')
            .then(res => res.json())
            .then(data => setNote(data));
    }, []);

    return (
        <div>
            <div className="mt-10">
                <div className="grid grid-cols-3">
                    {note.map((notes) => (
                        <div key={notes._id}>
                            <div className="card26 mb-10 ml-16 p-10">
                                <p>Your Note : {notes.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewAllNote;
