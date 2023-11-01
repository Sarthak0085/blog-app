import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

//create comment
const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug: slug });

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

//update comment
const updateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    comment.desc = desc || comment.desc;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

//update comment by admin
const updateCommentByAdmin = async (req, res, next) => {
  try {
    const { desc, check } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    comment.desc = desc || comment.desc;
    comment.check = !comment.check;

    const updatedComment = await comment.save();
    return res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

const getCommentsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const filter = req.query.searchKeyword;
    const query = Comment.find({ userId });

    if (filter) {
      query.find({ desc: { $regex: filter, $options: "i" } });
    }

    console.log("Query:", query._conditions);

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;

    console.log("Page:", page);
    console.log("PageSize:", pageSize);
    console.log("Skip:", skip);

    const total = await query.countDocuments();
    const pages = Math.ceil(total / pageSize);

    console.log("Total:", total);
    console.log("Pages:", pages);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const data = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "post",
          select: ["title", "photo"],
        }
      ])
      .sort({ updatedAt: "desc" });

    console.log("Data:", data);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};



//delete comment
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId );
    await Comment.deleteMany({ parent: comment._id });

    if (!comment) {
      const error = new Error("Comment was not found");
      return next(error);
    }

    return res.json({
      message: "Comment is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllComments = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    let query = Comment.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await Comment.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const data = await query
      .skip(skip)
      .limit(pageSize)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
        {
          path: "post",
          select: ["title", "photo"],
        }
      ])
      .sort({ updatedAt: "desc" });

    return res.json({ data, totalCommentCount:total, currentPage: page, pageSize: pageSize, totalPages:pages});
  } catch (error) {
    next(error);
  }
};

export {
  createComment,
  updateComment,
  deleteComment,
  getAllComments,
  updateCommentByAdmin,
  getCommentsByUserId,
};