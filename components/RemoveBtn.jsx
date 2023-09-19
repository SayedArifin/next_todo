"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
const RemoveBtn = ({ id }) => {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure you want to remove?");
    if (confirmed) {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `?id=${id}`, {
        method: "DELETE",
      });

      router.refresh();
    }
  };
  return (
    <button onClick={removeTopic}>
      <HiOutlineTrash size={24} color="red" />
    </button>
  );
};

export default RemoveBtn;
