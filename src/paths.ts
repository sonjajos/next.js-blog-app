const paths = {
  home: () => '/',
  login: () => '/login',
  topic: (slug: string) => `/topics/${slug}`,
  post: (slug: string, postId: string) => `/topics/${slug}/posts/${postId}`,
  createPost: (slug: string) => `/topics/${slug}/posts/new`,
};

export default paths;

const authPaths = ['/topics', '/posts'];

const basePaths = ['/login', ...authPaths];

export const checkIfAllowedPath = (path: string, isAuthenticated: boolean): boolean => {
  const isRouterPath = path === paths.home() || !!basePaths.find((p) => path.includes(p));
  if (!isRouterPath) {
    return true;
  }

  return !(
    (path === paths.home() || !!authPaths.find((p) => path.includes(p))) &&
    !isAuthenticated
  );
};
