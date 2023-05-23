import studentRouter from "./student.js";
import authRouter from "./auth.js";
import adminRouter from './admin.js'
import courseRouter from './course.js'

function router(app) {
  // app.use("/student", studentRouter);
  app.use("/auth", authRouter);
  app.use("/admin",adminRouter)
  app.use("/course",courseRouter)
}

export default router;
