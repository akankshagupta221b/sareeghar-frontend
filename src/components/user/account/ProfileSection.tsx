import type { FC } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";

export const ProfileSection: FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="bg-white border-b border-gray-200 pb-6 sm:pb-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 pb-6 sm:pb-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide">
          PROFILE INFORMATION
        </h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Input
          value={user.name || "Not provided"}
          placeholder="Full Name"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled
        />

        <Input
          value={user.email}
          placeholder="Email Address"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled
        />

        <Input
          value={user.role === "SUPER_ADMIN" ? "Administrator" : "Customer"}
          placeholder="Account Type"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled
        />
      </div>
    </div>
  );
};
