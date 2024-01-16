interface Timezone {
  name: string;
  transitions: {
    ts: number;
    time: string;
    offset: number;
    isdst: boolean;
    abbr: string;
  }[];
  location: {
    country_code: string;
    latitude: number;
    longitude: number;
    comments: string;
  };
}

interface CreatedAt {
  timezone: Timezone;
  offset: number;
  timestamp: number;
}
interface Post {
  id: string;
  description: string;
  imageUrl: string;
  createdBy: User;
  createdAt: CreatedAt;
  likeds: [
    {
      id: string;
    }
  ];
  comments: Comment[];
}
