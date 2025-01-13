import axios from "axios";
import express from "express";
import moment from "moment-timezone";

const router = express.Router();

interface LocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string; // "loc" contains latitude and longitude as a comma-separated string
  org: string;
  postal: string;
  timezone: string;
}

const getGreeting = (hour: number) => {
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 24) {
    return "Good evening";
  } else {
    return "Hello";
  }
};

router.get("/", async (req, res) => {
  try {
    if (!process.env.IPINFO_API_KEY) {
      return res
        .status(400)
        .json({ error: "Environment variable not provided" });
    }
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const response = await axios.get<LocationData>(
      `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
    );

    const currentHour = moment.tz(response.data.timezone).format("HH");
    console.log("🚀 ~ router.get ~ currentHour:", currentHour);
    const greeting = getGreeting(parseInt(currentHour));

    return res.send({ data: greeting });
  } catch (error) {
    console.error("Error fetching location data:", error);
    return res.status(500).send("Unable to retrieve location data");
  }
});

router.get("/wether", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const response = await axios.get<LocationData>(
      `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`
    );

    const currentHour = moment.tz(response.data.timezone).format("HH");
    console.log("🚀 ~ router.get ~ currentHour:", currentHour);
    const greeting = getGreeting(parseInt(currentHour));

    return res.send({ data: greeting });
  } catch (error) {
    console.error("Error fetching location data:", error);
    return res.status(500).send("Unable to retrieve location data");
  }
});

export default router;
