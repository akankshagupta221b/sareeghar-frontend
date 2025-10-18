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

interface AddressFormProps {
  formData: AddressFormData;
  isEditing: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onChange: (field: keyof AddressFormData, value: string | boolean) => void;
}

export const AddressForm: FC<AddressFormProps> = ({
  formData,
  isEditing,
  onSubmit,
  onCancel,
  onChange,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            required
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            required
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          value={formData.address}
          required
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Enter your street address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            required
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Enter your city"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={formData.state}
            required
            onChange={(e) => onChange("state", e.target.value)}
            placeholder="Enter your state"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={formData.country}
            required
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Enter your country"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            required
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="Enter your postal code"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="default"
          checked={formData.isDefault}
          onCheckedChange={(checked) =>
            onChange("isDefault", checked as boolean)
          }
        />
        <Label htmlFor="default" className="cursor-pointer">
          Set as default address
        </Label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {isEditing ? "Update Address" : "Add Address"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};