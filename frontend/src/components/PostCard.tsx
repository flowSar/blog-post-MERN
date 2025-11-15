import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";

interface PostInterface {
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

interface PostCardProps {
  post: PostInterface;
}

function PostCard({ post }: PostCardProps) {
  const coverImage = post.coverImage
    ? post.coverImage
    : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
  return (
    <div className='rounded-lg overflow-hidden dark:bg-light-blue shadow-md shadow-light-blue hover:shadow-lg hover:shadow-white/20'>
      <div>
        <div className='h-48'>
          <img src={coverImage!} className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='py-4 px-4 flex flex-col space-y-2'>
        <div className='flex items-center gap-4'>
          <div className='h-10 w-10 bg-blue-500 rounded-full'></div>
          <div>
            <h4 className='text-sm font-bold'>{post.author.username}</h4>
            <h5 className='text-sm'>{post.createdAt}</h5>
          </div>
        </div>
        <h1 className='text-xl font-bold'>{post.title}</h1>
        <p>
          {post.description
            ? post.description
            : "A comprehensive guide to starting your journey in web development with the latest technologies and best"}
        </p>
        <div className='flex gap-2 mt-4'>
          <div className='flex space-x-2 items-center'>
            <LikeIcon /> <span>({post.like})</span>
          </div>
          <div className='flex space-x-2 items-center'>
            <CommentIcon /> <span>({post.comment})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
