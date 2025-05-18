import { db } from "..";

export async function fetchComments(take: number = 50, skip: number = 0) {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: "desc" },
    take,
    skip,
    include: {
      user: {
        select: {
            id: true,
            name: true,
            image: true,
        }
      },
      _count: { select: { children: true } }
    }
  });
  return comments;
}

export async function fetchChildComments(parentId: string, take: number = 10, skip: number = 0) {
  const comments = await db.comment.findMany({
    orderBy: { createdAt: "desc" },
    where: { parentId },
    take,
    skip,
    include: {
      user: {
        select: {
            id: true,
            name: true,
            image: true,
        }
      },
      _count: { select: { children: true } }
    }
  });
  return comments;
}