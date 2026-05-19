const express =
  require("express");

const router =
  express.Router();

const AccessUser =
  require("../models/AccessUser");

/* ---------------- CREATE ACCESS ---------------- */

router.post(
  "/create-access",
  async (req, res) => {
    try {
      const { email } =
        req.body;

      const accessCode =
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      const expiresAt =
        new Date();

      expiresAt.setDate(
        expiresAt.getDate() + 30
      );

      const existingUser =
        await AccessUser.findOne({
          email,
        });

      if (existingUser) {
        existingUser.accessCode =
          accessCode;

        existingUser.expiresAt =
          expiresAt;

        existingUser.active =
          true;

        await existingUser.save();

        return res.json({
          success: true,
          accessCode,
        });
      }

      const user =
        new AccessUser({
          email,
          accessCode,
          expiresAt,
        });

      await user.save();

      res.json({
        success: true,
        accessCode,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

/* ---------------- LOGIN ---------------- */

router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        accessCode,
      } = req.body;

      const user =
        await AccessUser.findOne({
          email,
          accessCode,
          active: true,
        });

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid access code",
        });
      }

      if (
        new Date() >
        user.expiresAt
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Subscription expired",
        });
      }

      res.json({
        success: true,
        message:
          "Access granted",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);

module.exports = router;