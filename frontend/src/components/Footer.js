import React, { useEffect, useState } from "react";

const Footer = () => {
  const [settings, setSettings] = useState({
    address: "676/1 Colombo - Galle Main Rd, Panadura",
    contactPhone: "(+94) 77 479 5371",
    supportEmail: "info.veritascampus@gmail.com",
  });

  useEffect(() => {
    // If using local storage:
    const saved = localStorage.getItem('footerSettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  return (
    <footer
      className="text-white w-100 mt-5"
      style={{ backgroundColor: "#55B649", fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="container text-center py-4">
        <p className="fw-bold fs-5">GET SOCIAL WITH US</p>
        <div className="mb-3">
          {/* social links unchanged */}
        </div>

        <div className="row text-center small">
          <div className="col-12 col-md-4 mb-2">Address: {settings.address}</div>
          <div className="col-12 col-md-4 mb-2">Phone: {settings.contactPhone}</div>
          <div className="col-12 col-md-4">
            Email:{" "}
            <a href={`mailto:${settings.supportEmail}`} className="text-white text-decoration-underline">
              {settings.supportEmail}
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#3E9355",
          padding: "10px 0",
          fontSize: "0.85rem",
          fontWeight: "500",
        }}
      >
        <div className="text-center container">
          © 2025 Veritas International. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
