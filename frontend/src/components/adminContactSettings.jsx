import React, { useState } from "react";

const AdminContactSettings = () => {
  const [formData, setFormData] = useState({
    supportEmail: "",
    contactPhone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.supportEmail.trim()) {
      newErrors.supportEmail = "Support email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.supportEmail)) {
      newErrors.supportEmail = "Please enter a valid email address";
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "Contact phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsSaving(true);

  // Save to localStorage immediately
  localStorage.setItem('footerSettings', JSON.stringify(formData));

  // Optionally simulate API delay
  setTimeout(() => {
    console.log("Contact settings saved:", formData);
    setIsSaving(false);
    // You can add toast or success alert here
  }, 1000);
};


  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="bg-card border border-border rounded-lg shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-card-foreground mb-2">
                Contact Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your organization's contact information and support
                details.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Support Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="supportEmail"
                  className="text-sm font-medium text-card-foreground block"
                >
                  Support Email Address *
                </label>
                <input
                  type="email"
                  id="supportEmail"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleInputChange}
                  placeholder="support@yourcompany.com"
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                    errors.supportEmail
                      ? "border-destructive focus:ring-destructive"
                      : "border-input hover:border-accent"
                  }`}
                />
                {errors.supportEmail && (
                  <p className="text-sm text-red-500">
                    {errors.supportEmail}
                  </p>
                )}
              </div>

              {/* Contact Phone Field */}
              <div className="space-y-2">
                <label
                  htmlFor="contactPhone"
                  className="text-sm font-medium text-card-foreground block"
                >
                  Contact Phone Number *
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
                    errors.contactPhone
                      ? "border-destructive focus:ring-destructive"
                      : "border-input hover:border-accent"
                  }`}
                />
                {errors.contactPhone && (
                  <p className="text-sm text-red-500">
                    {errors.contactPhone}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-card-foreground block"
                >
                  Business Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Suite 100, City, State 12345"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-vertical ${
                    errors.address
                      ? "border-destructive focus:ring-destructive"
                      : "border-input hover:border-accent"
                  }`}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2 bg-[#55B649] text-white font-medium rounded-md hover:bg-[#4da343] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Contact Settings"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                * Required fields. This information will be displayed on your
                footer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContactSettings;
