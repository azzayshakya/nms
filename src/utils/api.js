const BASE_URL = import.meta.env.VITE_API_URL || "https://api.f.com";

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Something went wrong");
  }
  return res.json();
}

export const submitInterest = (interested) =>
  request("/interest", {
    method: "POST",
    body: JSON.stringify({ interested, timestamp: new Date().toISOString() }),
  });

export const submitContact = (formData) =>
  request("/contact", {
    method: "POST",
    body: JSON.stringify(formData),
  });
