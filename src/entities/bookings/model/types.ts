type BookingStaus = 'Pending' | 'Accepted' | 'Completed' | 'Cancelled';

export interface BookingReuqest {
  scheduleId: string;
  guestCount: number;
}

export interface BookingStatusCount {
  pending: {
    count: number;
    hasUnread: boolean;
  };
  accepted: {
    count: number;
    hasUnread: boolean;
  };
  completed: {
    count: number;
    hasUnread: boolean;
  };
  cancelled: {
    count: number;
    hasUnread: boolean;
  };
}

export interface BookingResponse {
  id: string;
  scheduleId: string;
  guestId: string;
  guestCount: number;
  status: BookingStaus;
  statusAt: string;
  createdAt: string;
  experience: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
  schedule: {
    date: string;
    startTime: string;
    endTime: string;
  };
  canReview: boolean;
}
