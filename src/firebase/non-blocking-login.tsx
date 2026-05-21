'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

/** 
 * Initiate anonymous sign-in (non-blocking). 
 * Errors are caught to prevent unhandled promise rejections.
 */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch(() => {
    // Silently catch anonymous sign-in errors
  });
}

/** 
 * Initiate email/password sign-up (non-blocking). 
 * This is a fire-and-forget call; the app should rely on onAuthStateChanged.
 */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  createUserWithEmailAndPassword(authInstance, email, password).catch((error) => {
    console.warn("Sign-up failed:", error.code);
  });
}

/** 
 * Initiate email/password sign-in (non-blocking). 
 * This is a fire-and-forget call; the app should rely on onAuthStateChanged.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password).catch((error) => {
    // We catch the error here to prevent a runtime crash. 
    // The UI can also catch this error if it calls the SDK directly.
    console.warn("Login failed:", error.code);
  });
}
