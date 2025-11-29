import { useState, useEffect } from "react";
import { useCounts } from "../hooks/useCounts";
import CountForm from "./CountForm";

const CountTable = () => {
  const { getAllCounts, deleteCount, updateCount } = useCounts();
  const [counts, setCounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const response = await getAllCounts();
      setCounts(response.totalCount || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch counts");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (count) => {
    setEditingId(count.countId);
    setEditData({
      location: count.location,
      date: count.countDate,
      count: count.countValue.toString(),
      serviceType: count.serviceType,
      notes: count.notes || "",
      vehicleType: count.vehicleType,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      await updateCount(editingId, updatedData);
      setEditingId(null);
      setEditData(null);
      fetchCounts(); // Refresh the list
    } catch (err) {
      console.error("Failed to update count:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this count?")) {
      try {
        await deleteCount(id);
        fetchCounts(); // Refresh the list
      } catch (err) {
        console.error("Failed to delete count:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatServiceType = (type) => {
    const types = {
      sunday_service: "Sunday Service",
      midweek_service: "Midweek Service",
      special_event: "Special Event",
      conference: "Conference",
      other: "Other",
    };
    return types[type] || type;
  };

  const formatVehicleType = (type) => {
    const types = {
      car: "Car",
      bus: "Bus",
      motorcycle: "Motorcycle",
      van: "Van",
      truck: "Truck",
      other: "Other",
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading counts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Count Records</h2>
        <button
          onClick={fetchCounts}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh
        </button>
      </div>

      {counts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No counts found. Add your first count!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {counts.map((count) => (
                <tr key={count.countId} className="hover:bg-gray-50">
                  {editingId === count.countId ? (
                    <td colSpan="7" className="px-6 py-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">
                          Edit Count
                        </h3>
                        <CountForm
                          initialData={editData}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                          isEditMode={true}
                        />
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(count.countDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatServiceType(count.serviceType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatVehicleType(count.vehicleType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {count.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {count.countValue}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {count.notes || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(count)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(count.countId)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CountTable;
