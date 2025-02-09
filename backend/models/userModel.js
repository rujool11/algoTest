import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userModel = mongoose.Schema(
    {
        username: { type: String, required: true , unique: true},
        email: { type: String, required: true , validate : [validator.isEmail, 'Please enter a valid email']},
        password: { type: String, required: true },
        picture : { type: String, required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        problems: { type: Number, required: true, default: 0},
    }
)

userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userModel.pre("save", async function (next) {
    if (!this.isModified) {next();} // if current userModel is not modified, move on to next, i.e code after this is not executed

    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt); // encrypt password
});

const User = mongoose.model("User", userModel);
export default User;