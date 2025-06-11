import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

export default function Dashboard({ token }) {
  const [members, setMembers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [sortRole, setSortRole] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const fetchMembers = () => {
    fetch('https://seedteam.onrender.com/members', {
      headers: { Authorization: token },
    })
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setFiltered(data);
      });
  };

  useEffect(() => {
    fetchMembers();
  }, [token]);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    filterMembers(q, sortRole);
  };

  const handleSort = (e) => {
    const role = e.target.value;
    setSortRole(role);
    filterMembers(query, role);
  };

  const filterMembers = (q, role) => {
    let result = members.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.phone.includes(q) ||
      m.type.toLowerCase().includes(q) ||
      m.roles.join(', ').toLowerCase().includes(q)
    );

    if (role) {
      result = result.filter(m => m.roles.includes(role));
    }

    setFiltered(result);
    setCurrentPage(1);
  };

  const exportCSV = () => {
    const header = ['Name', 'Email', 'Phone', 'Type', 'Authority', 'Profile', 'Definition', 'Strategy', 'Not-Self Theme', 'Incarnation Cross', 'Roles'];
    const rows = members.map(m => [
      m.name,
      m.email,
      m.phone,
      m.type,
      m.authority,
      m.profile,
      m.definition,
      m.strategy,
      m.not_self_theme,
      m.incarnation_cross,
      m.roles.join('; ')
    ]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'seed_members.csv');
  };

  const deleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    await fetch(`https://seedteam.onrender.com/delete_member/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });
    fetchMembers();
  };

  const indexOfLast = currentPage * membersPerPage;
  const indexOfFirst = indexOfLast - membersPerPage;
  const currentMembers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / membersPerPage);

  return (
    <div className="p-6 font-display text-seedGold">
      <div className="bg-seedGreen p-6 rounded-lg shadow mb-6">
        <h2 className="text-3xl font-bold">Dream Team Dashboard</h2>
        <p className="text-seedGold">Review and manage Human Design submissions below:</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search by name, type, or role..."
            className="p-2 rounded w-full sm:w-1/2 text-black"
          />
          <select onChange={handleSort} value={sortRole} className="p-2 rounded text-black">
            <option value="">All Roles</option>
            {[...new Set(members.flatMap(m => m.roles))].map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="bg-yellow-500 text-black px-4 py-2 rounded">Export CSV</button>
            <button onClick={fetchMembers} className="bg-blue-600 text-white px-4 py-2 rounded">Refresh</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {currentMembers.map(m => (
          <div key={m.id} className="bg-white text-black p-4 rounded shadow relative">
            <h3 className="text-xl font-bold">{m.name}</h3>
            <p>Email: {m.email}</p>
            <p>Phone: {m.phone}</p>
            <p>Type: {m.type}</p>
            <p>Authority: {m.authority}</p>
            <p>Profile: {m.profile}</p>
            <p>Definition: {m.definition}</p>
            <p>Strategy: {m.strategy}</p>
            <p>Not-Self Theme: {m.not_self_theme}</p>
            <p>Incarnation Cross: {m.incarnation_cross}</p>
            <p className="mt-2"><span className="font-bold">Roles:</span> {m.roles.join(', ')}</p>
            {m.description && (
              <details className="mt-2">
                <summary className="font-semibold cursor-pointer">View Description</summary>
                <p className="mt-1 whitespace-pre-line text-sm">{m.description}</p>
              </details>
            )}
            {m.chart_filename && (
              <img
                src={`https://seedteam.onrender.com/uploads/${m.chart_filename}`}
                alt="Chart"
                className="mt-2 max-w-xs border rounded"
              />
            )}
            <button
              onClick={() => deleteMember(m.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
