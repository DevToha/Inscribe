import { useContext, useEffect, useState } from "react";
import './note.css';
import { AuthContext } from "../../../Provider/AuthProvider";

const PersonalNote = () => {
    const { user } = useContext(AuthContext);
    const [note, setNote] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`http://localhost:5000/note?email=${user.email}`);
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, [user.email]);

    return (
        <div>
            <h1>Your Personal Note</h1>
            <div className="mt-14 grid grid-cols-3">
                {note.map((notes) => (
                    <div key={notes._id}>
                        <div className="card26 mb-10 ml-16 p-10">
                            <p>Your Note : {notes.description}</p>
                            <button className="btn btn-accent">Delete</button>
                            <br />
                            <button className="btn btn-accent">Update</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalNote;
