"use client";
import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import Loading from "./Loading";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setTopics(data.topics);
      } catch (error) {
        console.log("error loading topics", error);
      }
    };

    getTopics();
  }, []);

  return (
    <>
      {topics.length > 0 ? (
        <div>
          {topics.map((topic) => (
            <div
              key={topic._id}
              className="flex justify-between p-4 border border-slate-300 my-3 gap-5 items-start"
            >
              <div className="">
                <h2 className="font-bold text-2xl">{topic.title}</h2>
                <p className="">{topic.description}</p>
              </div>
              <div className="flex gap-2">
                <RemoveBtn id={topic._id} />
                <Link href={`/editTopic/${topic._id}`}>
                  <HiPencilAlt size={24}></HiPencilAlt>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TopicList;
