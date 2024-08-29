import { Router } from "express";
import { PostsUseCase, ReportsUseCase } from "@/use-cases";
import { CommentsController, PostsController } from "@/controllers/v1";
import { PostsRepository } from "@/infrastructure/repositories/mongo";
import { upload } from "@/infrastructure/middlewares/multer";
import S3Uploader from "@/infrastructure/services/s3Bucket";
import { currentUser } from "../../middlewares/current-user.middleware";
import { CommentsRepository } from "@/infrastructure/repositories/mongo/comments.repository";
import { CommentsUseCase } from "@/use-cases/comments.use-case";
import { ReportRepository } from "@/infrastructure/repositories/mongo/report.repository";

//services
const s3Uploader = new S3Uploader();

//repositories
const postsRepository = new PostsRepository();
const commentsRepository = new CommentsRepository();
const reportsReporitoy = new ReportRepository();

//usecases
const postsUseCase = new PostsUseCase(postsRepository);
const commentsUseCase = new CommentsUseCase(commentsRepository);
const reportsUseCase = new ReportsUseCase(reportsReporitoy);

//controllers
const postsController = new PostsController(
  postsUseCase,
  s3Uploader,
  reportsUseCase
);
const commentsController = new CommentsController(commentsUseCase);

const router = Router();

// Post Routes
router.post(
  "/posts/create",
  currentUser,
  upload.array("images"),
  (req, res, next) => postsController.createPosts(req, res, next)
);
router.get("/posts", (req, res, next) =>
  postsController.getPosts(req, res, next)
);

// router.get("/posts/:postId", (req, res, next) =>
//   postsController.getPostById(req, res, next)
// );

router.delete("/posts/:postId/delete", (req, res, next) =>
  postsController.deletePost(req, res, next)
);

router.post("/posts/:postId/reports/create", currentUser, (req, res, next) =>
  postsController.reportPost(req, res, next)
);
router.get("/posts/reports", (req, res, next) =>
  postsController.getReports(req, res, next)
);

// Comment Routes
router.post("/comments/:postId/create", currentUser, (req, res, next) =>
  commentsController.createComment(req, res, next)
);
router.get("/posts/:postId/comments", (req, res, next) =>
  commentsController.getCommentsByPostId(req, res, next)
);
router.get("/comments/:commentId", (req, res, next) =>
  commentsController.getCommentById(req, res, next)
);
router.post("/comments/:commentId/update", (req, res, next) =>
  commentsController.updateComment(req, res, next)
);
router.post("/comments/:commentId/delete", (req, res, next) =>
  commentsController.deleteComment(req, res, next)
);

export default router;
