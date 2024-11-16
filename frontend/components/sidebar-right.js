const sidebarComponent = () => {
  const chats = [
    { id: 0, title: "all chats" },
    { id: 1, title: "all chats" },
    { id: 2, title: "all chats" },
    { id: 3, title: "all chats" },
    { id: 4, title: "all chats" },
    { id: 5, title: "all chats" },
  ];
  const notif = [
    {
      id: 1,
      contact: "Sufyan Khan",
      message: "Last message would appear here an...",
    },
    {
      id: 2,
      contact: "Waqar Ahmad",
      message: "Last message would appear here an...",
    },
    {
      id: 3,
      contact: "Fayzan",
      message: "Last message would appear here an...",
    },
    {
      id: 4,
      contact: "Usman",
      message: "Last message would appear here an...",
    },
    { id: 5, contact: "Umar", message: "Last message would appear here an..." },
  ];
  return (
    <div className=" right-0 lg:w-96 hidden lg:block fixed   text-white h-full pr-[2.125rem]">
      <div className="flex flex-col justify-between w-full h-full p-4 gap-y-12 border-l">
        <div className="w-full flex justify-between pt-4 ">
          <img src="/images/profile.svg" alt="" className="w-12 h-12" />
          <img src="/images/profile.svg" alt="" className="w-12 h-12" />
          <img src="/images/profile.svg" alt="" className="w-12 h-12" />
          <img src="/images/profile.svg" alt="" className="w-12 h-12" />
          <img src="/images/profile.svg" alt="" className="w-12 h-12" />
        </div>
        <div className=" flex flex-col gap-4">
          <div className="w-full bg-purple-400 aspect-[2.2] rounded-xl"></div>
          <div className="w-full bg-purple-400 aspect-[2.2] rounded-xl"></div>
        </div>
        <div className="bg-[#383838] p-4 grow ">
          <div className="text-[1.125rem] font-bold">Notifications</div>
          {notif.map((e) => (
            <div
              className="  py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center "
              key={e.id}
            >
              <div className="flex gap-2 items-center">
                <img src="images/notification.svg" alt="" className="w-5" />
                <div>
                  <h1 className="font-semibold">{e.contact}</h1>
                  <p className="text-sm">{e.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="  text-[1.125rem] font-bold flex gap-2 items-center">
          <img src="/images/globe.svg" alt="" className="w-10 h-10" />
          <span>Public Club</span>
        </div> */}
      </div>
    </div>
  );
};

export default sidebarComponent;
