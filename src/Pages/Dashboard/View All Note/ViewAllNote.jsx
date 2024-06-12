import { useEffect, useState } from "react";
import './allnote.css';

const ViewAllNote = () => {
    const [note, setNote] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await fetch('https://assignment-12-server-silk-phi.vercel.app/note');
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchNotes();
    }, []);

    return (
        <div>
            <div className="mt-10">
                {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    <div className="grid grid-cols-3">
                        {note.map((notes) => (
                            <div key={notes._id}>
                                <div className="card26 mb-10 ml-16 p-10">
                                    <p>Your Note : {notes.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAllNote;
