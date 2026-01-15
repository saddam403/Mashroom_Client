import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../../api/axios";
// import api from "../../api/axios";
import toast from "react-hot-toast";
import { FaWhatsapp, FaFacebookMessenger, FaFacebook } from "react-icons/fa";

const CONTACTS = [
  {
    type: "whatsapp",
    label: "WhatsApp",
    icon: <FaWhatsapp className="text-green-500 text-xl" />,
    placeholder: "+88017xxxxxxxx",
  },
  {
    type: "facebook_messenger",
    label: "Messenger",
    icon: <FaFacebookMessenger className="text-blue-500 text-xl" />,
    placeholder: "https://m.me/username",
  },
  {
    type: "facebook_profile",
    label: "Facebook Profile",
    icon: <FaFacebook className="text-blue-700 text-xl" />,
    placeholder: "https://facebook.com/username",
  },
];

export default function AdminContactSettings() {
  const [active, setActive] = useState(null);
  const qc = useQueryClient();

  const { data: contacts = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => (await api.get("/api/contacts")).data,
  });

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async ({ type, value }) =>
      api.put(`/api/contacts/${type}`, { value }),
    onSuccess: () => {
      toast.success("Updated successfully");
      qc.invalidateQueries(["contacts"]);
      setActive(null);
    },
  });

  const open = (type) => {
    const existing = contacts.find((c) => c.type === type);
    reset({ value: existing?.value || "" });
    setActive(type);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Contact Settings</h2>

      <div className="space-y-3">
        {CONTACTS.map((c) => {
          const current = contacts.find((x) => x.type === c.type);
          return (
            <div
              key={c.type}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-xl"
            >
              <div className="flex items-center gap-3">
                {c.icon}
                <div>
                  <p className="font-medium">{c.label}</p>
                  <p className="text-sm text-gray-500">
                    {current?.value || "Not set"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => open(c.type)}
                className="px-3 py-1 bg-emerald-600 text-white rounded-lg"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="font-bold mb-3">
              Update {CONTACTS.find((x) => x.type === active)?.label}
            </h3>

            <form
              onSubmit={handleSubmit((d) =>
                mutation.mutate({ type: active, value: d.value })
              )}
            >
              <input
                {...register("value", { required: true })}
                placeholder={
                  CONTACTS.find((x) => x.type === active)?.placeholder
                }
                className="w-full border px-3 py-2 rounded"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-emerald-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
