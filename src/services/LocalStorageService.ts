export const getLocalStoredUserData = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const userId = localStorage.getItem("userId");
      return userId ?? "5afb0c71-5e85-46f6-8780-3059cbb7bbf9"; // Do-do : remove the fall back of userId and handle empty case in components
    } catch (error) {
      console.error("Error retrieving user data from local storage:", error);
      return null;
    }
  } else {
    // Running in SSR, return null
    console.warn("Local storage is not available (SSR)");
    return null;
  }
};
