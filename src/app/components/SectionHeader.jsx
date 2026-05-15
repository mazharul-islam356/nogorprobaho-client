// components/SectionHeader.jsx
export default function SectionHeader({ title }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3">
        {title}
      </h2>
    </div>
  );
}
