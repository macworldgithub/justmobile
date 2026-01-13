"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Key,
  CheckCircle,
  AlertCircle,
  Wifi,
  Phone,
  Loader2,
} from "lucide-react";
import { Link } from "../UIComponents/Link";
import { Button } from "../UIComponents/Button";
import { FormInput } from "../UIComponents/FormInput";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/reduxStore";
import { logout } from "@/src/reduxSlices/loginSlice";
import { DeleteCustomerApi } from "../../api/auth";
import { ProfileDropdown } from "../UIComponents/ProfileDropdown";
import DeleteCustomerModal from "../AppComponents/DeleteCustomerModal";

const NAV_LINKS = [
  { label: "BUY ESIM", href: "/" },
  { label: "MANAGE ACCOUNT", href: "/Program" },
  { label: "Support", href: "/support" },
  // { label: "About", href: "/About" },
  // { label: "Contact", href: "/Contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [showUsageModal, setShowUsageModal] = useState(false); // ← NEW: Usage Modal
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageError, setUsageError] = useState("");
  const [usageData, setUsageData] = useState<any>(null);

  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { access_token } = useSelector((state: RootState) => state.login);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = access_token || localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, [access_token]);

  const token = access_token || localStorage.getItem("access_token");
  const custNo = localStorage.getItem("custNo") || "528031";

  const getDisplayServiceName = (name: string) => {
    if (name === "SimplyBig Unlimited") return "Just Mobile";
    return name || "N/A";
  };

  const getPlanDataFromAllowances = (allowances: any[]) => {
    if (!allowances || allowances.length === 0) return null;

    for (let item of allowances) {
      if (item.unitCode === "Data" && item.accountDesc?.includes("Plan")) {
        const match = item.accountDesc.match(/(\d+)GB/);
        if (match) {
          const totalGB = parseFloat(match[1]);
          const remainingBytes = item.creditValue || 0;
          const remainingGB = remainingBytes / 1024 ** 3;
          const usedGB = Math.max(0, totalGB - remainingGB);
          const percentageUsed = totalGB > 0 ? (usedGB / totalGB) * 100 : 0;

          return {
            totalGB,
            usedGB: usedGB.toFixed(1),
            remainingGB: remainingGB.toFixed(1),
            percentageUsed: Math.round(percentageUsed),
            accountDesc: item.accountDesc,
            expDate: item.expDate,
          };
        }
      }
    }
    return null;
  };

  const getTotalRemainingDataGB = (allowances: any[]) => {
    if (!allowances) return "0.00";
    const totalBytes = allowances
      .filter((i) => i.unitCode === "Data")
      .reduce((sum, i) => sum + (i.creditValue || 0), 0);
    return (totalBytes / 1024 ** 3).toFixed(2);
  };

  const checkUsage = async () => {
    if (!token) {
      setUsageError("Please login first.");
      return;
    }

    setUsageLoading(true);
    setUsageError("");
    setUsageData(null);

    try {
      const [serviceRes, mobileBalanceRes, unbilledRes] = await Promise.all([
        fetch(
          `https://bele.omnisuiteai.com/api/v1/customers/${custNo}/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "application/json",
            },
          }
        ),
        fetch(
          `https://bele.omnisuiteai.com/api/v1/customers/${custNo}/balance/mobile?lineSeqNo=1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        fetch(
          `https://bele.omnisuiteai.com/api/v1/customers/${custNo}/unbilled-summary`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      const serviceData = await serviceRes.json();
      const mobileBalanceData = await mobileBalanceRes.json();
      const unbilledData = await unbilledRes.json();

      if (
        !serviceRes.ok ||
        !serviceData.data?.services?.serviceDetails?.length
      ) {
        setUsageError(
          "You don't have an active plan yet. Please choose a plan first!"
        );
        setUsageLoading(false);
        return;
      }

      const service = serviceData.data.services.serviceDetails[0];
      const queryItems = mobileBalanceData.data?.queryItems || [];

      const planData = getPlanDataFromAllowances(queryItems);
      const totalRemainingDataGB = getTotalRemainingDataGB(queryItems);

      setUsageData({
        service,
        planData,
        totalRemainingDataGB,
        unbilled: unbilledData.data?.unbilledCallsSummary?.calls?.[0] || null,
      });
    } catch (err) {
      console.error(err);
      setUsageError("Failed to load usage. Please try again.");
    } finally {
      setUsageLoading(false);
    }
  };

  const handleCheckUsage = () => {
    setShowUsageModal(true);
    checkUsage();
  };

  const handleSwitchToEsim = () => router.push("/chat-window?fromBanner=true");
  const handleLogin = () => router.push("/login");

  const formatBytes = (bytes: number) => {
    if (!bytes) return "0 GB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    setIsLoggedIn(false);
    router.push("/login");
  };
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPin || !newPin || oldPin === newPin) {
      setStatus("error");
      setMessage("Old and new PIN must be different");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("https://bele.omnisuiteai.com/auth/change-pin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
          Authorization: `Bearer ${
            access_token || localStorage.getItem("access_token")
          }`,
        },
        body: JSON.stringify({ oldPin, newPin }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("PIN changed successfully!");
        setTimeout(() => {
          setShowChangePin(false);
          setOldPin("");
          setNewPin("");
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to change PIN");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = () => {
    dispatch(DeleteCustomerApi())
      .unwrap()
      .then(() => {
        setShowDeleteModal(false);
        alert("Customer deleted successfully!");
      })
      .catch((err) => {
        alert(err.message || "Failed to delete customer");
      });
  };

  return (
    <>
      {/* Navbar Code Same */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
        <div className="flex items-center justify-between px-6 py-4 md:px-10">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={12}
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                label={link.label}
                className="text-gray-700 hover:text-blue-600 font-medium"
              />
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <Button
                variant="gradient"
                className="bg-black text-white hover:bg-gray-900"
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : (
              <ProfileDropdown
                onSwitchToEsim={handleSwitchToEsim}
                onLogout={handleLogout}
                onDeleteCustomer={() => setShowDeleteModal(true)}
                onChangePin={() => setShowChangePin(true)}
                onCheckUsage={handleCheckUsage}
              />
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-gray-200 shadow-2xl"
              onClick={() => setIsOpen(false)}
            >
              <div className="px-6 py-8 space-y-6">
                {/* 1. Main Navigation Links - Pehle aayenge */}
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    className="block text-lg font-medium text-gray-800 hover:text-indigo-600 transition-colors py-2"
                  />
                ))}

                {/* 2. Divider */}
                <div className="border-t border-gray-200" />

                {/* 3. Logged-in Actions */}
                {isLoggedIn && (
                  <>
                    <Button
                      variant="destructive"
                      className="w-full text-lg py-6"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setIsOpen(false);
                      }}
                    >
                      Delete Customer
                    </Button>

                    <Button
                      variant="primary"
                      className="w-full text-lg py-6 flex items-center justify-center gap-3"
                      onClick={() => {
                        setShowChangePin(true);
                        setIsOpen(false);
                      }}
                    >
                      Change PIN
                    </Button>

                    <Button
                      variant="primary"
                      className="w-full text-lg py-6 flex items-center justify-center gap-3"
                      onClick={() => {
                        handleCheckUsage();
                        setIsOpen(false);
                      }}
                    >
                      Check Usage
                    </Button>
                  </>
                )}

                {/* 4. Main Action Buttons */}
                <div className="space-y-4">
                  <Button
                    variant="gradient"
                    className="w-full text-lg py-6 font-semibold"
                    onClick={() => {
                      handleSwitchToEsim();
                      setIsOpen(false);
                    }}
                  >
                    Switch to E-sim
                  </Button>

                  {!isLoggedIn ? (
                    <Button
                      variant="gradient"
                      className="w-full text-lg py-6 font-semibold bg-black text-white hover:bg-gray-900"
                      onClick={() => {
                        handleLogin();
                        setIsOpen(false);
                      }}
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full text-lg py-6 font-semibold border-2"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Check Usage Modal */}
  
      <AnimatePresence>
        {showUsageModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUsageModal(false)}
          >
            <motion.div
              className="
          bg-white 
          rounded-3xl 
          shadow-2xl 
          p-5 sm:p-6 md:p-8 
          w-full 
          max-w-lg sm:max-w-xl md:max-w-2xl 
          max-h-[85vh] 
          overflow-y-auto
        "
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                  My Usage
                </h2>
                <button onClick={() => setShowUsageModal(false)}>
                  <X size={26} className="text-gray-500" />
                </button>
              </div>

              {/* Loading */}
              {usageLoading && (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 md:w-16 md:h-16 animate-spin text-green-600 mx-auto mb-4" />
                  <p className="text-base md:text-lg">Loading your usage...</p>
                </div>
              )}

              {/* Error */}
              {usageError && !usageData && (
                <div className="text-center py-10 md:py-14 bg-red-50 rounded-3xl border-2 border-red-200 px-4">
                  <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-red-500 mx-auto mb-4" />
                  <p className="text-lg md:text-xl font-bold text-red-600">
                    {usageError}
                  </p>

                  {usageError.includes("plan") && (
                    <Button
                      variant="gradient"
                      className="mt-6"
                      onClick={() =>
                        router.push("/chat-window?fromBanner=true")
                      }
                    >
                      Choose a Plan Now
                    </Button>
                  )}
                </div>
              )}

              {/* MAIN CONTENT */}
              {usageData && (
                <div className="space-y-6 md:space-y-8">
                  {/* Current Plan Section */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-blue-200">
                    <h3 className="text-lg sm:text-xl font-bold mb-4 text-indigo-800">
                      Current Plan
                    </h3>
                    <div className="space-y-2 sm:space-y-3 text-gray-700 text-base sm:text-lg">
                      <p>
                        <span className="font-semibold">Plan Name:</span>{" "}
                        {usageData.service.planName || "N/A"}
                      </p>
                      <p>
                        <span className="font-semibold">Service:</span>{" "}
                        {getDisplayServiceName(usageData.service.name)}
                      </p>
                      <p>
                        <span className="font-semibold">CSN:</span>{" "}
                        {usageData.service.csn || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Data Usage Section */}
                  <div className="from-emerald-50 to-green-50 rounded-3xl p-6 sm:p-7 md:p-8 border-2 border-emerald-300">
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">
                      Data Usage
                    </h3>

                    {usageData?.planData ? (
                      (() => {
                        const total = Number(usageData.planData.totalGB) || 0;
                        const usedBytes =
                          Number(usageData.planData.usedBytes) || 0;
                        const usedGB = usedBytes / (1024 * 1024 * 1024);

                        const percentageUsed =
                          total > 0 ? (usedGB / total) * 100 : 0;
                        const remaining = total - usedGB;

                        return (
                          <>
                            {/* TOP TEXT */}
                            <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                              This Month: {usedGB.toFixed(2)} / {total} GB
                            </p>

                            {/* PROGRESS BAR */}
                            <div className="w-full bg-gray-200 rounded-full h-5 sm:h-6 overflow-hidden mb-4 relative">
                              <motion.div
                                className="h-full from-green-500 to-emerald-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${percentageUsed}%` }}
                                transition={{ duration: 1 }}
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                              </motion.div>
                            </div>

                            {/* VALUES */}
                            <div className="flex justify-between text-base sm:text-lg">
                              <span className="text-gray-600">
                                <strong className="text-red-600">
                                  {percentageUsed.toFixed(0)}%
                                </strong>{" "}
                                used
                              </span>
                              <span className="text-gray-600">
                                <strong className="text-green-600">
                                  {remaining.toFixed(2)} GB
                                </strong>{" "}
                                remaining
                              </span>
                            </div>
                          </>
                        );
                      })()
                    ) : (
                      <>
                        <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                          Remaining Data: {usageData.totalRemainingDataGB} GB
                        </p>
                        <div className="w-full bg-gray-300 rounded-full h-5 sm:h-6 mb-2">
                          <div
                            className="h-full bg-gray-400 rounded-full"
                            style={{ width: "8%" }}
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          No active data plan detected
                        </p>
                      </>
                    )}
                  </div>

                  {/* Unbilled Amount */}
                  {usageData.unbilled && (
                    <div className="bg-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-orange-300 text-center">
                      <p className="text-base sm:text-xl text-gray-700 mb-2">
                        Current Unbilled Amount
                      </p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600">
                        ${parseFloat(usageData.unbilled.totalCharge).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChangePin && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && setShowChangePin(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
                  <Key className="text-blue-600" size={28} />
                  Change PIN
                </h2>
                <button
                  onClick={() => setShowChangePin(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleChangePin} className="space-y-6">
                <FormInput
                  label="Current PIN"
                  type="password"
                  value={oldPin}
                  onChange={(e) => setOldPin(e.target.value)}
                  placeholder="••••"
                  maxLength={6}
                  required
                />
                <FormInput
                  label="New PIN"
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="••••"
                  maxLength={6}
                  required
                />

                {status !== "idle" && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      status === "success"
                        ? "bg-green-50 border-green-300 text-green-800"
                        : "bg-red-50 border-red-300 text-red-800"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle size={22} />
                    ) : (
                      <AlertCircle size={22} />
                    )}
                    <p className="font-medium">{message}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 text-lg"
                    disabled={
                      loading || !oldPin || !newPin || oldPin === newPin
                    }
                  >
                    {loading ? "Changing..." : "Change PIN"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowChangePin(false)}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Customer Modal */}
      <DeleteCustomerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteCustomer}
      />
    </>
  );
};

export default Navbar;
