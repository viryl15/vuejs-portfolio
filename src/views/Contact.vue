<template>
  <div class="contact-page">
    <!-- Navigation Header -->
    <header class="contact-header">
      <div class="custom-container">
        <router-link to="/" class="back-link">
          <ArrowLeftIcon class="icon" />
          Back to Portfolio
        </router-link>
      </div>
    </header>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="custom-container">
        <div class="contact-content">
          <!-- Contact Info -->
          <div class="contact-info">
            <h1>Let's Work Together</h1>
            <p class="subtitle">
              Ready to bring your project to life? I'd love to hear about your
              ideas and discuss how we can collaborate.
            </p>

            <div class="info-items">
              <div class="info-item">
                <EnvelopeIcon class="icon" />
                <div>
                  <span class="label">Email</span>
                  <span class="value">{{ userInfo.email }}</span>
                </div>
              </div>

              <div class="info-item">
                <PhoneIcon class="icon" />
                <div>
                  <span class="label">Phone</span>
                  <span class="value">{{ userInfo.phone }}</span>
                </div>
              </div>

              <div class="info-item">
                <MapPinIcon class="icon" />
                <div>
                  <span class="label">Location</span>
                  <span class="value">{{ userInfo.city }}</span>
                </div>
              </div>
            </div>

            <div class="social-links">
              <h3>Connect with me</h3>
              <div class="social-items">
                <a
                  :href="userInfo.links.linkedin"
                  target="_blank"
                  class="social-link"
                >
                  LinkedIn
                </a>
                <a
                  :href="userInfo.links.github"
                  target="_blank"
                  class="social-link"
                >
                  GitHub
                </a>
                <a
                  :href="userInfo.links.instagram"
                  target="_blank"
                  class="social-link"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container">
            <h2>Send me a message</h2>
            <form @submit.prevent="sendMessage" class="contact-form">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Your full name"
                  required
                  :class="{ error: errors.name }"
                />
                <span v-if="errors.name" class="error-message">{{
                  errors.name
                }}</span>
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  :class="{ error: errors.email }"
                />
                <span v-if="errors.email" class="error-message">{{
                  errors.email
                }}</span>
              </div>

              <div class="form-group">
                <label for="subject">Subject *</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  :class="{ error: errors.subject }"
                >
                  <option value="">Select a subject</option>
                  <option value="project">New Project Inquiry</option>
                  <option value="freelance">Freelance Opportunity</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="question">General Question</option>
                  <option value="other">Other</option>
                </select>
                <span v-if="errors.subject" class="error-message">{{
                  errors.subject
                }}</span>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  placeholder="Tell me about your project, timeline, budget, or any questions you have..."
                  required
                  rows="6"
                  :class="{ error: errors.message }"
                ></textarea>
                <span v-if="errors.message" class="error-message">{{
                  errors.message
                }}</span>
                <span class="char-count">{{ form.message.length }}/500</span>
              </div>

              <button type="submit" :disabled="isLoading" class="submit-btn">
                <span v-if="isLoading" class="loading">
                  <div class="spinner"></div>
                  Sending...
                </span>
                <span v-else>
                  <PaperAirplaneIcon class="icon" />
                  Send Message
                </span>
              </button>
            </form>

            <!-- Status Messages -->
            <div v-if="status" :class="['status-message', status]">
              <CheckCircleIcon v-if="status === 'success'" class="icon" />
              <XCircleIcon v-if="status === 'error'" class="icon" />
              <span>{{ statusMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import emailjs from "@emailjs/browser";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";

import userData from "../data.js";

// User info
const userInfo = computed(() => ({
  email: userData.user.email,
  phone: userData.user.phone,
  city: userData.user.city,
  links: userData.links,
}));

// Form data
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Form validation errors
const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

// Form state
const isLoading = ref(false);
const status = ref("");
const statusMessage = ref("");

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Form validation
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  let isValid = true;

  // Name validation
  if (!form.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  // Subject validation
  if (!form.subject) {
    errors.subject = "Please select a subject";
    isValid = false;
  }

  // Message validation
  if (!form.message.trim()) {
    errors.message = "Message is required";
    isValid = false;
  } else if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
    isValid = false;
  } else if (form.message.length > 500) {
    errors.message = "Message must be less than 500 characters";
    isValid = false;
  }

  return isValid;
};

// Send message
const sendMessage = async () => {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;
  status.value = "";

  try {
    // Check if EmailJS configuration is available
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error(
        "EmailJS configuration is missing. Please check your environment variables."
      );
    }

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email using EmailJS
    const result = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
      to_email: userInfo.value.email,
      to_name: userInfo.value.name || "Portfolio Owner",
    });

    // console.log("Email sent successfully:", result);

    status.value = "success";
    statusMessage.value =
      "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.";

    // Reset form
    Object.keys(form).forEach((key) => (form[key] = ""));
  } catch (error) {
    console.error("Error sending email:", error);
    status.value = "error";

    if (error.message.includes("EmailJS configuration")) {
      statusMessage.value =
        "Email service is not configured. Please contact me directly via email.";
    } else {
      statusMessage.value =
        "Sorry, there was an error sending your message. Please try again or contact me directly via email.";
    }
  } finally {
    isLoading.value = false;

    // Clear status after 10 seconds
    setTimeout(() => {
      status.value = "";
    }, 10000);
  }
};
</script>

<style scoped lang="scss">
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.contact-header {
  padding: 1rem 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  .custom-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    padding: 0.875rem 1.375rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-size: 1.25rem;
    font-weight: 500;

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(-4px);
    }
  }
}

.contact-section {
  padding: 4rem 0;

  .custom-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
  }
}

.contact-content {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: 3rem;
  align-items: start;
  width: 100%;

  @media (min-width: 1200px) {
    gap: 4rem;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    gap: 2.5rem;
  }

  // Force side-by-side layout on all screens except mobile
  @media (min-width: 576px) {
    flex-direction: row !important;
    display: flex !important;
    flex-wrap: nowrap !important;
  }

  // Only stack on very small mobile screens
  @media (max-width: 575px) {
    flex-direction: column !important;
    gap: 2rem;
  }
}

.contact-info {
  flex: 1 1 40% !important;
  overflow: hidden;
  min-width: 280px !important;
  max-width: none !important;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    color: white;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .info-items {
    margin-bottom: 2rem;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      color: rgba(255, 255, 255, 0.8);
      flex-shrink: 0;
    }

    .label {
      display: block;
      font-size: 1.25rem;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
    }

    .value {
      display: block;
      color: white;
      font-size: 1.375rem;
    }
  }

  .social-links {
    h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .social-items {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .social-link {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      padding: 1rem 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 20px;
      transition: all 0.3s ease;
      font-size: 1.25rem;
      font-weight: 500;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        transform: translateY(-2px);
      }
    }
  }
}

.contact-form-container {
  flex: 1 1 50% !important;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-width: 380px !important;
  max-width: none !important;

  h2 {
    font-size: 2.125rem;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 1.5rem;
  }
}

.contact-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }

    input,
    select,
    textarea {
      width: 100%;
      padding: 1.125rem;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1.25rem;
      transition: border-color 0.3s ease;
      background: white;

      &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      &.error {
        border-color: #e53e3e;
      }

      &::placeholder {
        color: #a0aec0;
        font-size: 1.25rem;
      }
    }

    textarea {
      resize: vertical;
      min-height: 120px;
    }

    .error-message {
      color: #e53e3e;
      font-size: 1.25rem;
      margin-top: 0.25rem;
      display: block;
    }

    .char-count {
      font-size: 1.125rem;
      color: #a0aec0;
      text-align: right;
      margin-top: 0.25rem;
      display: block;
    }
  }
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.375rem;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.status-message {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &.success {
    background: #f0fff4;
    color: #22543d;
    border: 1px solid #68d391;
  }

  &.error {
    background: #fed7d7;
    color: #742a2a;
    border: 1px solid #fc8181;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Mobile responsiveness
@media (max-width: 768px) {
  .contact-info {
    h1 {
      font-size: 2.75rem;
    }

    .subtitle {
      font-size: 1.375rem;
    }
  }

  .contact-form-container {
    padding: 1.5rem;

    h2 {
      font-size: 1.875rem;
    }

    .form-group {
      label {
        font-size: 1.125rem;
      }

      input,
      select,
      textarea {
        font-size: 1.25rem;
        padding: 1.125rem;
      }
    }

    .submit-btn {
      font-size: 1.25rem;
      padding: 1.25rem;
    }
  }

  .contact-header .back-link {
    font-size: 1.25rem;
    padding: 0.875rem 1.25rem;
  }
}

@media (max-width: 600px) {
  .contact-info h1 {
    font-size: 2.375rem;
  }

  .contact-form-container {
    padding: 1.25rem;
  }
}
</style>
