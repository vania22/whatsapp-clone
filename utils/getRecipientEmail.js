export const getRecipientEmail = (users, loggedInUser) => users.find((u) => u !== loggedInUser.email);
