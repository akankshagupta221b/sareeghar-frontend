"use server";
import { protectLoginRules, protectSignupRules } from "@/arcjet";
import { request } from "@arcjet/next";

const API_BASE_URL = "https://sareeghar-backend-ruddy.vercel.app";

export const protectSignUpAction = async (email: string) => {
  const req = await request();
  const decision = await protectSignupRules.protect(req, { email });

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      const emailTypes = decision.reason.emailTypes;
      if (emailTypes.includes("DISPOSABLE")) {
        return {
          error: "Disposable email address are not allowed",
          success: false,
          status: 403,
        };
      } else if (emailTypes.includes("INVALID")) {
        return {
          error: "Invalid email",
          success: false,
          status: 403,
        };
      } else if (emailTypes.includes("NO_MX_RECORDS")) {
        return {
          error:
            "Email domain does not have valid MX Records! Please try with different email",
          success: false,
          status: 403,
        };
      }
    } else if (decision.reason.isBot()) {
      return {
        error: "Bot activity detected",
        success: false,
        status: 403,
      };
    } else if (decision.reason.isRateLimit()) {
      return {
        error: "Too many requests! Please try again later",
        success: false,
        status: 403,
      };
    }
  }

  return {
    success: true,
  };
};

export const protectSignInAction = async (email: string) => {
  const req = await request();
  const decision = await protectLoginRules.protect(req, { email });

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      const emailTypes = decision.reason.emailTypes;
      if (emailTypes.includes("DISPOSABLE")) {
        return {
          error: "Disposable email address are not allowed",
          success: false,
          status: 403,
        };
      } else if (emailTypes.includes("INVALID")) {
        return {
          error: "Invalid email",
          success: false,
          status: 403,
        };
      } else if (emailTypes.includes("NO_MX_RECORDS")) {
        return {
          error:
            "Email domain does not have valid MX Records! Please try with different email",
          success: false,
          status: 403,
        };
      }
    } else if (decision.reason.isRateLimit()) {
      return {
        error: "Too many requests! Please try again later",
        success: false,
        status: 403,
      };
    }
  }

  return {
    success: true,
  };
};

// Forgot Password Actions
export const forgotPasswordRequest = async (email: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/forgot-password/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to send OTP",
      };
    }

    return {
      success: true,
      message: data.message || "OTP sent successfully",
    };
  } catch (error) {
    console.error("Forgot password request error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const forgotPasswordVerifyOtp = async (email: string, otp: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/forgot-password/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Invalid OTP",
      };
    }

    return {
      success: true,
      message: data.message || "OTP verified successfully",
    };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const forgotPasswordReset = async (
  email: string,
  otp: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/forgot-password/reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password, confirmPassword }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to reset password",
      };
    }

    return {
      success: true,
      message: data.message || "Password reset successfully",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};

export const forgotPasswordResendOtp = async (email: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/forgot-password/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to resend OTP",
      };
    }

    return {
      success: true,
      message: data.message || "OTP resent successfully",
    };
  } catch (error) {
    console.error("Resend OTP error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
};
