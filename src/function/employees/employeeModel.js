import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  employeeCode: {
    type: String,
    required: [true, 'Employee code is required'],
    trim: true,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },

  emailCompany: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true,
    match: [/^(0|\+84)(3|5|7|8|9)[0-9]{8}$/, 'Invalid Vietnamese phone number format'],
    default: null
  },
  department: {
    type: String,
    trim: true,
    default: null
  },
  position: {
    type: String,
    trim: true
  },
  branch: {
    type: String,
    trim: true,
    default: 'HQ'
  },
  ipAddress: {
    type: String,
    trim: true,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

employeeSchema.index({ department: 1 })
employeeSchema.index({ branch: 1 })

const employee = mongoose.model('Employee', employeeSchema)

const findOneByEmail = async ({ email }) => {
  return await employee.findOne({ email }).exec()
}

export const employeeModel = {
  employee,
  findOneByEmail
}
