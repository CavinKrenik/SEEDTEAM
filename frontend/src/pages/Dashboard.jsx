import { useEffect, useState } from 'react';

export default function Dashboard({ token }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/members', {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => setMembers(data));
  }, [token]);

  return (
    <div className="p-6 font-display text-seedGold">
      <div className="bg-seedGreen p-6 rounded-lg shadow mb-6">
        <h2 className="text-3xl font-bold">Dream Team Dashboard</h2>
        <p className="text-seedGold">Review all Human Design submissions and assigned roles:</p>
      </div>

      <div className="grid gap-6">
        {members.map(m => (
          <div key={m.id} className="bg-white text-black p-4 rounded shadow">
            <h3 className="text-xl font-bold">{m.name}</h3>
            <p><strong>Email:</strong> {m.email}</p>
            <p><strong>Phone:</strong> {m.phone}</p>
            <p><strong>Type:</strong> {m.type}</p>
            <p><strong>Authority:</strong> {m.authority}</p>
            <p><strong>Profile:</strong> {m.profile}</p>
            {m.definition && <p><strong>Definition:</strong> {m.definition}</p>}
            {m.strategy && <p><strong>Strategy:</strong> {m.strategy}</p>}
            {m.not_self_theme && <p><strong>Not-Self Theme:</strong> {m.not_self_theme}</p>}
            {m.incarnation_cross && <p><strong>Incarnation Cross:</strong> {m.incarnation_cross}</p>}

            <p className="mt-2"><strong>Assigned Roles:</strong></p>
            <ul className="list-disc list-inside mb-2">
              {m.roles.map((r, i) => <li key={i}>{r}</li>)}
            </ul>

            {m.description && (
              <details className="bg-gray-100 border border-gray-300 rounded p-3">
                <summary className="cursor-pointer font-semibold">View Full Role Description</summary>
                <p className="mt-2 whitespace-pre-wrap text-sm">{m.description}</p>
              </details>
            )}

            {m.chart_filename && (
              <img
                src={`http://localhost:5000/uploads/${m.chart_filename}`}
                alt="Chart"
                className="mt-4 max-w-xs border rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
