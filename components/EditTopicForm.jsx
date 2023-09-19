"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EditTopicForm = ({ id, title, description }) => {
  const [newtitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newtitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error("somethig went wrong");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        className="border border-slate-400 px-8 py-2"
        type="text"
        placeholder="Topic Title"
        value={newtitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <input
        className="border border-slate-400 px-8 py-2"
        type="text"
        placeholder="Topic Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <button className="bg-green-600 font-bold text-white py-3 px-6  ">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
