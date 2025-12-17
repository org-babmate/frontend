import React from 'react';

function BookingStatus() {
  return (
    <div className="flex flex-row">
      <Status status={'Pending'} value={'0'} />
      <Status status={'Accepted'} value={'0'} />
      <Status status={'Cancelled'} value={'0'} />
      <Status status={'Completed'} value={'0'} />
    </div>
  );
}

function Status({ status, value }: { status: string; value: string }) {
  return (
    <div className="px-2.5 justify-between items-center flex flex-col gap-4">
      <div className="text-body-lg">{status}</div>
      <div className="text-body-lg">{value}</div>
    </div>
  );
}

export default BookingStatus;
