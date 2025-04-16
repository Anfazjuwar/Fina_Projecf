const { imageUploadUtil } = require("../../helpers/cloudinary");
const CarSell = require("../../models/Car-sell");

// Upload single image
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error occurred" });
  }
};

// Add new car
const addCarSell = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      year,
      fuelType,
      transmission,
      mileage,
      color,
      engineCapacity,
      horsepower,
      seatingCapacity,
      safetyRating,
      airConditioning,
      powerSteering,
      airbags,
      rearCamera,
      parkingSensors,
      sunroof,
      bluetooth,
      alloyWheels,
      isFeatured,
      isAvailable,
      averageReview,
      name,
      phone,
      email,
    } = req.body;

    const newCar = new CarSell({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      year,
      fuelType,
      transmission,
      mileage,
      color,
      engineCapacity,
      horsepower,
      seatingCapacity,
      safetyRating,
      airConditioning,
      powerSteering,
      airbags,
      rearCamera,
      parkingSensors,
      sunroof,
      bluetooth,
      alloyWheels,
      isFeatured,
      isAvailable,
      averageReview,
      name,
      phone,
      email,
    });

    await newCar.save();
    res.status(201).json({ success: true, data: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Get all cars
const fetchAllCarsSell = async (req, res) => {
  try {
    const cars = await CarSell.find();
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Edit a car
// const editCar = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     } = req.body;

//     const car = await CarSell.findById(id);
//     if (!car) {
//       return res.status(404).json({ success: false, message: "Car not found" });
//     }

//     car.title = title ?? car.title;
//     car.description = description ?? car.description;
//     car.category = category ?? car.category;
//     car.brand = brand ?? car.brand;
//     car.price = price !== "" ? price : car.price;
//     car.salePrice = salePrice !== "" ? salePrice : car.salePrice;
//     car.totalStock = totalStock ?? car.totalStock;
//     car.image = image ?? car.image;
//     car.averageReview = averageReview ?? car.averageReview;

//     await car.save();
//     res.status(200).json({ success: true, data: car });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error occurred" });
//   }
// };

// Delete a car
const deleteSellCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await CarSell.findByIdAndDelete(id);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

module.exports = {
  handleImageUpload,
  addCarSell,
  fetchAllCarsSell,
  //   editCar,
  deleteSellCar,
};
