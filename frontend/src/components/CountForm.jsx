import { useEffect, useState } from "react";
import { useCounts } from "../hooks/useCounts";
import DateInput from "./inputs/DateInput";
import NumberInput from "./inputs/NumberInput";
import SelectInput from "./inputs/SelectInput";
import TextAreaInput from "./inputs/TextAreaInput";

const CountForm = ({ initialData, onSave, onCancel, isEditMode = false }) => {
  const { createCount, loading, error } = useCounts();
  const [successMessage, setSuccessMessage] = useState("");

  const [countData, setCountData] = useState({
    location: "main car park",
    date: "2025-11-12",
    count: "",
    serviceType: "sunday_service",
    notes: "",
    vehicleType: "car",
  });

  // Initialize form with initialData if provided (edit mode)
  useEffect(() => {
    if (initialData) {
      setCountData(initialData);
    }
  }, [initialData]);

  const handleChange = (event) => {
    setCountData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    // Clear messages when user starts typing
    if (error || successMessage) {
      setSuccessMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");

    try {
      if (isEditMode && onSave) {
        // Edit mode: call onSave callback
        await onSave(countData);
        setSuccessMessage("Count updated successfully!");
      } else {
        // Create mode: create new count
        const response = await createCount(countData);
        setSuccessMessage(response.message || "Count created successfully!");

        // Reset form after successful submission
        setCountData({
          location: "main car park",
          date: "2025-11-12",
          count: "",
          serviceType: "sunday_service",
          notes: "",
          vehicleType: "car",
        });
      }
    } catch (err) {
      // Error is handled by the hook
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} count:`,
        err
      );
    }
  };

  return (
    <>
      <div
        className={`bg-white ${
          isEditMode ? "w-full" : "w-1/2"
        } pt-2 pb-8 flex justify-center items-center flex-col rounded-lg`}
      >
        <p>{isEditMode ? "Edit Count" : "Enter the car count"}</p>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 w-full">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full">
            {error}
          </div>
        )}
        {/* location, count, date */}
        {/* Location Input */}
        <SelectInput
          label="Location"
          name="location"
          value={countData.location}
          onChange={handleChange}
          options={[
            { value: "main car park", label: "Main Car Park" },
            { value: "overflow", label: "Overflow" },
          ]}
        />
        <SelectInput
          label="Service Type"
          name="serviceType"
          value={countData.serviceType}
          onChange={handleChange}
          options={[
            { value: "sunday_service", label: "Sunday Service " },
            { value: "midweek_service", label: "MidWeek Service " },
            { value: "special_event", label: "Special Event" },
            { value: "conference", label: "Conference" },
            { value: "other", label: "Other" },
          ]}
        />
        <DateInput
          label="Date"
          name="date"
          value={countData.date}
          required={true}
          onChange={handleChange}
        />
        <SelectInput
          label="Vehicle Type"
          name="vehicleType"
          value={countData.vehicleType}
          onChange={handleChange}
          options={[
            { value: "car", label: "Cars" },
            { value: "bus", label: "Buses" },
            { value: "motorcycle", label: "Motorcycles" },
            { value: "van", label: "Vans" },
            { value: "truck", label: "Trucks" },
            { value: "other", label: "Others" },
          ]}
        />

        <NumberInput
          label="Count"
          name="count"
          value={countData.count}
          required={true}
          className="w-100"
          onChange={handleChange}
        />

        <TextAreaInput
          label="Notes"
          name="notes"
          value={countData.notes}
          required={true}
          className="w-100"
          onChange={handleChange}
        />

        <div className="flex gap-4 mt-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`rounded-lg border p-2 bg-amber-100 w-100 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-amber-200"
            }`}
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
              ? "Update"
              : "Submit"}
          </button>
          {isEditMode && onCancel && (
            <button
              onClick={onCancel}
              disabled={loading}
              className="rounded-lg border p-2 bg-gray-100 w-100 cursor-pointer hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CountForm;
