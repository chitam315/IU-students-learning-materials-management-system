import studentRouter from "./student.js";
import authRouter from "./auth.js";
import adminRouter from './admin.js'
import courseRouter from './course.js'
import fileRouter from './file.js'

function router(app) {
  // app.use("/student", studentRouter);
  app.use("/auth", authRouter);
  app.use("/admin",adminRouter)
  app.use("/course",courseRouter)
  app.use("/file",fileRouter)
  
}

export default router;
