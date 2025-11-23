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

<style>
  .gallery-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
  }
  
  .gallery-title {
    text-align: center;
    color: #2c5530;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom: 30px;
    font-size: 2.2rem;
  }
  
  .image-gallery {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .image-card {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  
  .image-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
  }
  
  .image-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.15);
  }
  
  .image-card:hover img {
    transform: scale(1.1);
  }
  
  .image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
    color: white;
    padding: 15px 10px 10px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.9rem;
  }
  
  .image-card:hover .image-overlay {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .image-gallery {
      gap: 15px;
    }
    
    .image-card {
      width: 160px;
      height: 160px;
    }
  }
  
  @media (max-width: 480px) {
    .image-gallery {
      gap: 10px;
    }
    
    .image-card {
      width: 140px;
      height: 140px;
    }
  }
</style>

<div class="gallery-container">
  <h2 class="gallery-title">Krishnagiri Nature Gallery</h2>
  
  <div class="image-gallery">
    <div class="image-card">
      <a href="https://unsplash.com/photos/a-fern-is-growing-on-the-side-of-a-rock-QEW1VFX6sJ4" target="_blank">
        <img src="https://images.unsplash.com/photo-?<your-params>&w=400" alt="Fern on rock in Krishnagiri"/>
        <div class="image-overlay">Fern on Rock</div>
      </a>
    </div>
    
    <div class="image-card">
      <a href="https://unsplash.com/photos/a-teddy-bear-sitting-on-top-of-a-pile-of-rocks-gWc118tyFG0" target="_blank">
        <img src="https://images.unsplash.com/photo-?<your-params>&w=400" alt="Rocks in Krishnagiri"/>
        <div class="image-overlay">Rock Formations</div>
      </a>
    </div>
    
    <div class="image-card">
      <a href="https://unsplash.com/photos/a-man-riding-a-skateboard-down-a-set-of-stone-steps-zUJzN4hqzI8" target="_blank">
        <img src="https://images.unsplash.com/photo-?<your-params>&w=400" alt="Stone steps in Krishnagiri"/>
        <div class="image-overlay">Ancient Steps</div>
      </a>
    </div>
    
    <div class="image-card">
      <a href="https://unsplash.com/photos/a-close-up-of-a-plant-LHWm4UOkgwE" target="_blank">
        <img src="https://images.unsplash.com/photo-?<your-params>&w=400" alt="Green plant Krishnagiri"/>
        <div class="image-overlay">Lush Greenery</div>
      </a>
    </div>
    
    <div class="image-card">
      <a href="https://unsplash.com/photos/p-pohon-coklat-dan-hijau-e888Pv9hfug" target="_blank">
        <img src="https://images.unsplash.com/photo-?<your-params>&w=400" alt="Tree in Krishnagiri"/>
        <div class="image-overlay">Majestic Trees</div>
      </a>
    </div>
  </div>
</div>


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
