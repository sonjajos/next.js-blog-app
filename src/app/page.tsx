import PostListByDate from "@/components/post/listByDate";
import TopicList from "@/components/topic/topic-list";

export default async function Home() {
  

  return (
    <div className="flex flex-row justify-between gap-8">
      <div className="flex-1">
        <PostListByDate />
      </div>
      <TopicList />
    </div>
  );
}
