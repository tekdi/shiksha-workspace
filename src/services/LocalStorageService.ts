export const getLocalStoredUserData = () => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const userId = localStorage.getItem("userId");
      return userId ? userId : null;
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
