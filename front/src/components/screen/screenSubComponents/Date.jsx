import React from "react";

function Date({ date }) {
  return (
    <div className="text-center my-2">
      <span className="bg-prim1 py-1 px-4 text-[10px] rounded-md">{date}</span>
    </div>
  );
}

export default Date;
