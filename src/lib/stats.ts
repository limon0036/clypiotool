
import { initializeFirebase } from "@/firebase";
import { doc, setDoc, increment } from "firebase/firestore";

/**
 * Tracks tool usage in Firestore for admin analytics.
 * This is non-blocking to prevent UI delays.
 * Uses merge: true to avoid need for getDoc permission checks.
 */
export async function trackToolUsage(toolId: string) {
  try {
    const { firestore } = initializeFirebase();
    
    // 1. Tool Specific Stats
    const statsRef = doc(firestore, "toolStats", toolId);
    setDoc(statsRef, {
      usageCount: increment(1),
      lastUsedAt: new Date().toISOString()
    }, { merge: true }).catch(e => {});

    // 2. Global Daily Aggregates (Real-time tracking for Today/Yesterday/Week)
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyRef = doc(firestore, "daily_aggregates", todayStr);
    setDoc(dailyRef, {
      views: increment(1),
      date: todayStr
    }, { merge: true }).catch(e => {});
    
  } catch (error) {
    // Fail silently in production
  }
}
