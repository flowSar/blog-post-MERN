import { Link } from "react-router";
import { deletePost } from "../services/api/PostApi";
import type { PostInterface } from "../utils/types";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import CanDeletePost from "./permissions/CanDeletePost";
import CanUpdatePost from "./permissions/CanUpdatePost";

function LinearPostCard({ post }: { post: PostInterface }) {
  const handleDeletePost = async () => {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      const { success, message } = await deletePost(post._id);
      if (success) {
        window.location.href = "/dashboard";
      } else {
        alert(`delete failed ${message}`);
      }
    }
  };
  if (!post) {
    return <></>;
  }
  return (
    <div className='h-48 flex shadow-md dark:bg-dark-blue shadow-black/20 rounded-lg overflow-hidden'>
      <div className='w-2/5 p-2'>
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt='cover image'
            className='w-full h-full object-cover'
          />
        ) : (
          <></>
        )}
      </div>
      <div className='w-3/4 p-2 md:p-4 flex flex-col'>
        <h1 className='text-md md:text-xl font-bold'>{post.title}</h1>
        <p className='flex-1 py-2'>{post.description}</p>
        <div className='flex justify-between'>
          <div className='w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:justify-between md:items-center'>
            <div className='flex gap-4'>
              <div className='flex'>
                <LikeIcon /> ({post.like})
              </div>
              <div className='flex'>
                <CommentIcon /> ({post.comment})
              </div>
              <h4>{new Date(post.createdAt).toLocaleDateString()}</h4>
            </div>
            <div className='flex gap-2'>
              <CanDeletePost>
                <button
                  onClick={handleDeletePost}
                  className='bg-red-500 text-white py-1.5 px-4 rounded-md font-bold cursor-pointer'
                >
                  Delete
                </button>
              </CanDeletePost>
              <CanUpdatePost>
                <Link
                  to={`/posts/${post._id}/edit`}
                  state={{ post }}
                  className='bg-green-500 text-white py-1.5 px-4 rounded-md font-bold cursor-pointer'
                >
                  Edit
                </Link>
              </CanUpdatePost>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinearPostCard;
