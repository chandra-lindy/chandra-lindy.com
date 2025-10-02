export default function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}
