import React from "react";

const MiniTestCase = ({ testCase, onSelect, selected }) => {
  return (
    <div
      onClick={() => onSelect(testCase)}
      className={`cursor-pointer border-t border-gray-300 pt-2 mt-2 px-4 ${
        selected ? "bg-gray-700" : ""
      }`}
    >
      <h3 className="font-semibold text-lg text-white">Input: {testCase.input}</h3>
      <p className="text-sm text-white">Output: {testCase.output}</p>
    </div>
  );
};

export default MiniTestCase;
