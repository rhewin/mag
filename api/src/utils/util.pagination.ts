export const getPagination = (pageNum?: number, perPage?: number) => {
  const currentPage = pageNum && pageNum > 0 ? Math.floor(pageNum) : 1;
  const take = perPage && perPage > 0 ? Math.floor(perPage) : 10;

  return {
    currentPage,
    take,
    skip: (currentPage - 1) * take,
  };
};
