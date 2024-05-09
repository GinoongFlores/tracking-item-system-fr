export const useStatusComponent = () => {
  return {
    pending: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    delivered:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    received:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    reject: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
};
