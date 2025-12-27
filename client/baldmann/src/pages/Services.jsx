import React, { useState } from "react";
import "./Services.css";
import { FaCode, FaMobileAlt, FaMicrochip, FaCube, FaLaptopCode, FaPenFancy } from "react-icons/fa";

const Services = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    company: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const services = [
    {
      id: "web-dev",
      title: "Web Development",
      icon: <FaCode />,
      description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
    },
    {
      id: "app-dev",
      title: "App Development",
      icon: <FaMobileAlt />,
      description: "Native and cross-platform mobile applications for iOS and Android with seamless functionality.",
      features: ["iOS & Android", "Cross-Platform", "User-Friendly", "Scalable"]
    },
    {
      id: "pcb-design",
      title: "PCB Designing",
      icon: <FaMicrochip />,
      description: "Professional PCB design services for electronic projects, from prototypes to production-ready boards.",
      features: ["Custom Layouts", "Multi-Layer PCBs", "Prototyping", "Testing"]
    },
    {
      id: "3d-printing",
      title: "3D Printing",
      icon: <FaCube />,
      description: "High-quality 3D printing services for prototypes, models, and custom parts with precision and detail.",
      features: ["Rapid Prototyping", "Custom Parts", "Multiple Materials", "High Precision"]
    },
    {
      id: "software-dev",
      title: "Software Development",
      icon: <FaLaptopCode />,
      description: "Custom software solutions tailored to your business needs, from desktop applications to enterprise systems.",
      features: ["Custom Solutions", "Scalable Architecture", "Maintenance", "Integration"]
    },
    {
      id: "VR-Simulations",
      title: "VR Simulations ",
      icon: <FaPenFancy />,
      description: "Immersive, research-driven VR experiences designed for therapy, rehabilitation, and clinical training.",
      features: ["Theraputic", "Adaptive", "Research-Backed", "Clinically relevant"]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const exists = prev.services.includes(value);
      let nextServices = prev.services;
      if (checked && !exists) {
        nextServices = [...prev.services, value];
      } else if (!checked && exists) {
        nextServices = prev.services.filter((s) => s !== value);
      }
      return {
        ...prev,
        services: nextServices,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    try {
      setError("");
      setIsSubmitting(true);
      const API_BASE = process.env.REACT_APP_API_BASE || "";
      const servicesLabel = formData.services.join(", ");

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: servicesLabel,
        company: formData.company,
        message: formData.message,
      };

      const resp = await fetch(`${API_BASE}/api/service-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        let msg = "Failed to submit";
        try {
          const data = await resp.json();
          if (data?.error) msg = data.error;
        } catch { }
        throw new Error(msg);
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          services: [],
          company: "",
          message: ""
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1 className="services-title">Our <span>Services</span></h1>
        <p className="services-subtitle">
          Empowering your ideas with cutting-edge technology and creative solutions
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <ul className="service-features">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="service-request-section">
        <h2 className="request-title">Request a <span>Service</span></h2>
        <p className="request-subtitle">
          Fill out the form below and we'll get back to you within 48 hours
        </p>

        <form className="service-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 (10) 1-9"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company (optional)"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Services *</label>
            <div className="services-checkbox-group">
              {services.map((svc) => (
                <label key={svc.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    value={svc.title}
                    checked={formData.services.includes(svc.title)}
                    onChange={handleServiceToggle}
                  />
                  <span>{svc.title}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Details *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us about your project requirements..."
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitted ? "Request Sent!" : (isSubmitting ? "Sending..." : "Send Request")}
          </button>

          {isSubmitted && (
            <p className="success-message">
              Thank you! We've received your request and will contact you soon.
            </p>
          )}
          {error && (
            <p className="error-message">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Services;
