// Imports
import mongoose from "mongoose"
import { isEmail } from "validator"

// Schema du model User
const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxLength: 55
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// Export du model User
const User = mongoose.model("User", userSchema)
export default User