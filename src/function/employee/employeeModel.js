import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CONNECT_DB } from "~/config/db";

const employeeSchema = new mongoose.Schema(
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
      minlength: 6,
      select: false
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
  { timestamps: true }
);


employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};


const Employee =  mongoose.model("Employee", employeeSchema);


const findOneByEmail = async ({ email }) => {
  return await CONNECT_DB().Employee.findOne({ email }).exec();
};

// 6️⃣ Export ra ngoài
export const employeeModel = {
  Employee,
  findOneByEmail
};
