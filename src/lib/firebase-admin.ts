import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  // Check if the service account JSON is available in the environment variables
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    // Fallback for local development without service account key in env
    // This will use Application Default Credentials
    console.warn("FIREBASE_SERVICE_ACCOUNT_KEY not found. Using default credentials for local development. This may not work in all environments.");
    admin.initializeApp();
  }
}

export const auth = admin.auth();
