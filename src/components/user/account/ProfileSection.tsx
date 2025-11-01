import type { FC } from "react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const ProfileSection: FC = () => {
  const { user } = useAuthStore();
  const { getProfile, updateProfile } = useAuthStore();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");

  useEffect(() => {
    // sync user from store when component mounts or user changes
    if (!user) {
      getProfile().then((u) => {
        setName(u?.name || "");
      });
    } else {
      setName(user.name || "");
    }
  }, [user, getProfile]);

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
        <div className="flex items-center gap-3">
          <Input
            value={name}
            placeholder="Full Name"
            className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
          />
          {!editing ? (
            <Button size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={async () => {
                  // save
                  const updated = await updateProfile({
                    name: name ? name : undefined,
                  });
                  if (updated) {
                    toast({ title: "Profile updated" });
                    setEditing(false);
                  } else {
                    toast({
                      title: "Failed to update profile",
                      variant: "destructive",
                    });
                  }
                }}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setName(user.name || "");
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        <Input
          value={user.email}
          placeholder="Email Address"
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
          disabled
        />
        <div className="pt-4 border-t mt-4">
          <h3 className="text-lg font-medium mb-3">Change Password</h3>
          <PasswordChangeForm />
        </div>
      </div>
    </div>
  );
};

const PasswordChangeForm: FC = () => {
  const { user, changePassword } = useAuthStore();
  const { toast } = useToast();
  const [step, setStep] = useState<"request" | "verify" | "reset">("request");
  const [otp, setOtp] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const startTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Step 1: Send OTP to user's email
  const handleSendOtp = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://sareeghar-backend-ruddy.vercel.app/api/auth/forgot-password/request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({ title: "OTP sent to your email" });
        setStep("verify");
        startTimer();
      } else {
        toast({
          title: data.message || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Failed to send OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!user?.email || otp.length !== 6) {
      toast({ title: "Please enter 6-digit OTP", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://sareeghar-backend-ruddy.vercel.app/api/auth/forgot-password/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, otp }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({ title: "OTP verified" });
        setStep("reset");
      } else {
        toast({
          title: data.message || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Failed to verify OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (otpTimer > 0 || !user?.email) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://sareeghar-backend-ruddy.vercel.app/api/auth/forgot-password/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({ title: "OTP resent" });
        startTimer();
      } else {
        toast({
          title: data.message || "Failed to resend OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Failed to resend OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async () => {
    if (!user?.email || !newPassword || !confirmPassword) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        "https://sareeghar-backend-ruddy.vercel.app/api/auth/forgot-password/reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            otp,
            password: newPassword,
            confirmPassword,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast({ title: "Password changed successfully" });
        // Reset form
        setStep("request");
        setOtp("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast({
          title: data.message || "Failed to change password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Failed to change password", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Render based on step
  if (step === "request") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          We'll send a verification code to your email ({user?.email}) before
          allowing password change.
        </p>
        <Button onClick={handleSendOtp} disabled={loading} size="sm">
          {loading ? "Sending..." : "Send Verification Code"}
        </Button>
      </div>
    );
  }

  if (step === "verify") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Enter the 6-digit code sent to {user?.email}
        </p>
        <Input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          maxLength={6}
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleVerifyOtp}
            disabled={loading || otp.length !== 6}
            size="sm"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setStep("request")}
            size="sm"
          >
            Cancel
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Didn't receive code?{" "}
          {otpTimer > 0 ? (
            <span>Resend in {otpTimer}s</span>
          ) : (
            <button
              onClick={handleResendOtp}
              disabled={loading}
              className="underline hover:text-gray-900"
            >
              Resend
            </button>
          )}
        </p>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-600">Create your new password</p>
        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
        />
        <Input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0"
        />
        <div className="flex gap-2">
          <Button onClick={handleResetPassword} disabled={loading} size="sm">
            {loading ? "Saving..." : "Change Password"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setStep("request");
              setOtp("");
              setNewPassword("");
              setConfirmPassword("");
            }}
            size="sm"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return null;
};
