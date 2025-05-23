import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

import {
  CarIcon,
  CarFrontIcon,
  LandmarkIcon,
  GlobeIcon,
  RocketIcon,
  Car,
  ChevronLeft,
  ChevronRight, // ✅ Fixed import
} from "lucide-react";

import {
  BatteryFull,
  Wrench,
  Droplet, // ✅ REPLACEMENT for 'Oil'
  Puzzle,
  Boxes,
} from "lucide-react";
import CarTile from "../CarsShopping/car-title";
import { addToCarCart, fetchCarCartItems } from "@/store/Cars/cart-slice";
import { fetchAllFilteredCars, fetchCarDetails } from "@/store/Cars/cars-slice";
import CarProductDetailsDialog from "../CarsShopping/car-details";

export const categoriesWithIcon = [
  { id: "cartparts", label: "Cartparts", icon: Puzzle },
  { id: "batteries", label: "Batteries", icon: BatteryFull },
  {
    id: "oil",
    label: "Oil",
    icon: Droplet, // ✅ REPLACEMENT for 'Oil'
  },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "others", label: "Others", icon: Boxes },
];

export const brandsWithIcon = [
  { id: "toyota", label: "Toyota", icon: CarIcon },
  { id: "honda", label: "Honda", icon: CarFrontIcon },
  { id: "nissan", label: "Nissan", icon: Car },
  { id: "mazda", label: "Mazda", icon: RocketIcon },
  { id: "subaru", label: "Subaru", icon: LandmarkIcon },
  { id: "mitsubishi", label: "Mitsubishi", icon: GlobeIcon },
  { id: "suzuki", label: "Suzuki", icon: CarFrontIcon },

  { id: "bmw", label: "BMW", icon: CarIcon },
  { id: "mercedes", label: "Mercedes-Benz", icon: GlobeIcon },
  { id: "audi", label: "Audi", icon: Car },
  { id: "volkswagen", label: "Volkswagen", icon: RocketIcon },
  { id: "porsche", label: "Porsche", icon: LandmarkIcon },
  { id: "opel", label: "Opel", icon: CarFrontIcon },
];
function ShoppingMainHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { carList, carDetails } = useSelector((state) => state.shopCars);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleGetCarDetails(getCurrentCarId) {
    dispatch(fetchCarDetails(getCurrentCarId));
  }

  function handleAddToCarCart(getCurrentCarId, getTotalStock) {
    dispatch(
      addToCarCart({
        userId: user?.id,
        carId: getCurrentCarId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCarCartItems(user?.id));
        toast({ title: "Car is added to cart" });
      }
    });
  }

  useEffect(() => {
    dispatch(
      fetchAllFilteredCars({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureImageList.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    if (carDetails !== null) setOpenDetailsDialog(true);
  }, [carDetails]);
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[700px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute transform -translate-y-1/2 top-1/2 left-4 bg-white/80"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute transform -translate-y-1/2 top-1/2 right-4 bg-white/80"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="transition-shadow cursor-pointer hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Shop by Brand</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="transition-shadow cursor-pointer hover:shadow-lg"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Featured Cars</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {carList?.slice(0, 6).map((carItem) => (
              <CarTile
                car={carItem}
                handleGetProductDetails={handleGetCarDetails}
                handleAddtoCart={handleAddToCarCart}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {productList && productList.length > 0
              ? productList
                  ?.slice(0, 6)
                  .map((productItem) => (
                    <ShoppingProductTile
                      handleGetProductDetails={handleGetProductDetails}
                      product={productItem}
                      handleAddtoCart={handleAddtoCart}
                    />
                  ))
              : null}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      <CarProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        carDetails={carDetails}
      />
    </div>
  );
}

export default ShoppingMainHome;
