import mongoose from "mongoose";

async function connect () {
    console.log('connecting');
    try {
        await mongoose.connect('mongodb://localhost:27017/IU_MATERIALS_MANAGEMENT_SYSTEM');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failed!!!');
        throw error
    }
}

export default {connect}