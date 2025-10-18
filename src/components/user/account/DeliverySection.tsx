import type { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Address } from "@/store/useAddressStore";

interface DeliverySectionProps {
  address: Address | null;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  formData: {
    address: string;
    country: string;
    aptSuite: string;
    zipCode: string;
    city: string;
    state: string;
  };
  onChange: (field: string, value: string) => void;
}

export const DeliverySection: FC<DeliverySectionProps> = ({
  address,
  isEditing,
  onEdit,
  onSave,
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 pb-6 sm:pb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide">DELIVERY</h2>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="text-xs sm:text-sm text-gray-500 hover:text-black transition-colors uppercase"
          >
            UPDATE
          </button>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Input
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="St. Stalowa na Nekteen"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled={!isEditing}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            value={formData.country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Country"
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            disabled={!isEditing}
          />
          <Input
            value={formData.aptSuite}
            onChange={(e) => onChange("aptSuite", e.target.value)}
            placeholder="Apt./Suit no."
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <Input
            value={formData.zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
            placeholder="Zip code"
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            disabled={!isEditing}
          />
          <Input
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="City"
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            disabled={!isEditing}
          />
        </div>

        <Input
          value={formData.state}
          onChange={(e) => onChange("state", e.target.value)}
          placeholder="State"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled={!isEditing}
        />

        {isEditing && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <Button
              onClick={onSave}
              className="bg-black text-white hover:bg-gray-800"
            >
              Save
            </Button>
            <Button
              onClick={onEdit}
              variant="outline"
              className="border-gray-300"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};