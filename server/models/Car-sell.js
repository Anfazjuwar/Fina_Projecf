const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    image: {
      type: [String],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    year: Number,
    fuelType: String,
    transmission: String,
    mileage: Number,
    color: String,
    engineCapacity: Number,
    horsepower: Number,
    seatingCapacity: Number,
    safetyRating: Number,

    // Key features
    airConditioning: Boolean,
    powerSteering: Boolean,
    airbags: Number,
    rearCamera: Boolean,
    parkingSensors: Boolean,
    sunroof: Boolean,
    bluetooth: Boolean,
    alloyWheels: Boolean,

    // Flags
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    averageReview: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CarSell", CarSchema);
