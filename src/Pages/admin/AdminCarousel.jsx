
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { useState } from "react";

export default function AdminCarousel() {
  const [loading, setLoading] = useState(false);
  const { data: slides = [], refetch } = useQuery({
    queryKey: ["admin-carousel"],
    queryFn: async () => (await api.get("/api/carousel")).data,
  });

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    preview: null,
  });

  const submit = async () => {
    setLoading(true);
    if (!form.title || !form.image) return alert("Title & image required");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("image", form.image);

    await api.post("/api/carousel", fd);
    setForm({ title: "", description: "", image: null, preview: null });
    setLoading(false);
    refetch();
  };

  const remove = async (id) => {
    if (!confirm("Delete this slide permanently?")) return;
    await api.delete(`/api/carousel/${id}`);
    refetch();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">
          Trust Carousel
        </h2>
        <span className="text-sm text-gray-500">
          {slides.length} Slides
        </span>
      </div>

      {/* Add Slide */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 space-y-5">
        <h3 className="font-semibold text-lg">Add New Slide</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Slide title"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-(--primary)/30 outline-none"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder="Short description"
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:ring-2 focus:ring-(--primary)/30 outline-none resize-none"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Image Upload */}
        <div className="flex items-center gap-4">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-gray-300 hover:bg-gray-50 transition">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
            📷 Upload Image
          </label>

          {form.preview && (
            <img
              src={form.preview}
              className="h-16 w-28 object-cover rounded-xl shadow"
            />
          )}
        </div>

        {/* <button
          onClick={submit}
          className="inline-flex items-center justify-center rounded-xl px-6 py-2.5
          bg-gradient-to-r from-(--primary) to-blue-500
          text-white font-medium shadow-md hover:shadow-lg hover:opacity-95 transition cursor-pointer"
        >
          Add Slide
        </button> */}


        <button
          onClick={submit}
          disabled={loading}
          className={`inline-flex items-center justify-center rounded-xl px-6 py-2.5
          bg-gradient-to-r from-(--primary) to-blue-500
          text-white font-medium shadow-md transition cursor-pointer
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:opacity-95"}`}
        >
          {loading && <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {loading ? "Processing..." : "Add Slide"}
        </button>

      </div>

      {/* Slides List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((s) => (
          <div
            key={s._id}
            className="group bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={s.image.url}
                className="h-full w-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                {s.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {s.description}
              </p>

              <button
                onClick={() => remove(s._id)}
                className="mt-3 inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-600 cursor-pointer"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
