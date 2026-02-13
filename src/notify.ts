// HTTP notification helper for notifying axon-server of chain events

const AXON_SERVER_URL = process.env.AXON_SERVER_URL || "http://localhost:8080";
const INTERNAL_SECRET = process.env.INTERNAL_SECRET || "";

export async function notifyServer(path: string, payload: object): Promise<void> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INTERNAL_SECRET) {
      headers["X-Internal-Secret"] = INTERNAL_SECRET;
    }
    await fetch(`${AXON_SERVER_URL}${path}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn(`[notify] Failed to notify server: ${e}`);
  }
}
