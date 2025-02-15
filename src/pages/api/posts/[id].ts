import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../entities/Post';
import { getDataSource } from '../../../lib/data-source';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const dataSource = await getDataSource();
        const postRepository = dataSource.getRepository(Post);

        if (req.method === 'GET') {
            const post = await postRepository.findOneBy({ id: Number(id) });
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else if (req.method === 'PUT') {
            const { title, content } = req.body;
            const post = await postRepository.findOneBy({ id: Number(id) });

            if (post) {
                post.title = title;
                post.content = content;
                // ... update other fields
                await postRepository.save(post);
                res.status(200).json(post);
            } else {
                res.status(404).json({ error: 'Post not found' });
            }

        } else if (req.method === 'DELETE') {
            const post = await postRepository.findOneBy({ id: Number(id) });
            if (post) {
                await postRepository.remove(post);
                res.status(204).end(); // 204 No Content
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else {
            res.status(405).end(); // Method Not Allowed
        }
    } catch (error) {
        console.error("Error in post API:", error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

