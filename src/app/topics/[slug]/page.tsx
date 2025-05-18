import { auth } from "@/auth";
import PostList from "@/components/post/list";
import TopicDrawer from "@/components/topic/drawer";
import { db } from "@/db";
import { fetchPostsBySlug } from "@/db/queries/posts";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicPage({
  params,
}: TopicPageProps) {
  const { slug } = await params;
  const session = await auth();
  const topic = await db.topic.findFirst({ where: { slug: decodeURI(slug?.toLowerCase()) } });
  const isAdmin = session?.user?.id === topic?.adminId;

  return (
    <div className="flex-1 w-full h-screen flex flex-row items-start justify-between gap-4">
      <PostList
        fetchData={(take?: number, skip?: number) => fetchPostsBySlug(slug, take, skip)}
      />

      <TopicDrawer
        slug={topic?.slug ?? ""}
        description={topic?.description ?? ""}
        isAdmin={isAdmin}
      />
    </div>
  )
}
