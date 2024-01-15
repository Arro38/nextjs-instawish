interface Post {
  attributes: {
    id: string;
    description: string;
    imageUrl: string;
    createdBy: User;
    likeds: {
      user: {
        id: string;
      }[];
    };
    comments: Comment[];
  };
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}
