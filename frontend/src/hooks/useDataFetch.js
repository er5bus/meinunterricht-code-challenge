import { useState } from "react";
import axios from "axios";

const useDataFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = (searchKeyword = "") => {
    setLoading(true);
    setError(null);

    return axios
      .get(url, {
        params: { keyword: searchKeyword, pageSize: 500 },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, isLoading, error, fetchData };
};

export default useDataFetch;
