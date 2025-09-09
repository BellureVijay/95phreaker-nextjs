export const getUser = () => {
    if (typeof window === "undefined") return null;
    const user = window.localStorage.getItem("user");
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            return {
                email: parsedUser.Email || "",
                name: parsedUser?.name|| "",
                mobileNumber: parsedUser?.MobileNumber || "",
            };
        } catch (e) {
            return null;
        }
    }
    return null;
};
