import mongoose from "mongoose";
import colors from 'colors'
const connectDB =async ()=>{
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATA_BASE}`)
        console.log(`conectado ao banco de dados MongoDB ${conn.connection.host}`.bgCyan.white)
    }catch(err){
        console.log(`Erro no mongoDB ${err}`.bgRed.white)
    }
}

export default connectDB