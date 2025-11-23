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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Explore the Natural Beauty of Krishnagiri District</title>
    <style>
        /* Basic Styling - You can customize this further */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
            line-height: 1.6;
        }
        .super-header {
            background: linear-gradient(to right, #2c5530, #5a7d5a);
            color: white;
            padding: 10px 0;
            text-align: center;
            font-size: 0.9em;
            letter-spacing: 1px;
        }
        header {
            background-color: white;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        header h1 {
            margin: 0;
            color: #2c5530;
        }
        nav {
            background-color: #5a7d5a;
            padding: 10px 0;
            text-align: center;
        }
        nav a {
            color: white;
            text-decoration: none;
            margin: 0 15px;
            font-weight: bold;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .intro {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .gallery {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            margin: 30px 0;
        }
        .gallery-item {
            width: 300px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .gallery-item:hover {
            transform: translateY(-5px);
        }
        .gallery-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }
        .video-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
            margin: 40px 0;
        }
        .video-placeholder {
            width: 560px;
            height: 315px;
            background-color: #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px dashed #ccc;
            border-radius: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
        }
        th {
            background-color: #5a7d5a;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        footer {
            background-color: #2c5530;
            color: white;
            text-align: center;
            padding: 25px 20px;
            margin-top: 40px;
        }
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
        }
        .footer-links {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            margin: 15px 0;
        }
        .footer-links a {
            color: #c3d4c3;
            text-decoration: none;
        }
        .citation {
            font-size: 0.8em;
            color: #c3d4c3;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div class="super-header">
        Discover the Green Heart of Tamil Nadu | Mango Capital of India
    </div>

    <header>
        <h1>Krishnagiri District: Nature's Unexplored Paradise</h1>
        <p>From serene reservoirs to ancient hills, embark on a journey through lush landscapes.</p>
    </header>

    <nav>
        <a href="#attractions">Natural Attractions</a>
        <a href="#adventure">Adventure</a>
        <a href="#videos">Visual Journey</a>
        <a href="#plan">Plan Your Visit</a>
    </nav>

    <div class="container">
        <section class="intro">
            <h2>Welcome to the Land of Black Hills</h2>
            <p>Blessed with gorgeous natural landscapes and an abundance of black granite, Krishnagiri in Tamil Nadu is a must-visit for the discerning traveller. The name Krishnagiri literally translates into "Black Hill" - 'Krishna' meaning 'black' and 'giri' meaning mountain[citation:3]. Known as the "Mango Capital of India," the district offers a perfect blend of scenic beauty, from tranquil dams and lush forests to historic hills perfect for trekking[citation:3][citation:6].</p>
        </section>

        <section id="attractions">
            <h2>Must-Visit Natural Attractions in Krishnagiri</h2>
            <p>Here are some of the top spots where you can immerse yourself in the district's natural splendor.</p>

            <!-- Image Gallery -->
            <div class="gallery">
                <!-- Replace the src with your actual image paths -->
                <div class="gallery-item">
                    <img src="PATH_TO_KRP_DAM_IMAGE" alt="Scenic view of Krishnagiri Dam and KRP Park">
                    <div style="padding: 15px;">
                        <h3>Krishnagiri Dam & KRP Park</h3>
                        <p>A serene spot built across the Thenpennai River, ideal for boating, picnics, and watching migratory birds[citation:4][citation:6].</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="PATH_TO_KELLAVARAPALLI_IMAGE" alt="Kelavarapalli Dam surrounded by hills">
                    <div style="padding: 15px;">
                        <h3>Kelavarapalli Dam</h3>
                        <p>Located near Hosur, this dam offers tranquility and a pleasant atmosphere with a backdrop of lush hills[citation:1][citation:6].</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="PATH_TO_AIYUR_IMAGE" alt="Aiyur Eco Tourism Park forest view">
                    <div style="padding: 15px;">
                        <h3>Aiyur Eco Tourism Park</h3>
                        <p>Located 1060 meters above sea level, it features bamboo cottages, watchtowers, and cool, evergreen "shola" forests[citation:1][citation:7].</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="PATH_TO_THALLY_IMAGE" alt="Green valley of Thally">
                    <div style="padding: 15px;">
                        <h3>Thally (Little England)</h3>
                        <p>A cool, hilly village with misty mornings, coffee plantations, and forest trails, often called "Little England"[citation:1][citation:6].</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="PATH_TO_FOREST_IMAGE" alt="Krishnagiri Forest Reserve">
                    <div style="padding: 15px;">
                        <h3>Krishnagiri Forest Reserve</h3>
                        <p>Explore dry deciduous forests home to deer, wild boars, and diverse bird species, perfect for trekking and eco-tourism[citation:6].</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="PATH_TO_AVATHANAPATTI_IMAGE" alt="Avathanapatti Lake">
                    <div style="padding: 15px;">
                        <h3>Avathanapatti Lake</h3>
                        <p>A serene destination surrounded by hills, perfect for a quiet retreat, fishing, and bird watching[citation:1][citation:4].</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="adventure">
            <h2>Adventure & Activities</h2>
            <p>For those seeking an adrenaline rush, Krishnagiri's landscape offers several exciting opportunities.</p>
            <ul>
                <li><strong>Trekking:</strong> Embark on a thrilling trek through the hills surrounding Krishnagiri, such as the challenging trail up <strong>Rayakottai Fort</strong> or the less-explored <strong>Maharajakadai Fort Hill</strong>[citation:2][citation:5].</li>
                <li><strong>Boating:</strong> Enjoy peaceful boating experiences on the calm waters of the Krishnagiri Reservoir[citation:2].</li>
                <li><strong>Rock Climbing:</strong> The steep hills around Rayakottai Fort provide ideal conditions for rock climbing[citation:2].</li>
                <li><strong>Wildlife Safari:</strong> Explore the wildlife of Krishnagiri by taking a safari in nearby forests[citation:2].</li>
            </ul>
        </section>

        <section id="videos">
            <h2>Experience Krishnagiri's Beauty Visually</h2>
            <p>Watch these videos to get a glimpse of the stunning landscapes that await you.</p>
            <!-- Video Container -->
            <div class="video-container">
                <!-- Replace the entire div below with an iframe embed code from YouTube -->
                <div class="video-placeholder">
                    [Embed YouTube Video 1 about Krishnagiri Nature here]
                </div>
                <!-- Replace the entire div below with an iframe embed code from YouTube -->
                <div class="video-placeholder">
                    [Embed YouTube Video 2 about Krishnagiri Adventure/Trekking here]
                </div>
            </div>
            <p><em>To add videos, simply replace the placeholder divs above with the embed iframe code provided by YouTube for your chosen videos.</em></p>
        </section>

        <section id="plan">
            <h2>Plan Your Trip</h2>
            <p>Here's some essential information to help you organize your visit to Krishnagiri.</p>

            <h3>Best Time to Visit</h3>
            <p>The ideal time to explore Krishnagiri's natural beauty is during the winter months, from <strong>October to March</strong>, when the weather is pleasant and perfect for outdoor activities[citation:2][citation:3].</p>

            <table>
                <tr>
                    <th>Season</th>
                    <th>Months</th>
                    <th>Weather Conditions</th>
                </tr>
                <tr>
                    <td>Winter</td>
                    <td>October - March</td>
                    <td>Pleasant and ideal for sightseeing and trekking (17°C - 30°C)[citation:2][citation:3].</td>
                </tr>
                <tr>
                    <td>Summer</td>
                    <td>April - June</td>
                    <td>Hot and sunny, best for early morning activities (25°C - 40°C)[citation:2][citation:3].</td>
                </tr>
                <tr>
                    <td>Monsoon</td>
                    <td>July - September</td>
                    <td>Moderate to heavy rainfall; lush greenery but outdoor treks may be difficult[citation:2][citation:3].</td>
                </tr>
            </table>

            <h3>How to Reach</h3>
            <ul>
                <li><strong>By Air:</strong> The nearest airport is in <strong>Bangalore</strong> (approx. 90 km away)[citation:2][citation:3].</li>
                <li><strong>By Rail:</strong> The nearest railway station is in <strong>Hosur</strong>, which is well-connected to major cities[citation:3][citation:7].</li>
                <li><strong>By Road:</strong> Krishnagiri is well-connected by road via National Highways (NH 44 and NH 75). It's about 90 km from Bangalore and 180 km from Chennai[citation:2][citation:3].</li>
            </ul>
        </section>
    </div>

    <footer>
        <div class="footer-content">
            <p><strong>Krishnagiri District Tourism</strong></p>
            <p>Explore the harmony of nature and history.</p>
            <div class="footer-links">
                <a href="#about">About Us</a>
                <a href="#contact">Contact</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Use</a>
            </div>
            <div class="citation">
                <p>Information sourced from official tourism websites and travel guides[citation:1][citation:2][citation:3].</p>
            </div>
        </div>
    </footer>

</body>
</html>


        <!-- Google Analytics 4 -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5RGKSTZ9WW"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5RGKSTZ9WW');
        </script>
        <!-- End Google Analytics -->

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
