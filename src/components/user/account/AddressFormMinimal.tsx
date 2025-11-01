import type { FC } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Minimal state->city mapping fallback. Will attempt to fetch from external API first.
const STATE_CITY_MAP: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Karnataka: ["Bengaluru", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "West Bengal": ["Kolkata", "Siliguri", "Durgapur"],
  Delhi: ["New Delhi", "Dwarka"],
};

const STATES_API = "https://countriesnow.space/api/v0.1/countries/states";
const CITIES_API = "https://countriesnow.space/api/v0.1/countries/state/cities";

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
  const [states, setStates] = useState<string[]>(Object.keys(STATE_CITY_MAP));
  const [cities, setCities] = useState<string[]>(
    STATE_CITY_MAP[formData.state] || []
  );
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [statesError, setStatesError] = useState<string | null>(null);
  const [citiesError, setCitiesError] = useState<string | null>(null);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [validatingPincode, setValidatingPincode] = useState(false);

  // Pincode validation API response type
  type PincodeApiResponse = [
    {
      Message: string;
      Status: "Success" | "Error" | "404";
      PostOffice: {
        State: string;
        District: string;
        Name: string;
      }[];
    }
  ];

  // Fetch states for India on mount
  useEffect(() => {
    let cancelled = false;
    const fetchStates = async () => {
      setLoadingStates(true);
      setStatesError(null);
      try {
        const res = await fetch(STATES_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India" }),
        });
        const data = await res.json();
        // API returns data.data.states as array of {name: string}
        const fetched = Array.isArray(data?.data?.states)
          ? data.data.states.map((s: any) => s.name).filter(Boolean)
          : [];
        if (!cancelled && fetched.length > 0) {
          setStates(fetched);
        }
      } catch (err) {
        setStatesError("Failed to load states");
        // keep fallback
      } finally {
        if (!cancelled) setLoadingStates(false);
      }
    };

    fetchStates();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    let cancelled = false;
    const fetchCities = async (stateName: string) => {
      if (!stateName) {
        setCities([]);
        return;
      }
      setLoadingCities(true);
      setCitiesError(null);
      try {
        const res = await fetch(CITIES_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India", state: stateName }),
        });
        const data = await res.json();
        // API returns data.data as array of city names
        const fetched = Array.isArray(data?.data)
          ? data.data.filter(Boolean)
          : [];
        if (!cancelled && fetched.length > 0) {
          setCities(fetched);
        } else if (!cancelled) {
          // fallback to local map
          setCities(STATE_CITY_MAP[stateName] || []);
        }
      } catch (err) {
        setCitiesError("Failed to load cities");
        setCities(STATE_CITY_MAP[stateName] || []);
      } finally {
        if (!cancelled) setLoadingCities(false);
      }
    };

    fetchCities(formData.state);

    return () => {
      cancelled = true;
    };
  }, [formData.state]);

  // Validate pincode when it changes or when state changes
  useEffect(() => {
    let cancelled = false;

    const validatePincode = async () => {
      const pincode = formData.postalCode.trim();

      // Reset error if pincode is empty or less than 6 digits
      if (!pincode || pincode.length < 6) {
        setPincodeError(null);
        return;
      }

      // Only validate 6-digit pincodes
      if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
        setPincodeError("Pincode must be exactly 6 digits");
        return;
      }

      // Skip validation if no state selected
      if (!formData.state) {
        setPincodeError(null);
        return;
      }

      setValidatingPincode(true);
      setPincodeError(null);

      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const apiData = (await response.json()) as PincodeApiResponse;

        if (cancelled) return;

        // Check if the API returned a successful, valid response
        if (apiData[0].Status !== "Success" || !apiData[0].PostOffice) {
          setPincodeError("Invalid pincode (does not exist)");
          return;
        }

        // Check if the state from the form matches the state from the API
        const postOfficeDetails = apiData[0].PostOffice;
        const stateMatches = postOfficeDetails.some(
          (office) =>
            office.State.toLowerCase() === formData.state.toLowerCase()
        );

        if (!stateMatches) {
          setPincodeError(`This pincode does not belong to ${formData.state}`);
        }
      } catch (error) {
        if (!cancelled) {
          setPincodeError("Could not validate pincode. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setValidatingPincode(false);
        }
      }
    };

    // Debounce the validation
    const timeoutId = setTimeout(() => {
      validatePincode();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [formData.postalCode, formData.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Block submission if there's a pincode error
    if (pincodeError) {
      return;
    }

    onSubmit(e);
  };

  return (
    <div className="bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-wide">
          {isEditing ? "EDIT ADDRESS" : "ADD NEW ADDRESS"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="state" className="text-sm text-gray-600">
              State *
            </Label>
            {/* State select - when changed, we will set city to first option */}
            <Select
              value={formData.state}
              onValueChange={(newState: string) => {
                onChange("state", newState);
                // when state changes, if fetched cities available pick first
                const firstCity = (STATE_CITY_MAP[newState] || [])[0] || "";
                // if cities fetched use that first one
                if (firstCity) onChange("city", firstCity);
              }}
              name="state"
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    loadingStates ? "Loading states..." : "Select state"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {loadingStates && (
                  <SelectItem value="__loading_states__" disabled>
                    Loading...
                  </SelectItem>
                )}
                {(states || Object.keys(STATE_CITY_MAP)).map((st) => (
                  <SelectItem key={st} value={st}>
                    {st}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm text-gray-600">
              City *
            </Label>
            <Select
              value={formData.city}
              onValueChange={(city: string) => onChange("city", city)}
              name="city"
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    loadingCities ? "Loading cities..." : "Select city"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {loadingCities && (
                  <SelectItem value="__loading_cities__" disabled>
                    Loading...
                  </SelectItem>
                )}
                {(cities.length > 0
                  ? cities
                  : STATE_CITY_MAP[formData.state] || []
                ).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              disabled
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
              className={`bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-0 ${
                pincodeError ? "border-red-500" : ""
              }`}
            />
            {validatingPincode && (
              <p className="text-xs text-blue-600">Validating pincode...</p>
            )}
            {pincodeError && (
              <p className="text-xs text-red-600">{pincodeError}</p>
            )}
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
            disabled={!!pincodeError || validatingPincode}
            className="bg-black text-white hover:bg-gray-800 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default AddressFormMinimal;
