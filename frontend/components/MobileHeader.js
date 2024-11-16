import React from "react";

function MobileHeader() {
  return (
    <div className="top-0 w-full lg:hidden fixed text-white p-[1rem] bg-black z-20">
      <div className="flex w-full h-full justify-between items-center">
        <img src="images/dark-logo.svg" alt="" className="h-[2rem]" />
        <div className="flex justify-center items-center gap-4">
          <img src="/images/notification.svg" alt="" />
          <img src="/images/setting.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
