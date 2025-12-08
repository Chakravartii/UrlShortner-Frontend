import { useQuery } from "react-query";
import api from "../api/api";
import dayjs from "dayjs";

export const useFetchTotalClicks = (token, onError) => {
  return useQuery(
    ["url-total-clicks"],
    async () => {
        const startDate = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        const endDate = dayjs().format("YYYY-MM-DD");

        const url = `/api/url/totalClicks?startDate=${startDate}&endDate=${endDate}`;

      const response = await api.get(url,
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
          clickDate: key,
          count: data.data[key],
        }));
        // console.log(convertToArray);
        return convertToArray;
      },
      onError,
      staleTime: 5000,
    }
  );
};

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery(
    ["my-shortenUrls"],
    async () => {
      const response = await api.get(
        "/api/url/myurls",
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
        const sortedData = data.data.sort(
            (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
        );
        // console.log(sortedData);
        return sortedData;
      },
        // select: (data) => {
        //     return data.data
        //         .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        //     },

      onError,
      staleTime: 5000,
    }
  );
};
