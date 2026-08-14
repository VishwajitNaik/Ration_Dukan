export default function CollectorSelect({
  members,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Collected By
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-1 w-full rounded-lg border px-3 py-2"
      >
        <option value="">
          Select Member
        </option>

        {members
          .filter(
            (m) =>
              !m.isDeleted &&
              m.status === "ACTIVE"
          )
          .map((member) => (
            <option
              key={member._id}
              value={member._id}
            >
              {member.name} (
              {member.relation})
            </option>
          ))}
      </select>
    </div>
  );
}