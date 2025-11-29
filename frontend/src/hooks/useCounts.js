import { useCallback, useState } from "react";
import axiosInstance from "./useAxios";

/**
 * Custom hook for count operations
 * Provides functions for CRUD operations on counts
 */
export const useCounts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Create a new count
   * @param {Object} countData - Count data to create
   * @returns {Promise} Response data
   */
  const createCount = useCallback(async (countData) => {
    setLoading(true);
    setError(null);
    try {
      // Map form data to API expected format
      const payload = {
        countDate: countData.date,
        serviceType: countData.serviceType,
        vehicleType: countData.vehicleType,
        location: countData.location,
        countValue: parseInt(countData.count),
        notes: countData.notes,
      };

      const response = await axiosInstance.post("/count/create", payload);
      return response.data;
    } catch (err) {
      console.log("errrrrrrrr", err);
      //   const errorMessage =
      //     err.response?.data?.message || err.message || "Failed to create count";
      const errorMessage = "Failed to create count ";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get all counts
   * @returns {Promise} Response data with all counts
   */
  const getAllCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/count/all");
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch counts";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get a single count by ID
   * @param {string} id - Count ID
   * @returns {Promise} Response data with count
   */
  const getCountById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/count/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch count";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update a count
   * @param {string} id - Count ID
   * @param {Object} countData - Updated count data
   * @returns {Promise} Response data with updated count
   */
  const updateCount = useCallback(async (id, countData) => {
    setLoading(true);
    setError(null);
    try {
      // Map form data to API expected format, only include provided fields
      const payload = Object.fromEntries(
        Object.entries({
          countDate: countData.date,
          serviceType: countData.serviceType,
          vehicleType: countData.vehicleType,
          location: countData.location,
          countValue:
            countData.count !== undefined
              ? parseInt(countData.count)
              : undefined,
          notes: countData.notes,
        }).filter(([, value]) => value !== undefined)
      );

      const response = await axiosInstance.put(`/count/${id}`, payload);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update count";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a count
   * @param {string} id - Count ID
   * @returns {Promise} Response data
   */
  const deleteCount = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete(`/count/${id}`);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to delete count";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createCount,
    getAllCounts,
    getCountById,
    updateCount,
    deleteCount,
  };
};
