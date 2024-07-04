export default function getMe() {
  const raw = localStorage.getItem("me");
  if (raw) {
    const me = JSON.parse(raw);
    return me;
  }
  return null;
}
