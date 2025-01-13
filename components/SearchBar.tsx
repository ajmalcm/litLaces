import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CloseIcon from "@mui/icons-material/Close";

export default function TopDrawer({
  isSearch,
  toggleSearch,
}: {
  isSearch: boolean;
  toggleSearch: any;
}) {
  const content = (
    <div className="flex gap-4 justify-center items-center py-4 bg-[#0a0a0a] text-white">
      <input
        placeholder="Search Products"
        className="rounded-xl w-[85%] md:w-[500px] border-[1px] border-gray-400 p-3 bg-[#0a0a0a]"
      />
      <CloseIcon onClick={toggleSearch(false)} className="cursor-pointer" />
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="top"
        open={isSearch}
        onClose={toggleSearch(false)}
        onOpen={toggleSearch(true)}
      >
        {content}
      </SwipeableDrawer>
    </div>
  );
}
