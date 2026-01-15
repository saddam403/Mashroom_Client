import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export default function useContacts() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["contacts-public"],
    queryFn: async () => (await api.get("/api/contacts")).data,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  const get = (type) => data.find((c) => c.type === type)?.value;

  return {
    isLoading,
    whatsapp: get("whatsapp"),
    facebookProfile: get("facebook_profile"),
    messenger: get("facebook_messenger"),
  };
}
