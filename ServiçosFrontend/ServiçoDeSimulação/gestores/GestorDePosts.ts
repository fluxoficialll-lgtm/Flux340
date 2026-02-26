
import { GestorBase } from './GestorBase';
import { Post } from '../../../types';
import { sqlite } from '../cache/engine';

export class GestorDePosts extends GestorBase {
    private table = 'posts';

    public getAll(): Post[] {
        return this.queryAll<Post>(this.table).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    public getCursorPaginated(limit: number, cursor?: string): { posts: Post[], nextCursor: string | null } {
        let allPosts = this.getAll();
        const organic = allPosts.filter(p => !p.isAd);

        let startIndex = 0;
        if (cursor) {
            const cursorDate = new Date(cursor).getTime();
            startIndex = organic.findIndex(p => new Date(p.timestamp).getTime() < cursorDate);
            if (startIndex === -1) {
                return { posts: [], nextCursor: null };
            }
        }

        const paginatedPosts = organic.slice(startIndex, startIndex + limit);
        const lastPost = paginatedPosts[paginatedPosts.length - 1];

        const nextCursor = lastPost && (startIndex + limit < organic.length) 
            ? lastPost.timestamp 
            : null;

        return { posts: paginatedPosts, nextCursor };
    }

    /**
     * Cria uma nova postagem e a salva na simulação.
     */
    public createPost(data: { authorId: string; content: string; mediaUrl?: string }): Post {
        const newPost: Post = {
            id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            authorId: data.authorId,
            content: data.content,
            mediaUrl: data.mediaUrl || null,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            isAd: false,
            cta: null,
            ctaUrl: null
        };

        this.add(newPost);
        return newPost;
    }

    public saveAll(data: Post[]): void {
        data.forEach(p => this.add(p));
    }

    public add(post: Post): void {
        this.upsert(this.table, post.id, post, { timestamp: new Date(post.timestamp).getTime() });
    }

    public update(post: Post): void {
        this.add(post);
    }

    public delete(id: string): void {
        const items = this.queryAll<any>(this.table).filter(i => String(i.id) !== String(id));
        sqlite.saveTableData(this.table, items);
    }

    public findById(id: string): Post | undefined {
        return this.queryOne<Post>(this.table, id);
    }
}
