import { Router } from "express";
import { JWT } from "../services/jwt";
import { AdminRepository } from "../repositories";
import { AdminController } from "../../controllers/admin.controller";
import { AdminUseCase } from "../../use-cases/admin.use-case";

//services
const jwt = new JWT();

//repositories
const adminRepository = new AdminRepository();

//usecases
const adminUseCase = new AdminUseCase(adminRepository, jwt);

//controllers
const adminController = new AdminController(adminUseCase);

const router = Router();

router.post("/login", (req, res, next) => adminController.login(req, res));
router.post("/resident/create", (req, res, next) =>
  adminController.createResident(req, res)
);
router.get("/residents", (req, res, next) =>
  adminController.getResidents(req, res)
);

// router.get("/", AdminController.getWelcomeMessage);
// router.post("/logout", AdminController.logout);

// router.post(
//   "/users/create",
//   upload.single("image"),
//   AdminController.createUser
// );

// router.get("/users", AdminController.getAllUsers);
// router.patch("/users/block/:id", AdminController.blockUser);

// router.post(
//   "/caretakers/create",
//   upload.single("image"),
//   AdminController.createCaretaker
// );
// router.get("/caretakers", AdminController.getAllCaretakers);

export default router;
