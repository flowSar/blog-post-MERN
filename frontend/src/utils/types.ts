export interface PostInterface {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  createdAt: string;
  comment: number;
  like: number;
  author: {
    username: string;
  };
}

export interface UserInterface {
  _id: string;
  username: string;
  email: string;
  profileImage: string;
  bio: string;
  role: string;
  permissions: string[];
}
