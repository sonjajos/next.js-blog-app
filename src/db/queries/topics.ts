import { db } from '..';

export async function fetchTopic(slug: string) {
  if (process.env.SKIP_PRISMA === 'true') {
    return null;
  }
  const topics = await db.topic.findFirst({ where: { slug: slug?.toLowerCase() } });
  return topics;
}

export async function fetchTopics(take: number = 9, skip: number = 0) {
  if (process.env.SKIP_PRISMA === 'true') {
    return [];
  }
  const topics = await db.topic.findMany({
    take,
    skip,
  });
  return topics;
}
