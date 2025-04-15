export default function Tags({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) =>
        <span 
          key={tag} 
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
        >
          #{tag}
        </span>
      )}
    </div>
  );
}