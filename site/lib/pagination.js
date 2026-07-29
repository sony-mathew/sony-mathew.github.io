export function paginateItems(items, requestedPage, pageSize) {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const parsedPage = Number.parseInt(requestedPage, 10);
  const currentPage = Math.min(
    Math.max(Number.isFinite(parsedPage) ? parsedPage : 1, 1),
    totalPages
  );
  const startIndex = (currentPage - 1) * pageSize;

  return {
    currentPage,
    items: items.slice(startIndex, startIndex + pageSize),
    totalItems,
    totalPages,
  };
}
