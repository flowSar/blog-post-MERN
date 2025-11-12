import type { PostInterface } from "../utils/types";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";

function SimpleLinearPostCard({ post }: { post: PostInterface }) {
  return (
    <div className='p-4 flex gap-4 hover:bg-dark-blue duration-200 hover:rounded-lg'>
      <div className='h-16 w-16 overflow-hidden'>
        {post.coverImage ? (
          <img src={post.coverImage} className='w-full h-full object-cover' />
        ) : (
          <div className=' bg-blue-400'></div>
        )}
      </div>

      <div className='flex-1'>
        <h1 className='text-xl font-bold'>{post.title}</h1>
        <h4 className='text-gray-400'>
          {new Date(post.createdAt).toDateString()}
        </h4>
      </div>
      <div className='flex gap-2'>
        <div className='flex text-gray-300 gap-1'>
          <LikeIcon />
          <span>{post.like}</span>
        </div>
        <div className='flex text-gray-300 gap-1'>
          <CommentIcon />
          <span>{post.comment}</span>
        </div>
      </div>
    </div>
  );
}

export default SimpleLinearPostCard;
