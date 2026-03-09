import { browser } from '$app/environment';
import { PUBLIC_FIREBASE_API_KEY, PUBLIC_FIREBASE_APP_ID, PUBLIC_FIREBASE_AUTH_DOMAIN, PUBLIC_FIREBASE_MESSAGING_SENDER_ID, PUBLIC_FIREBASE_PROJECT_ID, PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

function initFirebase() {
	if (!browser) {
		return;
	}

	if (!app) {
		const apps = getApps();
		app = apps.length ? getApp() : initializeApp({
			apiKey: PUBLIC_FIREBASE_API_KEY,
			authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
			projectId: PUBLIC_FIREBASE_PROJECT_ID,
			storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
			messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			appId: PUBLIC_FIREBASE_APP_ID
		});
		db = getFirestore(app);
	}
}

export async function addSubscriber(email: string, consentText: string) {
	if (!browser) {
		throw new Error('Email sign-up can only be used in the browser.');
	}

	if (!email) {
		throw new Error('Email is required');
	}

	initFirebase();

	if (!db) {
		throw new Error('Firestore is not available');
	}

	const subscribers = collection(db, 'subscribers');

	await addDoc(subscribers, {
		email,
		consentText,
		createdAt: serverTimestamp()
	});
}

