import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebar-right";
export default function Home() {
  const message = [
    {
      id: 0,
      contact: "Sufyan Khan",
      message: "Last message would appear here an...",
    },
    {
      id: 1,
      contact: "Waqar Ahmad",
      message: "Last message would appear here an...",
    },
    {
      id: 2,
      contact: "Jamal",
      message: "Last message would appear here an...",
    },
    {
      id: 3,
      contact: "Aslam",
      message: "Last message would appear here an...",
    },
    {
      id: 4,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 5,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 6,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 7,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 8,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 9,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
    {
      id: 10,
      contact: "Kamal",
      message: "Last message would appear here an...",
    },
  ];
  return (
    <>
      <Sidebar />
      <SidebarRight />
      <div className="bg-black text-white min-h-screen  lg:ps-64 lg:pe-96 ">
        <div className="px-8 pt-8 flex flex-col gap-4 w-full h-full">
          <div className="text-3xl font-bold opacity-75">All Chats</div>
          <div className="">
            <img src="/images/filter.svg" alt="" className="h-8" />
          </div>
          <div>
            <div className="bg-[#5F5F5F] h-[1px]"></div>
            {message.map((e) => (
              <div
                className="flex gap-2 justify-between py-4 border-b border-[#5F5F5F]  px-4 mb-2 items-center hover:bg-slate-900  cursor-pointer transition-all duration-200"
                key={e.id}
              >
                <div className=" flex gap-2 items-center">
                  <img
                    src="/images/profile.svg"
                    alt=""
                    className="md:w-16 md:h-16 w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">{e.contact}</h1>
                    <p className="text-sm md:text-md">{e.message}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-6 aspect-[2] rounded-full bg-slate-600 flex justify-center items-center">
                    1
                  </div>
                  <img src="/images/menu.svg" alt="" className="h-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
