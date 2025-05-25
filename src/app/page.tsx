import PostList from '@/components/post/list';
import TopicList from '@/components/topic/topic-list';
import WebDrawer from '@/components/web-drawer';
import { fetchPosts } from '@/db/queries/posts';

export default async function Home() {
  return (
    <div className='flex flex-row justify-between gap-8'>
      <div className='flex-1'>
        <PostList fetchData={fetchPosts} />
      </div>
      <WebDrawer>
        <TopicList />
      </WebDrawer>
    </div>
  );
}
