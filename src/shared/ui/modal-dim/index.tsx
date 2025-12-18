import React from 'react';

function ModalDim({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/40 px-4 flex justify-center items-center">
      {children}
    </div>
  );
}

export default ModalDim;
