const express = require("express");
const { getMeters } = require("../client");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = Number(req.query.page || 1);
  const q = String(req.query.q || "").trim();

  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({
      error: "page must be a positive integer",
    });
  }

  try {
    const result = await getMeters({ q, page });

    res.json({
      data: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    });
  } catch (error) {
    const status = error.response?.status;

    res.status(status === 401 || status === 403 ? 502 : 502).json({
      error: "Unable to fetch meter data from the legacy portal",
      upstreamStatus: status || null,
    });
  }
});

module.exports = router;