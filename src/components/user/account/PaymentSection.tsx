import type { FC } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

interface PaymentSectionProps {
  isEditing: boolean;
  onEdit: () => void;
  formData: {
    email: string;
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    cardholderName: string;
    useShoppingAddress: boolean;
    billingCountry: string;
    billingZipCode: string;
    billingCity: string;
    vatNumber: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

export const PaymentSection: FC<PaymentSectionProps> = ({
  isEditing,
  onEdit,
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white pt-6 sm:pt-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide">PAYMENT</h2>
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
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="E-mail"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled={!isEditing}
        />

        <div className="grid grid-cols-12 gap-3 sm:gap-4">
          <div className="col-span-12 sm:col-span-6">
            <Input
              value={formData.cardNumber}
              onChange={(e) => onChange("cardNumber", e.target.value)}
              placeholder="Card number"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled={!isEditing}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Input
              value={formData.expiryDate}
              onChange={(e) => onChange("expiryDate", e.target.value)}
              placeholder="MM / YY"
              className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
              disabled={!isEditing}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div className="relative">
              <Input
                value={formData.cvc}
                onChange={(e) => onChange("cvc", e.target.value)}
                placeholder="CVC"
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0 pr-8"
                disabled={!isEditing}
              />
              <HelpCircle
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        <Input
          value={formData.cardholderName}
          onChange={(e) => onChange("cardholderName", e.target.value)}
          placeholder="Cardholder name"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled={!isEditing}
        />

        <div className="pt-4 sm:pt-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Billing address</h3>
          
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Checkbox
              id="useShoppingAddress"
              checked={formData.useShoppingAddress}
              onCheckedChange={(checked) =>
                onChange("useShoppingAddress", checked as boolean)
              }
              disabled={!isEditing}
            />
            <Label
              htmlFor="useShoppingAddress"
              className="text-sm font-normal cursor-pointer"
            >
              USE SHOPPING ADDRESS
            </Label>
          </div>

          {!formData.useShoppingAddress && (
            <div className="space-y-3 sm:space-y-4">
              <Input
                value={formData.billingCountry}
                onChange={(e) => onChange("billingCountry", e.target.value)}
                placeholder="United States"
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
                disabled={!isEditing}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Input
                  value={formData.billingZipCode}
                  onChange={(e) => onChange("billingZipCode", e.target.value)}
                  placeholder="Zip code"
                  className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
                  disabled={!isEditing}
                />
                <Input
                  value={formData.billingCity}
                  onChange={(e) => onChange("billingCity", e.target.value)}
                  placeholder="City"
                  className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
                  disabled={!isEditing}
                />
              </div>

              <Input
                value={formData.vatNumber}
                onChange={(e) => onChange("vatNumber", e.target.value)}
                placeholder="VAT Number"
                className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
                disabled={!isEditing}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};