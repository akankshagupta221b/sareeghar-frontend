import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface AddressFormData {
  name: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface AddressFormMinimalProps {
  formData: AddressFormData;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: keyof AddressFormData, value: string | boolean) => void;
}

export const AddressFormMinimal: FC<AddressFormMinimalProps> = ({
  formData,
  isEditing,
  onSubmit,
  onCancel,
  onChange,
}) => {
  return (
    <div className="bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-wide">
          {isEditing ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}
        </h2>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-gray-600">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              required
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-gray-600">
              Phone Number *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              required
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm text-gray-600">
            Street Address *
          </Label>
          <Input
            id="address"
            value={formData.address}
            required
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Enter your street address"
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm text-gray-600">
              City *
            </Label>
            <Input
              id="city"
              value={formData.city}
              required
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="Enter your city"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm text-gray-600">
              State *
            </Label>
            <Input
              id="state"
              value={formData.state}
              required
              onChange={(e) => onChange("state", e.target.value)}
              placeholder="Enter your state"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm text-gray-600">
              Country *
            </Label>
            <Input
              id="country"
              value={formData.country}
              required
              onChange={(e) => onChange("country", e.target.value)}
              placeholder="Enter your country"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm text-gray-600">
              Postal Code *
            </Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              required
              onChange={(e) => onChange("postalCode", e.target.value)}
              placeholder="Enter your postal code"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="default"
            checked={formData.isDefault}
            onCheckedChange={(checked) =>
              onChange("isDefault", checked as boolean)
            }
          />
          <Label htmlFor="default" className="text-sm cursor-pointer">
            Set as default address
          </Label>
        </div>

        <div className="flex gap-3 pt-6">
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800 px-8"
          >
            {isEditing ? "Update Address" : "Add Address"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 px-8"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};