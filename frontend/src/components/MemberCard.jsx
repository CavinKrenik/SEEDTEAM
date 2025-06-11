// src/components/MemberCard.jsx
export default function MemberCard({ member }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-bold">{member.name}</h3>
      <p><strong>Email:</strong> {member.email}</p>
      <p><strong>Phone:</strong> {member.phone}</p>
      <p><strong>Type:</strong> {member.type}</p>
      <p><strong>Authority:</strong> {member.authority}</p>
      <p><strong>Profile:</strong> {member.profile}</p>
      <p><strong>Roles:</strong> {member.roles.join(', ')}</p>
      {member.chart_filename && (
        <img
          src={`http://localhost:5000/uploads/${member.chart_filename}`}
          alt="Chart"
          className="mt-2 max-w-xs border rounded"
        />
      )}
    </div>
  );
}
