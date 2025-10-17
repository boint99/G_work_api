import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const employees = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    userName: { type: String, trim: true },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee"
    },

    fullName: { type: String, required: true, trim: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other"
    },
    dateOfBirth: { type: Date },
    phone: { type: String },
    avatarUrl: { type: String, default: "" },

    employeeCode: { type: String, unique: true },
    department: { type: String },
    position: { type: String },
    joinDate: { type: Date },
    status: {
      type: String,
      enum: ["active", "inactive", "resigned"],
      default: "active"
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" }
  },
  {
    timestamps: true
  }
)

employees.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

employees.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

const employees = mongoose.model("Employee", employees)

export const employeeModel = {
  employeeModel
}