import { useRef, useState, type ChangeEvent } from "react";
import TextInput from "../components/TextInput";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import uploadIconSvg from "../assets/icons/upload-img.svg";
import { useUploadImage } from "../hooks/useUploadImage";
import { updatePost } from "../services/api/PostApi";
import LoadingOverlay from "../components/LoadingOverlay";
import { useLocation } from "react-router";

function EditPost() {
  const location = useLocation();
  const post = location.state?.post;

  const [content, setContent] = useState(post?.content || "");
  const [description, setDescription] = useState(post?.description || "");
  const [title, setTitle] = useState(post?.title || "");
  const [coverPreview, setCoverPreview] = useState(post?.coverImage || "");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { uploadImag } = useUploadImage();

  const handleImageLoading = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCoverImageFile(file);
    setCoverPreview(URL.createObjectURL(file!));
  };

  const handlePostUpdate = async () => {
    setLoading(true);
    try {
      if (coverImageFile) {
        const { imageUrl } = await uploadImag(coverImageFile);
        if (imageUrl) {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("content", content);
          formData.append("coverImage", imageUrl);

          //   const { success, errors, post } = await createPost(form);
          const { success, errors, data, message } = await updatePost(
            post._id,
            formData
          );
          if (success) {
            alert("posts created");
            console.log("post: ", data);
            setContent("");
            setTitle("");
            setDescription("");
            setCoverPreview("");
          } else {
            alert(`updated post failed ${message}`);
          }
        } else {
          alert("IMage upload failed");
        }
      }
    } catch (error) {
      alert("something wen wrong try again");
    } finally {
      setLoading(false);
    }
  };

  const OpenFileManager = () => {
    inputRef.current?.click();
  };

  return (
    <div className='flex-1 flex flex-col w-full md:w-[70%] mt-4 mx-auto bg-white dark:bg-light-blue px-4 py-4 md:px-10 md:py-4 '>
      <div className='self-end my-2 space-x-4'>
        <button
          onClick={handlePostUpdate}
          className='py-2 px-6 bg-green-500 rounded-lg cursor-pointer'
        >
          Update
        </button>
      </div>
      <div
        onClick={OpenFileManager}
        id='cover'
        className='relative group h-[200px] md:h-[300px] border border-gray-300 mb-4 flex items-center justify-center cursor-pointer '
      >
        <input
          type='file'
          onChange={handleImageLoading}
          ref={inputRef}
          className='hidden'
          accept='image/*'
          hidden
        />
        <img
          src={coverPreview || "example.png"}
          className='w-full h-full  object-cover group-hover:opacity-50 duration-300'
        />
        <img
          src={uploadIconSvg}
          className='absolute h-32 w-32 opacity-0 group-hover:opacity-100 transition-all duration-200'
        />
      </div>
      <TextInput
        label='Title'
        name={"title"}
        value={title}
        onChangeValue={(e) => setTitle(e.target.value)}
      />
      <div className='w-full my-4'>
        <label>Post Description: </label>
        <textarea
          className='bg-gray-100 dark:bg-dark-blue dark:text-white w-full h-20 mt-2 p-4'
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <ReactQuill
        theme='snow'
        value={content}
        onChange={setContent}
        className='w-ful h-72 bg-white text-black pb-20'
      />
      {loading ? <LoadingOverlay show={loading} /> : <></>}
    </div>
  );
}

export default EditPost;
