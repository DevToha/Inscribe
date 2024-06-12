import { useContext, useEffect, useState, useRef } from "react";
import './note.css';
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PersonalNote = () => {
    const { user } = useContext(AuthContext);
    const [note, setNote] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [loading, setLoading] = useState(true);  // Add loading state
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`https://assignment-12-server-silk-phi.vercel.app/note?email=${user.email}`);
                const data = await response.json();
                setNote(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            } finally {
                setLoading(false);  // Set loading to false after data is fetched
            }
        };

        fetchNotes();
    }, [user.email]);

    const handleDelete = async (id) => {
        try {
            await fetch(`https://assignment-12-server-silk-phi.vercel.app/note/${id}`, {
                method: 'DELETE',
            });
            setNote(prevNotes => prevNotes.filter(note => note._id !== id));
            toast.success('Note deleted successfully!');
        } catch (error) {
            console.error('Error deleting note:', error);
            toast.error('Error deleting note.');
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`https://assignment-12-server-silk-phi.vercel.app/note/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description: updatedDescription }),
            });
            const updatedNote = await response.json();
            setNote(prevNotes => prevNotes.map(note => (note._id === id ? updatedNote : note)));
            setIsEditing(null);
            setUpdatedDescription("");
            modalRef.current.close();
            toast.success('Note updated successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
            toast.error('Error updating note.');
        }
    };

    const openModal = () => {
        modalRef.current.showModal();
    };

    return (
        <div>
            <ToastContainer />
            <h1 className="text-3xl font-semibold text-center lg:mt-0 md:mt-0 mt-10">Your Personal Notes</h1>
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div className="mt-8 grid lg:grid-cols-2">
                    {note.map((notes) => (
                        <div key={notes._id}>
                            <div className="card27 lg:w-[460px] md:w-[300px] mb-10 px-10 py-14 ">
                                <div className="">
                                    <p className="text-2xl font-bold mb-5">Your Note Title: {notes.title}</p>
                                    <p className="text-xl font-bold mb-10 text-gray-600">Your Note : {notes.description}</p>
                                    <div className="flex gap-5">
                                        <button className="btn btn-warning" onClick={() => handleDelete(notes._id)}>Delete</button>
                                        <br />
                                        <button className="btn btn-accent" onClick={() => { setIsEditing(notes._id); openModal(); }}>Update</button>
                                        {isEditing === notes._id && (
                                            <div>
                                                <dialog ref={modalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                    <div className="modal-box">
                                                        <h3 className="font-bold text-lg">Update Note</h3>
                                                        <textarea
                                                            value={updatedDescription}
                                                            onChange={(e) => setUpdatedDescription(e.target.value)}
                                                            className="textarea textarea-bordered w-full"
                                                            placeholder="Update your note description"
                                                        />
                                                        <div className="modal-action">
                                                            <form method="dialog">
                                                                <button className="btn">Close</button>
                                                            </form>
                                                            <button className="btn btn-accent" onClick={() => handleUpdate(notes._id)}>Save</button>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PersonalNote;
