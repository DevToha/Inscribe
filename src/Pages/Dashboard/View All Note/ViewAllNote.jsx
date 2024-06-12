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
            <h1 className="text-3xl font-semibold text-center mt-10 lg:mt-0 md:mt-0">Here is all note create by student</h1>
            <div className="mt-10">
                {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    <div className="grid lg:grid-cols-3">
                        {note.map((notes) => (
                            <div key={notes._id}>
                                <div className="card26 w-[300px] mb-10 p-10">
                                    <p>Student Email : {notes.email}</p>
                                    <p>Student Note : {notes.description}</p>
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
