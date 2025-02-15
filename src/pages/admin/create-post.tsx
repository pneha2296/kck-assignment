import { useState } from 'react';
import { useRouter } from 'next/router';

const CreatePost = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create post.');
                return;
            }

            router.push('/blog');
        } catch (err) {
            console.error("Client-side error:", err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <label htmlFor="title">Title:</label><br />
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required // Make title required
            /><br />

            <label htmlFor="content">Content:</label><br />
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                required
            /><br />

            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePost;