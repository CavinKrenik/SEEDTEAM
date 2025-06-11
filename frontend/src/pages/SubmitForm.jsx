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
    for (let key of Object.keys(form)) {
      if (!form[key]) {
        toast.error(`Please fill out: ${key.replace(/_/g, ' ')}`);
        return;
      }
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (chart) data.append('chart', chart);

    try {
      const res = await fetch('https://seedteam.onrender.com/submit', { method: 'POST', body: data });
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

  const dropdownOptions = {
    type: ['Manifestor', 'Generator', 'Manifesting Generator', 'Projector', 'Reflector'],
    authority: ['Emotional', 'Sacral', 'Splenic', 'Ego', 'Self-Projected', 'Mental Projector', 'Lunar'],
    profile: ['1/3', '1/4', '2/4', '2/5', '3/5', '3/6', '4/6', '4/1', '5/1', '5/2', '6/2', '6/3'],
    definition: ['Single Definition', 'Split Definition', 'Triple Split Definition', 'Quadruple Split Definition', 'No Definition'],
    strategy: [
      'To Inform',
      'To Respond',
      'To Respond (and then Inform)',
      'To Wait for the Invitation',
      'To Wait a Lunar Cycle'
    ],
    not_self_theme: ['Anger', 'Frustration', 'Bitterness', 'Disappointment'],
    incarnation_cross: ['Right Angle Crosses', 'Left Angle Crosses', 'Juxtaposition Crosses']
  };

  const helperText = {
    type: 'This is your Human Design energy type.',
    authority: 'How you make aligned decisions.',
    profile: 'Your personality archetype combination.',
    definition: 'How your energy centers connect.',
    strategy: 'How you are meant to interact with life.',
    not_self_theme: 'The emotion you feel when off-path.',
    incarnation_cross: 'Your broad life theme or purpose.'
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="bg-seedGreen text-seedGold font-display p-6 rounded-lg shadow mb-4">
        Welcome to The SeedSync System!
      </div>
      <h2 className="text-2xl font-semibold mb-4">Submit Human Design Info</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <FormInput label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="e.g., Jane Doe" />
        <FormInput label="Email Address" name="email" value={form.email} onChange={handleChange} placeholder="e.g., jane@example.com" />
        <FormInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} placeholder="e.g., 555-123-4567" />

        {Object.entries(dropdownOptions).map(([key, options]) => (
          <div key={key} className="flex flex-col">
            <label className="font-semibold mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
            <select
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            >
              <option value="">Select {key.replace(/_/g, ' ')}</option>
              {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <p className="text-sm text-gray-500">{helperText[key]}</p>
          </div>
        ))}

        <input type="file" onChange={(e) => setChart(e.target.files[0])} className="border p-2 rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Submit</button>
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
