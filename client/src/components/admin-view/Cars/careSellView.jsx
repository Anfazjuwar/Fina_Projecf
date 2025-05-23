import CarsImageUpload from "@/components/admin-view/Cars/CarsImageUpload";
import AdminCarTile from "@/components/admin-view/Cars/cartitle";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { addCarFormElements } from "@/config";
import {
  addNewSellCar,
  deleteSellCar,
  fetchAllSellCars,
} from "@/store/Cars/car-sell";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarSellDetailsDialog from "./carselldialog";
import AdminCarSellTile from "./carsellShow";

const initialFormData = {
  image: [],
  title: "",
  // Phone: "",
  // email: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  year: "",
  fuelType: "",
  transmission: "",
  mileage: "",
  color: "",
  engineCapacity: "",
  horsepower: "",
  seatingCapacity: "",
  safetyRating: "",
  airConditioning: false,
  powerSteering: false,
  airbags: "",
  rearCamera: false,
  parkingSensors: false,
  sunroof: false,
  bluetooth: false,
  alloyWheels: false,
  isFeatured: false,
  isAvailable: true,
  averageReview: 0,
};

function CarSellAdmin() {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { carSellList } = useSelector((state) => state.carSell);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(
      addNewSellCar({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllSellCars());
        setOpenCreateDialog(false);
        setImageFile(null);
        setFormData(initialFormData);
        toast({ title: "Car added successfully" });
      }
    });
  }

  function handleDelete(getCarId) {
    dispatch(deleteSellCar(getCarId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllSellCars());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((key) => key !== "averageReview")
      .map((key) => formData[key] !== "")
      .every(Boolean);
  }

  useEffect(() => {
    dispatch(fetchAllSellCars());
  }, [dispatch]);

  console.log(carSellList, "carSellList");

  return (
    <Fragment>
      {/* <div className="flex justify-end w-full mt-32 mb-5 ">
        <Button className="mr-4" onClick={() => setOpenCreateDialog(true)}>
          Add Car for Sale
        </Button>
      </div> */}
      <div className="grid gap-4 mb-10 ml-8 md:grid-cols-3 lg:grid-cols-4 ">
        {carSellList &&
          carSellList.length > 0 &&
          carSellList.map((carItem) => (
            <AdminCarSellTile
              key={carItem._id}
              car={carItem}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      {/* <div className="grid gap-4 mb-10 ml-8 md:grid-cols-3 lg:grid-cols-4 ">
        {carSellList &&
          carSellList.length > 0 &&
          carSellList.map((carItem) => (
            <AdminCarTile
              key={carItem._id}
              car={carItem}
              handleDelete={handleDelete}
            />
          ))}
      </div> */}
      {/* <Sheet
        open={openCreateDialog}
        onOpenChange={() => {
          setOpenCreateDialog(false);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Add New Car for Sale</SheetTitle>
          </SheetHeader>
          <CarsImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={false}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add Car"
              formControls={addCarFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet> */}
    </Fragment>
  );
}

export default CarSellAdmin;
