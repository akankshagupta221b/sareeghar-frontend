import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, User as UserIcon } from "lucide-react";

export const ProfileSection: FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <p className="text-gray-500">Please log in to view your profile.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-primary/10 rounded-full">
              <UserIcon size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-semibold text-lg">{user.name || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-primary/10 rounded-full">
              <Mail size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="font-semibold text-lg">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-primary/10 rounded-full">
              <UserIcon size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-semibold text-lg">
                {user.role === "SUPER_ADMIN" ? "Administrator" : "Customer"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};