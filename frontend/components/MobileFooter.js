import React from "react";

function MobileFooter() {
  const data = [
    { img: "/images/all_chats.svg", title: "All Chats" },
    { img: "/images/grou_chats.svg", title: "Group Chats" },
    { img: "/images/stores.svg", title: "Stories" },
    { img: "/images/chat_requests.svg", title: "Chat Requests" },
    { img: "/images/more.svg", title: "Mores" },
  ];
  return (
    <div className="bottom-0 w-full lg:hidden fixed    text-white p-[1rem] bg-black">
      <div className="w-full h-full flex justify-between md:justify-center md:gap-8 items-center">
        {data.map((e, i) => (
          <div key={i} className="flex flex-col gap-2 items-center">
            <img src={e.img} alt="" className="w-6" />
            <div className="text-[0.75rem]">{e.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileFooter;
