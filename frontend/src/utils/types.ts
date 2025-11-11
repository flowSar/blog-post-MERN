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
