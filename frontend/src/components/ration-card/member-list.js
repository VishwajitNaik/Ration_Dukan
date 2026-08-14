export default function MemberList({
  members = [],
}) {
  return (
    <div className="rounded-xl border bg-white text-gray-700 shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Family Members
        </h2>
      </div>

      <div className="divide-y">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex items-center justify-between px-6 py-4"
          >
            <div>
              <p className="font-medium">
                {member.name}
              </p>

              <p className="text-sm text-gray-500">
                {member.relation} •{" "}
                {member.gender}
              </p>
            </div>

            {member.isHead && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                Head
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}