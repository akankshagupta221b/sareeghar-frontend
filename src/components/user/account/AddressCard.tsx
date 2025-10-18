import type { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Address } from "@/store/useAddressStore";
import { MapPin, Phone, Edit2, Trash2, Star } from "lucide-react";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
}

export const AddressCard: FC<AddressCardProps> = ({
  address,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      {/* Default Badge - Top Right Corner */}
      {address.isDefault && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-4 py-1.5 rounded-bl-lg flex items-center gap-1.5 shadow-md">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-semibold">Default</span>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="font-bold text-xl text-gray-900 mb-1">
            {address.name}
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        {/* Address Details */}
        <div className="space-y-3 mb-6">
          {/* Street Address */}
          <div className="flex items-start gap-3 group/item">
            <div className="p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary/20 transition-colors">
              <MapPin size={18} className="text-primary flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 leading-relaxed">
                {address.address}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {address.city}, {address.state}
              </p>
              <p className="text-sm text-gray-600">
                {address.country} - {address.postalCode}
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-3 group/item">
            <div className="p-2 bg-primary/10 rounded-lg group-hover/item:bg-primary/20 transition-colors">
              <Phone size={18} className="text-primary flex-shrink-0" />
            </div>
            <p className="text-sm font-medium text-gray-700">{address.phone}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <Button
            onClick={() => onEdit(address)}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <Edit2 size={16} />
            Edit
          </Button>
          <Button
            onClick={() => onDelete(address.id)}
            variant="outline"
            size="sm"
            className="flex-1 gap-2 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </CardContent>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
};