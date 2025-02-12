import mongoose from "mongoose";

const GuarantorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  relation: { type: String, required: true }, // Ensure this field is included
  cnic: {
    type: String,
    unique: true, // Change it later to true
    validate: {
      validator: function (v) {
        return /^[0-9]{5}[0-9]{7}[0-9]{1}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid CNIC!`,
    },
  },
  address: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Guarantor", GuarantorSchema);