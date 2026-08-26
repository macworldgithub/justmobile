import { NextRequest, NextResponse } from "next/server";

const BASE = "https://backend-bele.omnisuiteai.com/api/v1";

// ─── Intent helpers ──────────────────────────────────────────────────────────
function detectIntents(query: string): string[] {
  const q = query.toLowerCase();
  const intents: string[] = [];

  if (
    q.includes("balance") ||
    q.includes("data") ||
    q.includes("usage") ||
    q.includes("remaining") ||
    q.includes("how much") ||
    q.includes("gb") ||
    q.includes("internet")
  )
    intents.push("balance");

  if (
    q.includes("plan") ||
    q.includes("service") ||
    q.includes("subscription") ||
    q.includes("package") ||
    q.includes("current plan") ||
    q.includes("my plan") ||
    q.includes("status")
  )
    intents.push("services");

  if (
    q.includes("bill") ||
    q.includes("unbilled") ||
    q.includes("charge") ||
    q.includes("amount") ||
    q.includes("cost") ||
    q.includes("invoice") ||
    q.includes("owing") ||
    q.includes("owe")
  )
    intents.push("unbilled");

  if (
    q.includes("detail") ||
    q.includes("profile") ||
    q.includes("info") ||
    q.includes("name") ||
    q.includes("email") ||
    q.includes("address") ||
    q.includes("suburb") ||
    q.includes("postcode") ||
    q.includes("phone") ||
    q.includes("mobile") ||
    q.includes("contact") ||
    q.includes("who am i") ||
    q.includes("my account")
  )
    intents.push("profile");

  if (
    q.includes("all") ||
    q.includes("everything") ||
    q.includes("overview") ||
    q.includes("summary") ||
    q.includes("dashboard")
  )
    intents.push("balance", "services", "unbilled", "profile");

  // Default: if no intent matched, try a general chat query
  return intents.length > 0 ? [...new Set(intents)] : ["general"];
}

// ─── Formatters ───────────────────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (!bytes) return "0 GB";
  const gb = bytes / (1024 ** 3);
  return gb >= 1 ? `${gb.toFixed(2)} GB` : `${(bytes / (1024 ** 2)).toFixed(0)} MB`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ─── API fetchers ─────────────────────────────────────────────────────────────
async function fetchBalance(custNo: string, token: string) {
  const res = await fetch(
    `${BASE}/customers/${custNo}/balance/mobile?lineSeqNo=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) return null;
  return res.json();
}

async function fetchServices(custNo: string, token: string) {
  const res = await fetch(`${BASE}/customers/${custNo}/services`, {
    headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchUnbilled(custNo: string, token: string) {
  const res = await fetch(`${BASE}/customers/${custNo}/unbilled-summary`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

// ─── Response builders ────────────────────────────────────────────────────────
function buildBalanceResponse(data: any): string {
  const items: any[] = data?.data?.queryItems || [];
  if (!items.length) return "I couldn't find any balance or data information for your account.";

  const dataBuckets = items.filter((i: any) => i.unitCode === "Data");
  const voiceBuckets = items.filter((i: any) => i.unitCode === "Minutes");
  const smsBuckets = items.filter((i: any) => i.unitCode === "SMS");

  const lines: string[] = ["📊 **Your Current Balance:**\n"];

  if (dataBuckets.length) {
    lines.push("🌐 **Data:**");
    for (const d of dataBuckets) {
      const gb = (d.creditValue || 0) / 1024 ** 3;
      const expiry = formatDate(d.expDate);
      lines.push(`  • ${d.accountDesc || "Data"}: ${gb.toFixed(2)} GB remaining (expires ${expiry})`);
    }
  } else {
    lines.push("🌐 Data: No active data balance found.");
  }

  if (voiceBuckets.length) {
    lines.push("\n📞 **Calls:**");
    for (const v of voiceBuckets) {
      lines.push(`  • ${v.accountDesc || "Voice"}: ${v.creditValue || 0} minutes remaining`);
    }
  }

  if (smsBuckets.length) {
    lines.push("\n💬 **SMS:**");
    for (const s of smsBuckets) {
      lines.push(`  • ${s.accountDesc || "SMS"}: ${s.creditValue || 0} SMS remaining`);
    }
  }

  return lines.join("\n");
}

function buildServicesResponse(data: any): string {
  const details = data?.data?.services?.serviceDetails;
  if (!details?.length) {
    return "It looks like you don't have an active service yet. Would you like to buy an eSIM?";
  }

  const svc = details[0];
  const lines: string[] = ["📱 **Your Current Plan & Service:**\n"];
  lines.push(`  • Plan: **${svc.planName || "N/A"}**`);
  lines.push(`  • Service: ${svc.name === "SimplyBig Unlimited" ? "Just Mobile" : svc.name || "N/A"}`);
  lines.push(`  • Status: ${svc.status || "Active"}`);
  if (svc.csn) lines.push(`  • CSN: ${svc.csn}`);
  if (svc.expiry) lines.push(`  • Expiry: ${formatDate(svc.expiry)}`);

  return lines.join("\n");
}

function buildUnbilledResponse(data: any): string {
  const calls = data?.data?.unbilledCallsSummary?.calls;
  if (!calls?.length) return "✅ You have no unbilled charges at the moment.";

  const lines: string[] = ["💳 **Current Unbilled Charges:**\n"];
  for (const call of calls) {
    const amount = parseFloat(call.totalCharge || "0").toFixed(2);
    lines.push(`  • ${call.description || "Charges"}: $${amount}`);
  }

  const total = calls.reduce((sum: number, c: any) => sum + parseFloat(c.totalCharge || "0"), 0);
  lines.push(`\n  **Total Owing: $${total.toFixed(2)}**`);
  return lines.join("\n");
}

function buildProfileResponse(userData: any): string {
  const u = userData?.user;
  if (!u) return "I couldn't find your profile details. Please try logging in again.";

  const lines: string[] = ["👤 **Your Account Details:**\n"];
  if (u.name) lines.push(`  • Name: ${u.name}`);
  if (u.email) lines.push(`  • Email: ${u.email}`);
  if (u.phone || u.mobile) lines.push(`  • Mobile: ${u.phone || u.mobile}`);
  if (u.street || u.address)
    lines.push(`  • Address: ${u.street || u.address}${u.suburb ? ", " + u.suburb : ""}${u.state ? " " + u.state : ""}${u.postcode ? " " + u.postcode : ""}`);
  if (u.custNo) lines.push(`  • Customer No: ${u.custNo}`);
  if (u.status) lines.push(`  • Account Status: ${u.status}`);

  return lines.join("\n");
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, custNo, token, userData } = body;

    if (!query) {
      return NextResponse.json({ message: "Please ask me something about your account." });
    }

    if (!custNo || !token) {
      return NextResponse.json({
        message: "I couldn't verify your identity. Please log in again and try.",
      });
    }

    const intents = detectIntents(query);

    // If "general" — fall through to the existing chat AI
    if (intents[0] === "general") {
      try {
        const res = await fetch("https://backend-bele.omnisuiteai.com/chat/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        return NextResponse.json({
          message: data.message || data.response || "I'm not sure about that. Try asking about your balance, plan, billing, or account details.",
        });
      } catch {
        return NextResponse.json({
          message: "I'm not sure about that. You can ask me about your balance, plan, billing, or account details.",
        });
      }
    }

    // Run all needed API calls in parallel
    const [balanceData, servicesData, unbilledData] = await Promise.all([
      intents.includes("balance") ? fetchBalance(custNo, token) : Promise.resolve(null),
      intents.includes("services") ? fetchServices(custNo, token) : Promise.resolve(null),
      intents.includes("unbilled") ? fetchUnbilled(custNo, token) : Promise.resolve(null),
    ]);

    const parts: string[] = [];

    if (intents.includes("profile")) {
      parts.push(buildProfileResponse(userData));
    }
    if (balanceData) {
      parts.push(buildBalanceResponse(balanceData));
    }
    if (servicesData) {
      parts.push(buildServicesResponse(servicesData));
    }
    if (unbilledData) {
      parts.push(buildUnbilledResponse(unbilledData));
    }

    if (!parts.length) {
      return NextResponse.json({
        message: "I couldn't retrieve that information right now. Please try again in a moment.",
      });
    }

    return NextResponse.json({ message: parts.join("\n\n") });
  } catch (error) {
    console.error("Manage account API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
