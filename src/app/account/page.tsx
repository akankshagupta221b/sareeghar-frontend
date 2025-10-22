"use client";

import { useToast } from "@/hooks/use-toast";
import type { Address } from "@/store/useAddressStore";
import { useAddressStore } from "@/store/useAddressStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useReviewStore } from "@/store/useReviewStore";
import { useEffect, useState } from "react";
import { AccountSidebar } from "@/components/user/account/AccountSidebar";
import { DeliverySection } from "@/components/user/account/DeliverySection";
import { PaymentSection } from "@/components/user/account/PaymentSection";
import { ProfileSection } from "@/components/user/account/ProfileSection";
import { ContactSection } from "@/components/user/account/ContactSection";
import { AddressListMinimal } from "@/components/user/account/AddressListMinimal";
import {
  AddressFormMinimal,
  type AddressFormData,
} from "@/components/user/account/AddressFormMinimal";
import { OrdersTable } from "@/components/user/account/OrdersTable";
import { MyReviews } from "@/components/user/account/MyReviews";

const initialAddressFormState: AddressFormData = {
  name: "",
  address: "",
  city: "",
  country: "",
  state: "",
  postalCode: "",
  phone: "",
  isDefault: false,
};

function UserAccountPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditingDelivery, setIsEditingDelivery] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormData, setAddressFormData] = useState<AddressFormData>(
    initialAddressFormState
  );
  const [reviewsCount, setReviewsCount] = useState(0);

  const [deliveryFormData, setDeliveryFormData] = useState({
    address: "",
    country: "",
    aptSuite: "",
    zipCode: "",
    city: "",
    state: "",
  });

  const [paymentFormData, setPaymentFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
    useShoppingAddress: false,
    billingCountry: "",
    billingZipCode: "",
    billingCity: "",
    vatNumber: "",
  });

  const { toast } = useToast();
  const {
    addresses,
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    isLoading: addressesLoading,
  } = useAddressStore();
  const { userOrders, getOrdersByUserId } = useOrderStore();
  const { getUserReviews } = useReviewStore();

  const fetchReviewsCount = async () => {
    try {
      const reviews = await getUserReviews();
      setReviewsCount(reviews.length);
    } catch (error) {
      console.error("Failed to fetch reviews count:", error);
    }
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentChange = (field: string, value: string | boolean) => {
    setPaymentFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeliveryEdit = () => {
    setIsEditingDelivery(!isEditingDelivery);
  };

  const handleDeliverySave = () => {
    // Save delivery information
    toast({
      title: "Delivery information updated",
    });
    setIsEditingDelivery(false);
  };

  const handlePaymentEdit = () => {
    setIsEditingPayment(!isEditingPayment);
  };

  const handleAddressFormChange = (
    field: keyof AddressFormData,
    value: string | boolean
  ) => {
    setAddressFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddressSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (editingAddressId) {
        const result = await updateAddress(editingAddressId, addressFormData);
        if (result) {
          toast({
            title: "Address updated successfully",
          });
          fetchAddresses();
          setEditingAddressId(null);
        }
      } else {
        const result = await createAddress(addressFormData);
        if (result) {
          toast({
            title: "Address created successfully",
          });
          fetchAddresses();
        }
      }

      setShowAddressForm(false);
      setAddressFormData(initialAddressFormState);
    } catch (err) {
      toast({
        title: "Failed to save address",
        variant: "destructive",
      });
    }
  };

  const handleEditAddress = (address: Address) => {
    setAddressFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      country: address.country,
      state: address.state,
      phone: address.phone,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    });

    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (confirmed) {
      try {
        const success = await deleteAddress(id);
        if (success) {
          toast({
            title: "Address deleted successfully",
          });
        }
      } catch (e) {
        toast({
          title: "Failed to delete address",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddNewAddress = () => {
    setEditingAddressId(null);
    setAddressFormData(initialAddressFormState);
    setShowAddressForm(true);
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddressId(null);
    setAddressFormData(initialAddressFormState);
  };

  useEffect(() => {
    fetchAddresses();
    getOrdersByUserId();
    fetchReviewsCount();
  }, [fetchAddresses, getOrdersByUserId]);

  useEffect(() => {
    // Load default address if available
    const defaultAddress =
      addresses.find((addr) => addr.isDefault) || addresses[0];
    if (defaultAddress) {
      setDeliveryFormData({
        address: defaultAddress.address,
        country: defaultAddress.country,
        aptSuite: "",
        zipCode: defaultAddress.postalCode,
        city: defaultAddress.city,
        state: defaultAddress.state,
      });
    }
  }, [addresses]);

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6 sm:space-y-8">
            <ProfileSection />
            <DeliverySection
              address={addresses[0] || null}
              isEditing={isEditingDelivery}
              onEdit={handleDeliveryEdit}
              onSave={handleDeliverySave}
              formData={deliveryFormData}
              onChange={handleDeliveryChange}
            />
          </div>
        );
      case "addresses":
        return showAddressForm ? (
          <AddressFormMinimal
            formData={addressFormData}
            isEditing={!!editingAddressId}
            onSubmit={handleAddressSubmit}
            onCancel={handleCancelAddressForm}
            onChange={handleAddressFormChange}
          />
        ) : (
          <AddressListMinimal
            addresses={addresses}
            isLoading={addressesLoading}
            onAddNew={handleAddNewAddress}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
          />
        );
      case "orders":
        return <OrdersTable orders={userOrders} />;
      case "reviews":
        return <MyReviews />;
      case "contact":
        return <ContactSection />;
      case "help":
        return (
          <div className="bg-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-wide">
              HELP CENTER
            </h2>
            <p className="text-gray-600">Find answers to common questions.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Sidebar - Left */}
          <div className="col-span-12 lg:col-span-3">
            <AccountSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              ordersCount={userOrders.length}
              reviewsCount={reviewsCount}
              wishlistCount={18}
            />
          </div>

          {/* Content - Right */}
          <div className="col-span-12 lg:col-span-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountPage;
