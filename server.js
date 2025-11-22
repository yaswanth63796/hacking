const express = require("express");
const cors = require("cors");
const axios = require("axios");
const useragent = require("useragent");

const app = express();
app.use(cors());
app.use(express.json());

// Clean Extract IP Function
function getClientIp(req) {
    let ip =
        req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        "Unknown";

    // Remove IPv6 prefix ::ffff:
    if (ip.startsWith("::ffff:")) {
        ip = ip.replace("::ffff:", "");
    }

    // Ignore local/private IPs → use fallback external IP
    const privateRanges = ["10.", "192.168", "172.16", "172.20", "172.30", "127."];
    if (privateRanges.some((p) => ip.startsWith(p))) {
        ip = "8.8.8.8"; // fallback to show location
    }

    return ip;
}

// 🏠 Home Page with Button
app.get("/", (req, res) => {
    res.send(`
        <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
            <h2>Onume illa… kilichipōdu 😄</h2>
            <button 
                onclick="window.location.href='/track'" 
                style="
                    padding: 12px 20px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                    margin-top: 20px;
                ">
                Click Here
            </button>
        </div>
    `);
});

// 🎯 Tracking Route
app.get("/track", async (req, res) => {
    try {
        const ip = getClientIp(req);
        const ua = useragent.parse(req.headers["user-agent"]);

        // Get Geo Location
        let geo = {};
        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            geo = response.data;
        } catch (err) {
            geo = {};
        }

        const data = {
            ip: ip,
            city: geo.city || "Unknown",
            region: geo.regionName || "Unknown",
            country: geo.country || "Unknown",
            isp: geo.isp || "Unknown",
            timezone: geo.timezone || "Unknown",

            device: ua.device.toString(),
            os: ua.os.toString(),
            browser: ua.toAgent(),

            referrer: req.headers.referer || "Direct",
            visitedAt: new Date().toISOString(),
        };

        console.log("🔥 New Visitor:", data);

        res.send(`
            <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
                <h3>Nalla vandhutingale 😄</h3>
            </div>
        `);
    } catch (err) {
        console.log("Error:", err);
        res.send("<h3>Error occurred</h3>");
    }
});

app.listen(3000, () => {
    console.log("Tracking server running on port 3000");
});
