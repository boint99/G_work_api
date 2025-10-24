import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee'
  }
}, {
  timestamps: true
})

userSchema.index({ role: 1 })
userSchema.index({ isActive: 1 })

function isBcryptHash(str) {
  return typeof str === 'string' && /^\$2[aby]\$[0-9]{2}\$.{53}$/.test(str)
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  if (isBcryptHash(this.password)) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(err)
  }
})


userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)


const findOneByEmail = async ({ email }) => {
  return await User.findOne({ email }).select('+password').exec()
}

export const userModel = {
  User,
  findOneByEmail
}
