import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MobileFooter() {
  const pathname = usePathname();
  const data = [
    { id: 0, url: "/", img: "/images/all_chats.svg", title: "All Chats" },
    { id: 1, url: "/1", img: "/images/grou_chats.svg", title: "Group Chats" },
    { id: 2, url: "/2", img: "/images/stores.svg", title: "Stories" },
    {
      id: 3,
      url: "/Chat_request",
      img: "/images/chat_requests.svg",
      title: "Chat Requests",
    },
    { id: 4, url: "/3", img: "/images/more.svg", title: "More" },
  ];
  return (
    <div className="bottom-0 w-full lg:hidden fixed    text-white p-[1rem] bg-black">
      <div className="w-full h-full flex justify-between md:justify-center md:gap-8 items-center">
        {data.map((e, i) => (
          <Link
            href={e.url}
            key={i}
            className={`flex flex-col gap-2 items-center  ${
              pathname === e.url ? "bg-gray-700 p-1 rounded-2xl" : ""
            }`}
          >
            <img src={e.img} alt="" className="w-6" />
            <div className="text-[0.75rem]">{e.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MobileFooter;
