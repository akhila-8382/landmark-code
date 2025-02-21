document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", function () {
        mobileMenu.style.display = mobileMenu.style.display === "block" ? "none" : "block";
    });

    // Camera Access
    const video = document.getElementById("camera-view");
    const canvas = document.getElementById("canvas");
    const captureBtn = document.getElementById("capture-btn");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
            });
    }

    captureBtn.addEventListener("click", function () {
        const context = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        alert("Photo Captured!");
    });

    // Google Maps
    function initMap() {
        let map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.748817, lng: -73.985428 }, // Default: NYC
            zoom: 15
        });

        const searchBox = document.getElementById("search-box");
        const searchBtn = document.getElementById("search-btn");

        searchBtn.addEventListener("click", function () {
            const location = searchBox.value;
            const geocoder = new google.maps.Geocoder();

            geocoder.geocode({ address: location }, function (results, status) {
                if (status === "OK") {
                    map.setCenter(results[0].geometry.location);
                    new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert("Location not found");
                }
            });
        });
    }

    window.initMap = initMap;
});
