import Sidebar from "@/components/sidebar";
import SidebarRight from "@/components/sidebar-right";
import MobileHeader from "@/components/MobileHeader";
import MobileFooter from "@/components/MobileFooter";
import NotificationCounter from "@/components/NotificationCounter";
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
      <MobileHeader />
      <MobileFooter />
      <div className="bg-black text-white min-h-screen  lg:ps-64 lg:pe-96 py-[3rem] lg:py-0">
        <div className="sm:px-8 px-2 pt-8 flex flex-col gap-4 w-full h-full">
          <div className="lg:hidden ">
            <h1 className="text-[#999999] mb-2">Advertisement</h1>
            <div className="flex gap-2">
              <div className="w-full aspect-[1.7] rounded-xl bg-purple-500"></div>
              <div className="w-full aspect-[1.7] rounded-xl bg-purple-500"></div>
            </div>
          </div>
          <div className="text-3xl font-bold opacity-75">All Chats</div>
          <div className="flex justify-between items-center">
            <img src="/images/filter.svg" alt="" className="h-8" />
            <img src="/images/search.svg" alt="" className="h-8" />
            {/* <input
              type="text"
              className="bg-transparent bg-white  px-4 py-1 border-2 border-gray-700 rounded-2xl"
              placeholder="Search Here!"
            /> */}
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
                  <NotificationCounter />
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
