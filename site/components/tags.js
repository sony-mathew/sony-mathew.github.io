export default function Tags({ tags }) {
  return (
    <div>
      <span className="px-2 pl-0 text-gray-500">Tags: </span>
      {tags.map((tag) =>
        <span className="px-1 text-gray-600" key={tag}>#{tag}</span>
      )}
    </div>
  );
}