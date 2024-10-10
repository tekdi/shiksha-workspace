export const getLocalStoredUserData = () => {
  try {
    const userId = localStorage.getItem("userId");

    if (userId) {
      return userId;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user data from local storage:", error);
    return null;
  }
};
