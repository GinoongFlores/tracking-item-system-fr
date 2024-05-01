import { useState, useEffect } from "react";
export const useFormatDate = (dateString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "Asia/Manila",
    };
    const date = new Date(dateString);
    setFormattedDate(date.toLocaleString("en-US", options));
  }, [dateString]);

  return formattedDate;
};
