import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // Check if the service account JSON is available in the environment variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error);
    }
  } else {
    // This will use Application Default Credentials if they are configured.
    // In many environments (like Firebase Studio's preview), they are not.
    // Initializing without any config will cause a crash if ADC are not found.
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY not found. Server-side Firebase Admin features will be disabled.");
  }
}

// Export auth only if the app was initialized
export const auth = admin.apps.length ? admin.auth() : null;
