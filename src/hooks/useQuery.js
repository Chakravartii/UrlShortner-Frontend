import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    ["url-total-clicks"],
    async () => {
      const response = await api.get(
        "/api/url/totalClicks?startDate=2025-11-01&endDate=2025-11-10",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return response;
    },
    {
      select: (data) => {
        const convertToArray = Object.keys(data.data).map((key) => ({
          clickData: key,
          count: data.data[key],
        }));
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};
