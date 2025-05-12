import PostList from "@/components/post/listByTopic";
import TopicDrawer from "@/components/topic/drawer";
import { db } from "@/db";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { slug } = await params;
  const topic = await db.topic.findFirst({ where: { slug: decodeURI(slug) } });

  return (
    <div className="flex-1 w-full h-screen flex flex-row items-start justify-between gap-4">
      <PostList slug={slug} />

      <TopicDrawer
        slug={topic?.slug ?? ""}
        description={topic?.description ?? ""}
      />
    </div>
  )
}
