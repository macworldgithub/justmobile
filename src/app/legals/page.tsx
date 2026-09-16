"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  Smartphone,
  ChevronRight,
  Info,
  ShieldCheck,
  FileSearch,
  HeartHandshake,
  Lock,
  FileSignature,
  HandCoins,
  Package,
  CreditCard,
  Unlock,
  MessageSquare,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Plan {
  _id: string;
  planName: string;
  price: number;
  network: string;
  isActive: boolean;
}

interface LegalDoc {
  id: string;
  title: string;
  description: string;
  filename: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  available: boolean;
}

// ---------------------------------------------------------------------------
// Static legal docs (non-plan CIS documents)
// ---------------------------------------------------------------------------
const LEGAL_DOCS: LegalDoc[] = [
  {
    id: "acceptable-use-policy",
    title: "Acceptable Use Policy",
    description:
      "Explains the rules that apply when you use a JUSTmobile service to protect from unlawful, fraudulent, or harmful use.",
    filename: "/legals/acceptable-use-policy",
    icon: ShieldCheck,
    color: "#0284C7",
    available: true,
  },
  {
    id: "complaints-handling-process",
    title: "Complaints Handling Process",
    description:
      "Explains how JUSTmobile receives, records, investigates, resolves and monitors consumer complaints.",
    filename: "/legals/complaints-handling-process",
    icon: FileSearch,
    color: "#059669",
    available: true,
  },
  {
    id: "domestic-violence-support-policy",
    title: "Domestic, Family & Sexual Violence Support Policy",
    description:
      "Our commitment and support options for customers who are experiencing, or may be at risk of experiencing violence.",
    filename: "/legals/domestic-violence-support-policy",
    icon: HeartHandshake,
    color: "#E11D48",
    available: true,
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description:
      "How we collect, store, use and disclose your personal information in accordance with the Privacy Act 1988.",
    filename: "/legals/privacy-policy",
    icon: Lock,
    color: "#3277df",
    available: true,
  },
  {
    id: "standard-form-of-agreement",
    title: "Standard Form of Agreement (SFoA)",
    description:
      "The contract between you and Just Mobile setting out our mutual rights and obligations for your mobile service.",
    filename: "/legals/standard-form-of-agreement",
    icon: FileSignature,
    color: "#1D4ED8",
    available: true,
  },
  {
    id: "financial-hardship-policy",
    title: "Financial Hardship Policy",
    description:
      "Our commitment to customers experiencing financial hardship, including how to apply for assistance.",
    filename: "/legals/financial-hardship-policy",
    icon: HandCoins,
    color: "#B45309",
    available: true,
  },
];

// ---------------------------------------------------------------------------
// Fade-up animation variant (reused throughout)
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

// ---------------------------------------------------------------------------
// PDF Badge component
// ---------------------------------------------------------------------------
function PdfBadge({ color }: { color: string }) {
  return (
    <div
      className="relative flex-shrink-0 w-10 h-12 rounded-sm flex items-end justify-center pb-1 text-[10px] font-bold"
      style={{ background: `${color}18`, border: `1px solid ${color}30` }}
    >
      <span
        className="absolute top-0 right-0 w-3 h-3"
        style={{
          background: color,
          clipPath: "polygon(0 0, 100% 100%, 100% 0)",
          opacity: 0.6,
        }}
      />
      <span style={{ color }}>PDF</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Plan CIS row
// ---------------------------------------------------------------------------
function CisRow({ plan, index }: { plan: Plan; index: number }) {
  const href = "/legals/critical-information-summary";
  const dataMatch = plan.planName.match(/(\d+\s*GB)/i);
  const dataAmount = dataMatch ? dataMatch[0].replace(/\s/g, "") : null;
  const color = "#3277df";

  return (
    <motion.li
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
    >
      <PdfBadge color={color} />

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{plan.planName}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          {dataAmount && (
            <span className="inline-block mr-3 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
              {dataAmount}
            </span>
          )}
          <span className="text-xs">
            ${plan.price.toFixed(2)}/mo · {plan.network} · PDF
          </span>
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
        style={{ background: "#1a283b" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#1a283b")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background = "#1a283b")
        }
        aria-label={`View Critical Information Summary for ${plan.planName}`}
      >
        <ExternalLink size={14} />
        View
      </a>
    </motion.li>
  );
}

// ---------------------------------------------------------------------------
// Other legal doc tile
// ---------------------------------------------------------------------------
function LegalDocTile({ doc, index }: { doc: LegalDoc; index: number }) {
  const Icon = doc.icon;
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md hover:border-blue-200 transition-all"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center"
        style={{ background: `${doc.color}14`, color: doc.color }}
      >
        <Icon size={22} />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 text-base mb-1">
          {doc.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {doc.description}
        </p>
      </div>

      {/* CTA */}
      {doc.available ? (
        doc.filename.endsWith('.pdf') ? (
          <a
            href={`/legal/${doc.filename}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold mt-auto hover:opacity-80 transition-opacity"
            style={{ color: doc.color }}
          >
            <Download size={14} />
            Download PDF
          </a>
        ) : (
          <a
            href={doc.filename}
            className="inline-flex items-center gap-2 text-sm font-semibold mt-auto hover:opacity-80 transition-opacity"
            style={{ color: doc.color }}
          >
            <ExternalLink size={14} />
            Read Policy
          </a>
        )
      ) : (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 mt-auto">
          <Info size={14} />
          Coming soon
        </span>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function LegalsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backend-bele.omnisuiteai.com/api/v1/plans")
      .then((r) => r.json())
      .then((d) => setPlans(d.data || []))
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#f8f7ff" }}>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}
      <section
        className="relative overflow-hidden py-20 px-6 bg-gradient-to-r from-gray-800 to-gray-900"
      >
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #3277df 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-16 w-[380px] h-[380px] rounded-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #8b96fa 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-300 mb-4">
              Compliance &amp; Transparency
            </span>
            <h1 className="text-xl sm:text-3xl font-bold text-white mb-5 leading-tight">
              Legal &amp; Compliance{" "}
              <span
                className="text-white bg-clip-text"
              // style={{
              //   backgroundImage:
              //     "linear-gradient(90deg, #8b96faff, #7c89f4ff)",
              // }}
              >
                Documents
              </span>
            </h1>
            <p className="text-md text-blue-100 max-w-2xl leading-relaxed">
              Just Mobile is committed to transparency. Every plan comes with a
              Critical Information Summary (CIS) — a plain-English document that
              sets out exactly what's included, what it costs, and how to leave.
            </p>

            {/* Pill features */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                "Plain English summaries",
                "No jargon",
                "Telco Act compliant",
                "Free to download",
              ].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full text-blue-100"
                  style={{ background: "rgba(50,119,223,0.25)", border: "1px solid rgba(139,150,250,0.3)" }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT A CIS COVERS — info strip                                      */}
      <section className="py-10 px-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            {
              icon: <Package size={28} className="text-blue-600 mb-2" />,
              label: "What's included",
              sub: "Calls, SMS &amp; data allowances",
            },
            {
              icon: <CreditCard size={28} className="text-blue-600 mb-2" />,
              label: "What it costs",
              sub: "Monthly fee, set-up &amp; excess charges",
            },
            {
              icon: <Unlock size={28} className="text-blue-600 mb-2" />,
              label: "Lock-in &amp; exit",
              sub: "Contract length &amp; cancellation terms",
            },
            {
              icon: <MessageSquare size={28} className="text-blue-600 mb-2" />,
              label: "How to complain",
              sub: "Our process + TIO referral details",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-start gap-1"
            >
              <div>{item.icon}</div>
              <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
              <p
                className="text-xs text-gray-500 leading-snug"
                dangerouslySetInnerHTML={{ __html: item.sub }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CRITICAL INFORMATION SUMMARIES — per plan                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "#7C3AED18", color: "#3277dfff" }}
              >
                <Smartphone size={18} />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">
                Mobile Plans
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Critical Information Summaries
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              One CIS per plan — download or view online, always free.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-400 gap-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Loading plans…</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No plans found. Please try again later.
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {plans.map((plan, i) => (
                <CisRow key={plan._id} plan={plan} index={i} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* OTHER LEGAL DOCUMENTS                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">
             // Legal Documents
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
              Other Compliance Documents
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-xl">
              Our full suite of regulatory and policy documents, updated
              whenever there is a material change to our services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {LEGAL_DOCS.map((doc, i) => (
              <LegalDocTile key={doc.id} doc={doc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / NEED HELP STRIP */}
      <section
        className="py-14 px-6 bg-gradient-to-r from-gray-800 to-gray-900"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-3">
              Can't find what you're looking for?
            </h2>
            <p className="text-blue-200 text-sm mb-7 max-w-md mx-auto">
              Our support team is available to answer any questions about your
              plan, our policies, or your consumer rights.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/chat-window?support=true"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "#3277df" }}
              >
                Chat with Support
                <ChevronRight size={14} />
              </a>
              <a
                href="mailto:support@justmobile.com.au"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-blue-100 border border-blue-400/40 hover:border-blue-300 transition-all"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* TELCO ACT FOOTNOTE                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-8 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-400 leading-relaxed">
            Just Mobile is an Australian telecommunications provider. Critical
            Information Summaries are provided in accordance with the
            Telecommunications (Consumer Protections and Service Standards) Act
            1999 and ACMA requirements. If you have a complaint that cannot be
            resolved by our support team, you may contact the{" "}
            <a
              href="https://www.tio.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600"
            >
              Telecommunications Industry Ombudsman (TIO)
            </a>{" "}
            at no charge. ABN details and full corporate information are
            available in our Standard Form of Agreement.
          </p>
        </div>
      </section>
    </div>
  );
}
