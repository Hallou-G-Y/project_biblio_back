// Imports
import mongoose from "mongoose"
const dbLink = "mongodb+srv://"+process.env.MONGODB_LOGIN+"@ynovproject.q4wl1.mongodb.net/?retryWrites=true&w=majority&appName=YnovProject"

export const database = (userLogin: string) => {
    mongoose
    .connect("mongodb+srv://"+userLogin+"@ynovproject.q4wl1.mongodb.net/?retryWrites=true&w=majority&appName=YnovProject",
        {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        }
    ).then(() => console.log("Connected to database"))
    .catch(err => console.error("Failed to connect database",err))
}

/* const main = async () => {
    await mongoose.connect(database).then(() => console.log("Connected to database"))
}
main().catch(err => console.error(err)) */