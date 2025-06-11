// src/components/FormInput.jsx
export default function FormInput({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col font-display text-seedGold">
      <label htmlFor={name} className="mb-1 capitalize">{label}</label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        className="border border-seedGreen bg-white text-black p-2 rounded focus:outline-none focus:ring-2 focus:ring-seedGold"
      />
    </div>
  );
}
