// HTTP notification helper for notifying axon-server of chain events

const AXON_SERVER_URL = process.env.AXON_SERVER_URL || "http://localhost:8080";

export async function notifyServer(path: string, payload: object): Promise<void> {
  try {
    await fetch(`${AXON_SERVER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn(`[notify] Failed to notify server: ${e}`);
  }
}
