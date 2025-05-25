import { db } from '..';

export async function fetchPosts(take: number = 10, skip: number = 0) {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    skip,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      topic: {
        select: {
          slug: true,
        },
      },
      _count: { select: { comments: true } },
    },
  });
  return posts;
}

export async function fetchPostsBySlug(slug: string, take: number = 10, skip: number = 0) {
  const posts = await db.post.findMany({
    where: { topic: { slug } },
    orderBy: { createdAt: 'desc' },
    take,
    skip,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: { select: { comments: true } },
    },
  });
  return posts.map((p) => ({ ...p, topic: { slug } }));
}
