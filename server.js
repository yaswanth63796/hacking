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

    if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");

    const privateRanges = ["10.", "192.168", "172.16", "172.20", "172.30", "127."];
    if (privateRanges.some((p) => ip.startsWith(p))) ip = "8.8.8.8";

    return ip;
}

// Home
app.get("/", (req, res) => {
    res.send(`
        <h2 style="text-align:center">Allow GPS to Track Location</h2>
        <div style="text-align:center; margin-top:40px;">
            <button onclick="getLocation()" 
                style="padding:12px 20px; font-size:18px; background:#007bff; color:white; border:none; border-radius:8px;">
                Track Me
            </button>
        </div>

        <script>
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    fetch("/track", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        })
                    });
                });
            } else {
                alert("Geolocation not supported!");
            }
        }
        </script>
    `);
});

// 📍 Track Route (GPS + IP + ISP)
app.post("/track", async (req, res) => {
    try {
        const ip = getClientIp(req);
        const ua = useragent.parse(req.headers["user-agent"]);

        const gpsLat = req.body.latitude || null;
        const gpsLon = req.body.longitude || null;

        // IP-based location
        let geo = {};
        try {
            const ipRes = await axios.get(`http://ip-api.com/json/${ip}`);
            geo = ipRes.data;
        } catch {
            geo = {};
        }

        const data = {
            ip: ip,
            city: geo.city || "Unknown",
            region: geo.regionName || "Unknown",
            country: geo.country || "Unknown",
            isp: geo.isp || "Unknown",

            // GPS (High accuracy)
            gpsLatitude: gpsLat,
            gpsLongitude: gpsLon,

            device: ua.device.toString(),
            os: ua.os.toString(),
            browser: ua.toAgent(),
            visitedAt: new Date().toISOString(),
        };

        console.log("🔥 New Visitor:", data);

        res.json({ status: "success", received: data });
    } catch (err) {
        console.log("Error:", err);
        res.json({ error: "Tracking failed" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
