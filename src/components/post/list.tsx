import PostDisplay from './display';
import EmptyState from '../empty-state';
import type { fetchPosts, fetchPostsBySlug } from '@/db/queries/posts';

interface PostListProps {
  fetchData: (
    take?: number,
    skip?: number,
  ) => ReturnType<typeof fetchPosts | typeof fetchPostsBySlug>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();

  return (
    <div className='flex-1 w-full flex flex-col items-start justify-between gap-4 pt-6'>
      {posts?.map((post) => (
        <PostDisplay
          key={post.id}
          post={post}
          slug={post.topic.slug}
          commentsCount={post._count?.comments}
        />
      ))}
      {!posts.length && (
        <EmptyState
          heading='No content added.'
          paragraph='Be the first one to join our community!'
        />
      )}
    </div>
  );
}
