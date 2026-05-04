const authors = [
  { name: 'Samiksha Channawar', role: 'Co-Author' },
  { name: 'Mahesh Kotkar', role: 'Co-Author' },
  { name: 'Atharv Pawar', role: 'Co-Author' },
  { name: 'Aditya Dharashivkar', role: 'Co-Author' },
  { name: 'Aary Bokil', role: 'Co-Author' },
];

const colors = [
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
];

export default function AuthorSection() {
  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-8 text-lg">Written By</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {authors.map((author, index) => (
          <div
            key={author.name}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[index]} flex items-center justify-center text-white font-bold text-lg shrink-0`}
            >
              {author.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">{author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{author.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
