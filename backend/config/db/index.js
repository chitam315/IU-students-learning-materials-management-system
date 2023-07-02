import mongoose from "mongoose";

class Mongo {
    // gridfs = null
    // static async connect() {
    //     console.log('connecting');
    //     try {
    //         await mongoose.connect(process.env.MONGO_URI);
    //         console.log('Connect successfully!!!');
            
    //     } catch (error) {
    //         console.log('Connect failed!!!');
    //         throw error
    //     }
    //     const conn = mongoose.connection
    //         conn.once("open", () => {
    //             // connect gridFS
    //             this.gridfs = new mongoose.mongo.GridFSBucket(conn.db, {
    //                 bucketName: "uploads"
    //             })
    //         })
    // }
    static connect = () => {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => {console.log("Connect to DB successfullyyy");})
        .catch((err) => {console.log("cannot connect to DB");})
        .finally(() => {
            const conn = mongoose.connection
            this.gridfs = new mongoose.mongo.GridFSBucket(conn.db,{
                bucketName: process.env.BUCKET_NAME
            })
            // console.log(this.gridfs);
            // conn.once("open", () => {
            //     console.log('run once');
                
            // })
        })
    }
}

export default Mongo