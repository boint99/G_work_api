import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    fullName: { type: String, trim: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other"
    },
    dateOfBirth: { type: Date, default: null },
    phone: { type: String, default: null },
    avatar: { type: String, default: null },
    employeeCode: { type: String, default: null },
    department: { type: String, default: null },
    position: { type: String, default: null},
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
     _destroy: { type: Boolean, default: false }
  },
  { timestamps: true }
)

function isBcryptHash(str) {
  return typeof str === 'string' && /^\$2[aby]\$[0-9]{2}\$.{53}$/.test(str)
}

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  if (isBcryptHash(this.password)) return next()

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
  } catch (err) {
    next(err)
  }
});

employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
};

const Employee = mongoose.model("Employee", employeeSchema)


const findOneByEmail = async ({ email }) => {
  return await Employee.findOne({ email }).select("+password").exec()
}

export const employeeModel = {
  Employee,
  findOneByEmail
}
