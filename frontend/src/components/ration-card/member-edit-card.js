"use client";

import { useState } from "react";

export default function MemberEditCard({
  member,
  onSave,
  loading,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [form, setForm] = useState({
    name: member.name || "",
    dob: member.dob
      ? member.dob.split("T")[0]
      : "",
    gender: member.gender || "MALE",
    relation: member.relation || "",
    aadhaarNumber:
      member.aadhaarNumber || "",
    mobile: member.mobile || "",
    status: member.status || "ACTIVE",
    isHead: member.isHead || false,
  });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSave({
      ...form,
      dob: new Date(
        form.dob
      ).toISOString(),
    });

    setIsEditing(false);
  };

  return (
    <div className="rounded-xl text-gray-900 border bg-white p-4">
      {/* Compact View */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">
            {member.name}
          </p>

          <p className="text-sm text-gray-500">
            {form.dob} • {member.relation}
          </p>

          <p className="text-sm text-gray-500">
            {member.gender}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {member.isHead && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
              Head
            </span>
          )}

          <button
            type="button"
            onClick={() =>
              setIsEditing(
                !isEditing
              )
            }
            className="rounded-lg border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            {isEditing
              ? "Cancel"
              : "Edit"}
          </button>
        </div>
      </div>

      {/* Expanded Edit Form */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 border-t pt-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
              placeholder="Name"
              className="rounded-lg border px-3 py-2"
            />

            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={
                handleChange
              }
              className="rounded-lg border px-3 py-2"
            />

            <select
              name="gender"
              value={form.gender}
              onChange={
                handleChange
              }
              className="rounded-lg border px-3 py-2"
            >
              <option value="MALE">
                Male
              </option>
              <option value="FEMALE">
                Female
              </option>
              <option value="OTHER">
                Other
              </option>
            </select>

            <input
              name="relation"
              value={
                form.relation
              }
              onChange={
                handleChange
              }
              placeholder="Relation"
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="aadhaarNumber"
              value={
                form.aadhaarNumber
              }
              onChange={
                handleChange
              }
              placeholder="Aadhaar Number"
              className="rounded-lg border px-3 py-2"
            />

            <input
              name="mobile"
              value={form.mobile}
              onChange={
                handleChange
              }
              placeholder="Mobile"
              className="rounded-lg border px-3 py-2"
            />

            <select
              name="status"
              value={form.status}
              onChange={
                handleChange
              }
              className="rounded-lg border px-3 py-2"
            >
              <option value="ACTIVE">
                Active
              </option>
              <option value="INACTIVE">
                Inactive
              </option>
              <option value="DECEASED">
                Deceased
              </option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isHead"
              checked={
                form.isHead
              }
              onChange={
                handleChange
              }
            />

            Head of Family
          </label>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setIsEditing(
                  false
                )
              }
              className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";

// export default function MemberEditCard({
//   member,
//   onSave,
//   loading,
// }) {
//   const [form, setForm] = useState({
//     name: member.name || "",
//     dob: member.dob
//       ? member.dob.split("T")[0]
//       : "",
//     gender: member.gender || "MALE",
//     relation: member.relation || "",
//     aadhaarNumber:
//       member.aadhaarNumber || "",
//     mobile: member.mobile || "",
//     status: member.status || "ACTIVE",
//     isHead: member.isHead || false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } =
//       e.target;

//     setForm({
//       ...form,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onSave({
//       ...form,
//       dob: new Date(form.dob).toISOString(),
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="rounded-xl border bg-white text-gray-800 p-4 space-y-4"
//     >
//       <div className="flex items-center justify-between">
//         <h3 className="font-semibold">
//           {member.name}
//         </h3>

//         {member.isHead && (
//           <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700">
//             Head
//           </span>
//         )}
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2">
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="rounded-lg border px-3 py-2"
//         />

//         <input
//           type="date"
//           name="dob"
//           value={form.dob}
//           onChange={handleChange}
//           className="rounded-lg border px-3 py-2"
//         />

//         <select
//           name="gender"
//           value={form.gender}
//           onChange={handleChange}
//           className="rounded-lg border px-3 py-2"
//         >
//           <option value="MALE">Male</option>
//           <option value="FEMALE">
//             Female
//           </option>
//           <option value="OTHER">Other</option>
//         </select>

//         <input
//           name="relation"
//           value={form.relation}
//           onChange={handleChange}
//           placeholder="Relation"
//           className="rounded-lg border px-3 py-2"
//         />

//         <input
//           name="aadhaarNumber"
//           value={form.aadhaarNumber}
//           onChange={handleChange}
//           placeholder="Aadhaar Number"
//           className="rounded-lg border px-3 py-2"
//         />

//         <input
//           name="mobile"
//           value={form.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="rounded-lg border px-3 py-2"
//         />

//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="rounded-lg border px-3 py-2"
//         >
//           <option value="ACTIVE">Active</option>
//           <option value="INACTIVE">
//             Inactive
//           </option>
//           <option value="DECEASED">
//             Deceased
//           </option>
//         </select>
//       </div>

//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           name="isHead"
//           checked={form.isHead}
//           onChange={handleChange}
//         />

//         Head of Family
//       </label>

//       <button
//         type="submit"
//         disabled={loading}
//         className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
//       >
//         {loading
//           ? "Saving..."
//           : "Update Member"}
//       </button>
//     </form>
//   );
// }