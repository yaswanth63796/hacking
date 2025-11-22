const express = require("express");
const cors = require("cors");
const axios = require("axios");
const useragent = require("useragent");

const app = express();
app.use(cors());
app.use(express.json());

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

app.get("/track", async (req, res) => {
    try {
        const ip =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            "Unknown";

        const ua = useragent.parse(req.headers["user-agent"]);

        let geo = {};
        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            geo = response.data;
        } catch (e) {
            geo = {};
        }

        const data = {
            ip: ip,
            city: geo.city,
            region: geo.regionName,
            country: geo.country,
            isp: geo.isp,
            timezone: geo.timezone,

            device: ua.device.toString(),
            os: ua.os.toString(),
            browser: ua.toAgent(),

            referrer: req.headers.referer || "Direct",
            visitedAt: new Date().toISOString(),
        };

        console.log("New Visitor:", data);

        res.send(`
            <div style="text-align:center; margin-top:50px; font-family:sans-serif;">
                <h3>Nalla vandhutingale 😄</h3>
            </div>
        `);
    } catch (err) {
        res.send("<h3>Error occurred</h3>");
    }
});

app.listen(3000, () => {
    console.log("Tracking server running on port 3000");
});
