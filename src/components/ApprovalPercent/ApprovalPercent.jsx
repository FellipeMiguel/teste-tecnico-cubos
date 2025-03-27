import React from "react";

const ApprovalPercent = ({ votePercent, degree }) => {
  return (
    <>
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(#fbbf24 ${degree}deg, #d1d5db ${degree}deg)`,
        }}
      ></div>
      <div className="absolute inset-2 rounded-full flex items-center justify-center bg-[#121113]">
        <span className="text-white font-bold text-lg">{votePercent}%</span>
      </div>
    </>
  );
};

export default ApprovalPercent;
