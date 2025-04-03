export const isPublicAvailablePage = (path: string) => {
  const publicAvailablePages = [
    '/',
    '/auth',
    '/auth/silent-renew',
    '/auth/logout',
    '/error',
    '/auth/signed-out',
    '/auth/force-logout',
  ];

  return publicAvailablePages.includes(path);
};
