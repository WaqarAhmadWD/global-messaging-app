const sidebarComponent = () => {
  const chats = [
    { id: 0, title: "all chats" },
    { id: 1, title: "all chats" },
    { id: 2, title: "all chats" },
    { id: 3, title: "all chats" },
    { id: 4, title: "all chats" },
    { id: 5, title: "all chats" },
  ];
  return (
    <div className=" left-0 top-0 h-full lg:w-64 hidden lg:block fixed  border-r text-white bg-black">
      <div className="flex flex-col justify-between w-full h-full p-4 gap-y-6">
        <div className="w-full flex justify-center pt-2">
          <img src="images/dark-logo.svg" alt="" className="w-fit" />
        </div>
        <div className="grow">
          {chats.map((e) => {
            return (
              <div
                key={e.id}
                className="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center"
              >
                <div className="flex gap-2 items-center">
                  <img src="images/chat.svg" alt="" className="w-4" />
                  <div>{e.title}</div>
                </div>
                <div className="w-5 h-5 rounded-full bg-gray-500 flex justify-center items-center text-sm">
                  1
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <div className="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
            <div className="flex gap-2 items-center">
              <img src="images/setting.svg" alt="" className="w-4" />
              <div>setting</div>
            </div>
          </div>
          <div className="m-2 px-4 py-2 flex justify-between hover:bg-gray-700 transition-all duration-100 rounded-xl cursor-pointer items-center">
            <div className="flex gap-2 items-center">
              <img src="images/logout.svg" alt="" className="w-4" />
              <div>login</div>
            </div>
            <img src="/images/logout-door.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default sidebarComponent;
