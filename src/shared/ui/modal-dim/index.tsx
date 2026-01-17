import React from 'react';

function ModalDim({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed  w-full h-full bg-black/40 px-4 flex justify-center items-center z-50 inset-0"
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}

export default ModalDim;
