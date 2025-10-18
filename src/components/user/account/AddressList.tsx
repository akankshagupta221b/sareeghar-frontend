import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Address } from "@/store/useAddressStore";
import { AddressCard } from "./AddressCard";
import { AddressForm, type AddressFormData } from "./AddressForm";
import { Plus } from "lucide-react";

interface AddressListProps {
  addresses: Address[];
  isLoading: boolean;
  showForm: boolean;
  isEditing: boolean;
  formData: AddressFormData;
  onAddNew: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onFormChange: (field: keyof AddressFormData, value: string | boolean) => void;
}

export const AddressList: FC<AddressListProps> = ({
  addresses,
  isLoading,
  showForm,
  isEditing,
  formData,
  onAddNew,
  onEdit,
  onDelete,
  onSubmit,
  onCancel,
  onFormChange,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          {!showForm && (
            <Button onClick={onAddNew} className="gap-2">
              <Plus size={18} />
              Add New Address
            </Button>
          )}
        </div>

        {showForm ? (
          <AddressForm
            formData={formData}
            isEditing={isEditing}
            onSubmit={onSubmit}
            onCancel={onCancel}
            onChange={onFormChange}
          />
        ) : addresses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Addresses Saved
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first address to make checkout faster.
            </p>
            <Button onClick={onAddNew} className="gap-2">
              <Plus size={18} />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};