import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema({
  tag: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
