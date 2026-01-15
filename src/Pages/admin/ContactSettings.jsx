
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactSettings = () => {

  const [showModal, setShowModal] = useState(false);

  // Load WhatsApp Number
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["whatsapp"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/contacts`, {
        method: "GET",
        credentials: "include",
      });
      return res.json(); // { phone: "xxxx" }
    },
  });

  // React Hook Form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { phone: "" },
  });

  // Open modal and set initial form value
  const openModal = () => {
    reset({ phone: data?.phone }); // ← set value WITHOUT useEffect
    setShowModal(true);
  };

  // Save updated number
  const saveNumber = async (formData) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/contacts`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone: formData.phone }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.log(err);
      return;
    }

    toast.success("WhatsApp number updated!");
    refetch();
    setShowModal(false);
  };

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Error loading number</span>;

  return (
    <div className="p-4 mt-4 mx-auto bg-white max-w-96 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-2">WhatsApp Number</h2>

      <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
        <span className="text-md font-medium">Current:</span>

        <span className="font-bold">{data?.phone || "Not Set"}</span>

        <button
          onClick={openModal}
          className="bg-blue-600 px-3 py-1 text-white rounded"
        >
          Change
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-3">Update WhatsApp Number</h3>

            <form onSubmit={handleSubmit(saveNumber)}>
              <input
                {...register("phone")}
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter new number"
                type="number"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>


  )
}

export default ContactSettings