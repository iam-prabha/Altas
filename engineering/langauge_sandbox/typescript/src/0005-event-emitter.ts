/**
 * Lesson 5 — Exercise: Type-Safe Event Emitter
 *
 * 1. Implement EventEmitter<T>
 * 2. Run: npx tsx src/0005-event-emitter.ts
 */

type Listener<T> = (payload: T) => void;

interface MyEvents {
  userLogin: { userId: string };
  pageView: { path: string; referrer?: string };
  error: { message: string; code: number };
}

class EventEmitter<T> {
  private listeners = new Map<keyof T, Set<Listener<any>>>();

  on<K extends keyof T>(event: K, listener: Listener<T[K]>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach((fn) => fn(payload));
    }
  }
}

// --- Test it ---

const emitter = new EventEmitter<MyEvents>();

emitter.on("userLogin", (payload) => {
  console.log(`User logged in: ${payload.userId}`);
});

emitter.on("pageView", (payload) => {
  console.log(`Page viewed: ${payload.path}${payload.referrer ? ` (ref: ${payload.referrer})` : ""}`);
});

emitter.on("error", (payload) => {
  console.error(`Error [${payload.code}]: ${payload.message}`);
});

emitter.emit("userLogin", { userId: "alice_01" });
emitter.emit("pageView", { path: "/dashboard" });
emitter.emit("pageView", { path: "/settings", referrer: "/dashboard" });
emitter.emit("error", { message: "Not found", code: 404 });
