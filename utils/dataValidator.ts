export interface UserData {
  admin: {
    username: string;
    password: string;
  };
  users: [
    {
      id: number;
      username: string;
      password: string;
      email: string;
    },
  ];
}

export function isValidateUserData(data: any): data is UserData {
  // 1. Verify root structure exists and is an object
  if (!data || typeof data !== "object") return false;

  // 2. Validate the 'admin' nested object
  const admin = data.admin;
  if (!admin || typeof admin !== "object") return false;
  if (typeof admin.username !== "string" || admin.username.trim() === "")
    return false;
  if (typeof admin.password !== "string" || admin.password.trim() === "")
    return false;

  // 3. Validate the 'users' array
  const users = data.users;
  if (!Array.isArray(users) || users.length === 0) return false;

  for (const user of users) {
    if (!user || typeof user !== "object") return false;
    if (typeof user.id !== "number" || isNaN(user.id)) return false;
    if (typeof user.username !== "string" || user.username.trim() === "")
      return false;
    if (typeof user.password !== "string" || user.password.trim() === "")
      return false;
    if (typeof user.email !== "string" || !user.email.includes("@"))
      return false; // Basic email structure check
  }

  // All runtime assertions passed successfully
  return true;
}
