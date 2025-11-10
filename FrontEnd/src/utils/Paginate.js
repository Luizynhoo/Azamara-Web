export default function paginate(array = [], page = 1, pageSize) {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}
