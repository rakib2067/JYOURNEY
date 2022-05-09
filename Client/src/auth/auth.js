export default function useAuth() {
  const user = { loggedIn: false };
  return user && user.loggedIn;
}
