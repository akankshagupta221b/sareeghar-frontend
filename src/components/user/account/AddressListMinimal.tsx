import type { FC } from "react";
import { Button } from "@/components/ui/button";
import type { Address } from "@/store/useAddressStore";
import { MapPin, Phone, Edit2, Trash2, Plus } from "lucide-react";

interface AddressListMinimalProps {
  addresses: Address[];
  isLoading: boolean;
  onAddNew: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

export const AddressListMinimal: FC<AddressListMinimalProps> = ({
  addresses,
  isLoading,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-wide">ADDRESSES</h2>
        <Button
          onClick={onAddNew}
          variant="outline"
          className="gap-2 border-gray-300 hover:bg-gray-50"
        >
          <Plus size={18} />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-12 border border-gray-200 rounded">
          <p className="text-gray-500 mb-4">No addresses saved yet.</p>
          <Button
            onClick={onAddNew}
            variant="outline"
            className="gap-2 border-gray-300"
          >
            <Plus size={18} />
            Add Your First Address
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-lg">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-black text-white px-2 py-1 rounded">
                        DEFAULT
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                      <div>
                        <p>{address.address}</p>
                        <p>
                          {address.city}, {address.state}, {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="flex-shrink-0" />
                      <p>{address.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button
                  onClick={() => onEdit(address)}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-gray-300 hover:bg-gray-50"
                >
                  <Edit2 size={14} />
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(address.id)}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                >
                  <Trash2 size={14} />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};