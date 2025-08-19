<template>
  <div class="resume-download">
    <button
      @click="downloadResume"
      class="download-btn"
      :class="{
        downloading: isDownloading,
        compact: variant === 'compact',
      }"
      :disabled="isDownloading"
    >
      <div class="btn-content">
        <div class="icon-wrapper">
          <svg
            v-if="!isDownloading"
            class="download-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <svg
            v-else
            class="loading-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke-width="2"></circle>
            <path d="M12 6v6l4 2" stroke-width="2"></path>
          </svg>
        </div>
        <div class="text-content">
          <span class="main-text">
            {{ isDownloading ? "Downloading..." : "Download Resume" }}
          </span>
          <span class="sub-text">PDF • 250KB</span>
        </div>
      </div>

      <!-- Success notification -->
      <div v-if="showSuccess" class="success-notification">
        ✓ Resume downloaded successfully!
      </div>
    </button>

    <!-- Analytics tracking (invisible) -->
    <div
      v-if="trackDownloads"
      class="analytics-tracker"
      ref="analyticsRef"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Props
const props = defineProps({
  trackDownloads: {
    type: Boolean,
    default: true,
  },
  resumeFileName: {
    type: String,
    default: "Dylan_Zambou_Resume.pdf",
  },
  variant: {
    type: String,
    default: "default", // 'default' | 'compact'
    validator: (value) => ["default", "compact"].includes(value),
  },
});

// Reactive state
const isDownloading = ref(false);
const showSuccess = ref(false);
const downloadCount = ref(0);

// Download functionality
const downloadResume = async () => {
  if (isDownloading.value) return;

  try {
    isDownloading.value = true;

    // Track download start
    trackDownloadEvent("download_started");

    // Simulate small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Create download link
    const link = document.createElement("a");
    link.href = `/${props.resumeFileName}`;
    link.download = props.resumeFileName;
    link.target = "_blank";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update state
    downloadCount.value++;
    showSuccess.value = true;

    // Track successful download
    trackDownloadEvent("download_completed");

    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (error) {
    console.error("Download failed:", error);
    trackDownloadEvent("download_failed");
  } finally {
    isDownloading.value = false;
  }
};

// Analytics tracking
const trackDownloadEvent = (eventType) => {
  if (!props.trackDownloads) return;

  // Track in localStorage for now (can be replaced with Google Analytics)
  const downloads = JSON.parse(localStorage.getItem("resumeDownloads") || "[]");
  downloads.push({
    event: eventType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
  });

  localStorage.setItem("resumeDownloads", JSON.stringify(downloads));

  // Log for development
  console.log(`📊 Resume ${eventType}:`, {
    totalDownloads: downloadCount.value,
    timestamp: new Date().toISOString(),
  });
};

// Load download count on mount
onMounted(() => {
  const downloads = JSON.parse(localStorage.getItem("resumeDownloads") || "[]");
  const completedDownloads = downloads.filter(
    (d) => d.event === "download_completed"
  );
  downloadCount.value = completedDownloads.length;
});
</script>

<style scoped lang="scss">
.resume-download {
  position: relative;
  display: inline-block;
}

.download-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: "Montserrat-Medium", sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  min-width: 200px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  &.downloading {
    background: linear-gradient(135deg, #4299e1 0%, #553c9a 100%);

    .loading-icon {
      animation: spin 1s linear infinite;
    }
  }

  // Compact variant - matches "Get In Touch" button style
  &.compact {
    padding: 13px 30px;
    background: transparent;
    color: whitesmoke;
    border: 2px solid whitesmoke;
    border-radius: 30px;
    font-size: 1.1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    min-width: auto;
    box-shadow: none;

    .btn-content {
      gap: 8px;
    }

    .text-content {
      .main-text {
        font-size: 1.1rem;
        font-weight: 500;
      }

      .sub-text {
        display: none; // Hide file size in compact mode
      }
    }

    .icon-wrapper {
      width: 20px;
      height: 20px;

      .download-icon,
      .loading-icon {
        width: 20px;
        height: 20px;
      }
    }

    &:hover:not(:disabled) {
      background: whitesmoke;
      color: #333;
      border-color: whitesmoke;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    &:active:not(:disabled) {
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    &.downloading {
      background: rgba(102, 126, 234, 0.9);
      color: white;
      border-color: rgba(102, 126, 234, 0.9);
    }
  }

  .btn-content {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;

    .download-icon,
    .loading-icon {
      width: 24px;
      height: 24px;
      stroke-width: 2;
    }
  }

  .text-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    .main-text {
      font-size: 16px;
      font-weight: 600;
      line-height: 1.2;
    }

    .sub-text {
      font-size: 12px;
      opacity: 0.8;
      font-weight: 400;
      margin-top: 2px;
    }
  }

  .success-notification {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #48bb78;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
    animation: slideDown 0.3s ease-out;

    &::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #48bb78;
    }
  }
}

// Animations
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

// Mobile responsiveness
@media (max-width: 768px) {
  .download-btn {
    padding: 14px 20px;
    min-width: 180px;
    font-size: 15px;

    .icon-wrapper {
      width: 20px;
      height: 20px;

      .download-icon,
      .loading-icon {
        width: 20px;
        height: 20px;
      }
    }

    .text-content {
      .main-text {
        font-size: 15px;
      }

      .sub-text {
        font-size: 11px;
      }
    }
  }
}

// Small mobile
@media (max-width: 480px) {
  .download-btn {
    min-width: 160px;
    padding: 12px 18px;

    .text-content {
      .main-text {
        font-size: 14px;
      }
    }
  }
}

.analytics-tracker {
  display: none;
}
</style>
