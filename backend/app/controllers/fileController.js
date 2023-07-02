import Mongo from "../../config/db/index.js";
import { catchAsync } from "../middlewares/async.js";
import ApiError from '../../utils/ApiError.js'

class fileController {
    // [GET] /file/:filename

    getAllFiles = catchAsync( async(req,res,next) => {
        const { filename } = req.params
        console.log("file name is : ",filename);
        // console.log("Gridfs bucket is : ",Mongo.gridfs);
        // Mongo.gridfs.find({filename}).toArray((err, files) => {
        //     console.log("fileeeeeee : ");
        //     if (err || !files || !files.length) {
        //         // throw new ApiError(500,'Can not read file')
        //         console.log("loiiiiiiiiii");
        //     }
        //     Mongo.gridfs.openDownloadStreamByName(filename).pipe(res)
        // })

        Mongo.gridfs.openDownloadStreamByName(filename).pipe(res)
        // res.json("test")
        // Mongo.gridfs.find({filename}).toArray((e,i) => {console.log(i);})
        // console.log('test');
        
    })

}

export default new fileController();