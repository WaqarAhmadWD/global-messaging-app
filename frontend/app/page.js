import PersonalContacts from "@/components/PersonalContacts";
export default function Home() {
  return (
    <>
      <div className="bg-black text-white min-h-screen   py-[3rem] lg:py-0">
        <div className="sm:px-8 px-2 pt-8 flex flex-col gap-4 w-full h-full">
          <div className="lg:hidden ">
            <h1 className="text-[#999999] mb-2">Advertisement</h1>
            <div className="flex gap-2">
              <div className="w-full aspect-[1.7] rounded-xl bg-purple-500"></div>
              <div className="w-full aspect-[1.7] rounded-xl bg-purple-500"></div>
            </div>
          </div>
          <div className="text-3xl font-bold opacity-75">Personal Accounts</div>
          <div className="flex justify-between items-center">
            <img src="/images/filter.svg" alt="" className="h-8" />
            <img src="/images/search.svg" alt="" className="h-8" />
            {/* <input
              type="text"
              className="bg-transparent bg-white  px-4 py-1 border-2 border-gray-700 rounded-2xl"
              placeholder="Search Here!"
            /> */}
          </div>
          <PersonalContacts />
        </div>
      </div>
    </>
  );
}
