
const axios = require("axios");

const portalClient = axios.create({
  baseURL: process.env.PORTAL_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

async function getMeters({ q = "", page = 1 }) {
  const cookie = process.env.PORTAL_SESSION_COOKIE;

  if (!cookie) {
    throw new Error("PORTAL_SESSION_COOKIE is not configured");
  }

  const response = await portalClient.get("/portal/meters/search", {
    params: { q, page },
    headers: {
      Cookie: cookie,
    },
  });

  return response.data;
}

module.exports = { getMeters };
