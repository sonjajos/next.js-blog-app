import { db } from '..';

export async function fetchComments(take: number = 50, skip: number = 0) {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: 'asc' },
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
      _count: { select: { children: true } },
    },
  });
  return comments;
}

export async function fetchChildComments(parentId: string, take: number = 10, skip: number = 0) {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: 'asc' },
    where: { parentId },
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
      _count: { select: { children: true } },
    },
  });
  return comments;
}
