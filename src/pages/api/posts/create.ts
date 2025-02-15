import type { NextApiRequest, NextApiResponse } from 'next';
import { Post } from '../../../entities/Post';
import { getDataSource } from '../../../lib/data-source';
import {generateSlug} from "@/utils/slugify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const dataSource = await getDataSource();
            const postRepository = dataSource.getRepository(Post);

            const { title, content } = req.body;
            const slug = generateSlug(title);

            const newPost = new Post();
            newPost.title = title;
            newPost.content = content;
            newPost.slug = slug;
            // ... set other fields

            const savedPost = await postRepository.save(newPost);
            res.status(201).json(savedPost); // 201 Created
        } catch (error) {
            console.error("Error creating post:", error);
            res.status(500).json({ error: 'Failed to create post' });
        }
    } else {
        res.status(405).end();
    }
}
