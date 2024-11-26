import 'dotenv/config'; // Optional, if using environment variables from a `.env` file
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID,GOOGLE_MAPS_API } from "@env";

export default {
  expo: {
    name: "KnowGo",
    slug: "KnowGo",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      softwareKeyboardLayoutMode: "pan",
      windowSoftInputMode: "adjustPan",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
      
    },
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API // Use environment variables for security
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      // Optional: Add environment variables dynamically  
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    }
  }
};
