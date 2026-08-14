"use client";

import { useState } from "react";

export default function AddMemberForm({
  onSubmit,
  loading,
}) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "MALE",
    relation: "SON",
    aadhaarNumber: "",
    mobile: "",
    status: "ACTIVE",
    isHead: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      dob: new Date(form.dob).toISOString(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl text-gray-600 border bg-white p-6"
    >
      <h2 className="text-lg font-semibold">
        Add New Member
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">
            Female
          </option>
          <option value="OTHER">Other</option>
        </select>

        <input
          name="relation"
          placeholder="Relation"
          value={form.relation}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        />

        <input
          name="aadhaarNumber"
          placeholder="Aadhaar Number"
          value={form.aadhaarNumber}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          className="rounded-lg border px-3 py-2"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isHead"
          checked={form.isHead}
          onChange={handleChange}
        />

        Head of Family
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Adding..."
          : "Add Member"}
      </button>
    </form>
  );
}