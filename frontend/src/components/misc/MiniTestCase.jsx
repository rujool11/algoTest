import React from "react";

const MiniTestCase = ({ testCase, onSelect, selected }) => {
  return (
    <div
      onClick={() => onSelect(testCase)}
      className={`cursor-pointer border-t border-gray-300 pt-2 mt-2 px-4 ${
        selected ? "bg-gray-700" : ""
      }`}
    >
      <h3 className="text-sm text-white">Input:</h3>
      <div className="font-mono bg-gray-900 p-2 rounded-md text-white text-sm whitespace-pre-wrap">
        {testCase.input}
      </div>

      <h3 className="text-sm text-white mt-2">Output:</h3>
      <div className="font-mono bg-gray-900 p-2 rounded-md text-white text-sm whitespace-pre-wrap">
        {testCase.output}
      </div>
    </div>
  );
};

export default MiniTestCase;
