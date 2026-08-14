export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-20 px-4 items-center">
      <h2 className="text-xl font-bold text-gray-800">মেন্যু</h2>
      <ul className="mt-6 w-full max-w-sm flex flex-col gap-3">
        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm font-medium">প্রোফাইল</li>
        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm font-medium">সেটিংস</li>
        <li className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-sm font-medium">লগ আউট</li>
      </ul>
    </div>
  );
}
