import { useState } from 'react';
import { toast } from 'react-toastify';
import FormInput from '../components/FormInput';

export default function SubmitForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    authority: '',
    profile: '',
    definition: '',
    strategy: '',
    not_self_theme: '',
    incarnation_cross: ''
  });
  const [chart, setChart] = useState(null);
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (chart) data.append('chart', chart);

    try {
      const res = await fetch('http://localhost:5000/submit', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) {
        setRoles(result.roles);
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (err) {
      toast.error("Error connecting to server.");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="bg-seedGreen text-seedGold font-display p-6 rounded-lg shadow mb-4">
        Welcome to The SeedSync System!
      </div>
      <h2 className="text-2xl font-semibold mb-4">Submit Human Design Info</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {['name', 'email', 'phone', 'type', 'authority', 'profile', 'definition', 'strategy', 'not_self_theme', 'incarnation_cross'].map((f) => (
          <FormInput key={f} label={f} name={f} value={form[f]} onChange={handleChange} />
        ))}
        <input type="file" onChange={(e) => setChart(e.target.files[0])} className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {roles.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Suggested Roles:</h3>
          <ul className="list-disc list-inside">
            {roles.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
