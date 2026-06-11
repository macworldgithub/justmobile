"use client";
import React, { useState, useEffect, useRef } from "react";
import { PaymentCard } from "./PaymentCard";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDob, formatDobToISO, isDeleteIntent } from "@/src/lib/utils";
import sessionStorage from "redux-persist/es/storage/session";
import { motion, AnimatePresence } from "framer-motion";

interface Plan {
  _id: string;
  planNo: number;
  planName: string;
  price: number;
  network: string;
  isActive: boolean;
}

const ChatWindow = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState<
    { id: number; type: "user" | "bot"; text: string; time: string }[]
  >([]);

  const [plans, setPlans] = useState<Plan[]>([]);
  const [showPlans, setShowPlans] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedSim, setSelectedSim] = useState<string | null>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [custNo, setCustNo] = useState<string | null>(null);

  const [showNumberButtons, setShowNumberButtons] = useState(false);
  const [numberOptions, setNumberOptions] = useState<string[]>([]);

  const [userEmail, setUserEmail] = useState("");

  const [showExistingNumberOptions, setShowExistingNumberOptions] =
    useState(false);
  const [showNumberTypeSelection, setShowNumberTypeSelection] = useState(false);
  const [showConfirmNewNumber, setShowConfirmNewNumber] = useState(false);
  const [existingNumberType, setExistingNumberType] = useState<
    "prepaid" | "postpaid" | null
  >(null);
  const [showArnInput, setShowArnInput] = useState(false);
  const [arn, setArn] = useState("");
  const [existingPhone, setExistingPhone] = useState("");
  const [showConfirmExistingNumber, setShowConfirmExistingNumber] =
    useState(false);
  const [isPorting, setIsPorting] = useState(false);
  const [hasSelectedNumber, setHasSelectedNumber] = useState(false);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpTransactionId, setOtpTransactionId] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteIntent, setPendingDeleteIntent] = useState(false);

  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);

  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTypingEnabled, setIsTypingEnabled] = useState(false);
  const [isTransferMode, setIsTransferMode] = useState(false);

  const [numberDecisionMade, setNumberDecisionMade] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [flowCompleted, setFlowCompleted] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const [showTip, setShowTip] = useState(true);

  const [isWaitingForName, setIsWaitingForName] = useState(false);
  const [userName, setUserName] = useState("");
  const [showIdSelection, setShowIdSelection] = useState(false);
  const [pendingNumberChoice, setPendingNumberChoice] = useState<
    "new" | "existing" | null
  >(null);

  // Auto-scroll to bottom whenever chat, loading, or any panel visibility changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [
    chat,
    loading,
    showNumberButtons,
    showPlans,
    showDetailsForm,
    showOtpInput,
    showPayment,
    showInitialOptions,
    showExistingNumberOptions,
    showNumberTypeSelection,
    showConfirmNewNumber,
    showConfirmExistingNumber,
  ]);

  useEffect(() => {
    if (!loading) {
      setTypingDots("");
      return;
    }
    const interval = setInterval(() => {
      setTypingDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);
  const hasLoadedPlans = React.useRef(false);

  useEffect(() => {
    const loadPlans = async () => {
      if (hasLoadedPlans.current) return;
      hasLoadedPlans.current = true;
      try {
        const res = await fetch(
          "https://backend-bele.omnisuiteai.com/api/v1/plans",
        );
        const data = await res.json();
        const list: Plan[] = data.data || [];
        setPlans(list);

        const manageAccountParam = searchParams.get("manageAccount");
        if (manageAccountParam) {
          const userDataStr = localStorage.getItem("userData");
          if (userDataStr) {
            try {
              const userData = JSON.parse(userDataStr);
              addBotMessage(`Welcome back, ${userData.user?.name || "User"}! What data would you like to retrieve? (e.g. User Details, Plans, Status, etc.)`);
              setIsTypingEnabled(true);
              setShowInitialOptions(false);
            } catch (e) {
              addBotMessage("Welcome back! What data would you like to retrieve?");
              setIsTypingEnabled(true);
              setShowInitialOptions(false);
            }
          } else {
            addBotMessage("Please log in first to manage your account.");
            setShowInitialOptions(false);
          }
          return;
        }

        const planParam = searchParams.get("plan");
        if (planParam) {
          const match = list.find((p) => p.planName === planParam);
          if (match) {
            setSelectedPlan(match);
            // New flow: Ask for name first
            addBotMessage("Could I start by asking your name please?");
            setIsWaitingForName(true);
            setIsTypingEnabled(true);
            setShowInitialOptions(false); // ← Don't show 3 options
            return;
          }
        } else {
          setShowInitialOptions(true); // ← Show 3 options only when no plan in URL
        }
      } catch (e) {
        console.error("Failed loading plans:", e);
      }
    };

    loadPlans();
  }, [searchParams]);

  useEffect(() => {
    if (showDetailsForm && states.length === 0) {
      setLoadingStates(true);
      fetch("https://backend-bele.omnisuiteai.com/states")
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Failed to fetch states:", err))
        .finally(() => setLoadingStates(false));
    }
  }, [showDetailsForm]);

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    pin: "",
    custAuthorityNo: "",
    custAuthorityType: "",
  });
  const [formErrors, setFormErrors] = useState<any>({});

  const validateForm = () => {
    const errors: any = {};
    let ok = true;

    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "surname",
      "email",
      "phone",
      "dob",
      "address",
      "suburb",
      "state",
      "postcode",
      "pin",
      "custAuthorityNo",
      "custAuthorityType",
    ];

    for (let field of requiredFields) {
      if (!formData[field].trim()) {
        errors[field] = "Required";
        ok = false;
      }
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email";
      ok = false;
    }
    if (formData.phone && !/^04\d{8}$/.test(formData.phone)) {
      errors.phone = "Invalid AU mobile";
      ok = false;
    }
    if (formData.postcode && !/^\d{4}$/.test(formData.postcode)) {
      errors.postcode = "Postcode must be 4 digits";
      ok = false;
    }
    if (formData.pin && !/^\d{4}$/.test(formData.pin)) {
      errors.pin = "PIN must be 4 digits";
      ok = false;
    }
    if (!formData.custAuthorityNo.trim()) {
      errors.custAuthorityNo = "Customer Authority Number is required";
    }
    if (!formData.custAuthorityType) {
      errors.custAuthorityType = "Please select a Customer Authority Type";
    }

    if (formData.dob) {
      const match = formData.dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (!match) {
        errors.dob = "Please enter date in dd/mm/yyyy format";
        ok = false;
      } else {
        const [, day, month, year] = match;
        const birthDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
        );

        if (
          isNaN(birthDate.getTime()) ||
          Number(day) < 1 ||
          Number(day) > 31 ||
          Number(month) < 1 ||
          Number(month) > 12 ||
          Number(year) < 1900 ||
          Number(year) > new Date().getFullYear()
        ) {
          errors.dob = "Invalid date";
          ok = false;
        } else {
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 18) {
            setAgeError("You must be at least 18 years old to sign up.");
            ok = false;
          } else {
            setAgeError("");
          }
        }
      }
    } else {
      errors.dob = "Date of birth is required";
      ok = false;
    }

    setFormErrors(errors);
    return ok;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof typeof formData;
    const { value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev: any) => ({ ...prev, [name]: "" }));

    if (name === "dob") {
      if (
        value.length <= 10 &&
        (/\d/.test(value.slice(-1)) || value.endsWith("/"))
      ) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev: any) => ({ ...prev, [name]: "" }));
      }

      if (value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
        const [, day, month, year] = value.split("/").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          setAgeError("You must be at least 18 years old to sign up.");
        } else {
          setAgeError("");
        }
      } else {
        setAgeError("");
      }
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    const isoDob = formatDobToISO(formData.dob);

    sessionStorage.setItem("userDOB", isoDob);
    setUserEmail(formData.email);
    sessionStorage.setItem("userEmail", formData.email);

    const formatted = Object.entries(formData)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");

    setShowDetailsForm(false);

    // if (isTransferMode && !pendingNumberChoice) {
    //   setShowExistingNumberOptions(true);
    // }
    await handleSend(formatted);

    if (isTransferMode && !pendingNumberChoice) {
      addBotMessage(
        "Thanks! Now let's proceed with transferring your existing number. Please provide your number details below.",
      );
    } else if (pendingNumberChoice === "existing") {
      setShowNumberTypeSelection(false);
      setShowNumberButtons(false);
      setShowExistingNumberOptions(true);
      addBotMessage(
        "Thanks! Now let's proceed with transferring your existing number. Please provide your number details below.",
      );
    } else {
      // For new numbers, handleSend logic will automatically show the number selection buttons
      // based on the bot's response containing 5 mobile numbers.
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("custNo");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userDOB");
  }, []);

  const callAPI = async (text: string) => {
    const payload = sessionId
      ? { query: text, session_id: sessionId, brand: "Just mobile" }
      : { query: text, brand: "Just mobile" };

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) return null;
      const data = await res.json();

      if (!sessionId && data.session_id) setSessionId(data.session_id);
      if (data.custNo) setCustNo(data.custNo);
      if (data.custNo) sessionStorage.setItem("custNo", data.custNo);
      return data;
    } catch (e) {
      console.error("API error:", e);
      return null;
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg = {
      id: chat.length + 1,
      type: "user" as const,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    if (isWaitingForName) {
      setUserName(text);
      setIsWaitingForName(false);
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));
      setLoading(false);
      addBotMessage(
        `Ok ${text}, let's get your eSIM setup. Do you want to keep your existing phone number or get a new one?`,
      );
      setShowNumberTypeSelection(true);
      setIsTypingEnabled(false);
      return;
    }

    setLoading(true);

    if (text.toLowerCase().trim() === "signup") {
      setIsTypingEnabled(false);
    }

    const manageAccountParam = searchParams.get("manageAccount");
    if (manageAccountParam) {
      const userDataStr = localStorage.getItem("userData");
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr);
          const lowerText = text.toLowerCase();
          let responseText = "I'm not sure how to answer that from your account details. You can ask about your User Details, Plan, or Status.";
          if (lowerText.includes("user") || lowerText.includes("detail") || lowerText.includes("profile")) {
            responseText = `User Details:\nName: ${userData.user?.name}\nEmail: ${userData.user?.email}\nAddress: ${userData.user?.street}, ${userData.user?.suburb}, ${userData.user?.state} ${userData.user?.postcode}`;
          } else if (lowerText.includes("plan")) {
            responseText = `Your Plan: ${userData.user?.plan}\nSpeed: ${userData.user?.speed}\nData Limit: ${userData.user?.dataLimit}GB\nUsed: ${userData.user?.dataUsed}GB\nExpiry: ${userData.user?.expiry}`;
          } else if (lowerText.includes("status") || lowerText.includes("account")) {
            responseText = `Account Status: ${userData.user?.status}\nCustomer No: ${userData.user?.custNo}\nCustomer Error: ${userData.customer?.errorDescription || 'None'}`;
          }
          addBotMessage(responseText);
          setLoading(false);
          return;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (isDeleteIntent(text)) {
      try {
        const data = await callDeleteIntentAPI(text);
        setLoading(false);
        if (data?.message) {
          addBotMessage(normalizeBrandName(data.message));
        }
        setPendingDeleteIntent(true);
        setShowDeleteModal(true);
        return;
      } catch (err) {
        setLoading(false);
        addBotMessage("Something went wrong. Please try again.");
        return;
      }
    }

    await new Promise((res) => setTimeout(res, 50));

    if (text.toLowerCase().includes("new number") && showConfirmNewNumber) {
      const botText = "Please choose a number from the selection below.";
      setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: botText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setLoading(false);
      return;
    }

    const data = await callAPI(text);
    setLoading(false);

    if (!data) {
      return setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: "Oops! Something went wrong.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    const botText = normalizeBrandName(data.message || data.response || "");

    if (
      botText.toLowerCase().includes("first name") ||
      botText.toLowerCase().includes("surname")
    ) {
      if (!showNumberTypeSelection && !showConfirmNewNumber) {
        setShowDetailsForm(true);
        setIsTypingEnabled(false);
      }
      return;
    }

    const matches = botText.match(/04\d{8}/g);
    if (matches?.length === 5 && !isPorting && !hasSelectedNumber) {
      setNumberOptions(matches);
      setShowNumberButtons(true);
      return;
    }

    if (botText.trim()) {
      setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: botText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  };

  const handleNewNumber = () => {
    addUserMessage("New Number");
    setPendingNumberChoice("new");
    setIsTransferMode(false);
    setShowNumberTypeSelection(false);
    addBotMessage(
      "Make sure you enter the phone number you want to port over and the Birth Date as per your current network. I won’t store any of this information, so don’t worry.",
    );
    setShowIdSelection(true);
  };

  const confirmNewNumber = async (yes: boolean) => {
    setShowConfirmNewNumber(false);

    if (!yes) {
      setShowNumberTypeSelection(true);
      return;
    }

    setSelectedOption("new");
    setIsPorting(false);
    setHasSelectedNumber(false);
    setNumberDecisionMade(false);

    addBotMessage(
      "Thanks, now it's time to choose a number from the selection below.",
    );
    await handleSend("new number");
  };

  const handleExistingNumber = () => {
    addUserMessage("Existing Number");
    setPendingNumberChoice("existing");
    setIsTransferMode(true);
    setShowNumberTypeSelection(false);
    addBotMessage(
      "Make sure you enter the phone number you want to port over and the Birth Date as per your current network. I won’t store any of this information, so don’t worry.",
    );
    setShowIdSelection(true);
  };

  const handleExistingTypeSelect = (type: "prepaid" | "postpaid") => {
    setExistingNumberType(type);
    setShowArnInput(type === "postpaid");
  };

  const handleExistingNumberSubmit = async () => {
    if (!existingPhone.match(/^04\d{8}$/)) {
      alert(
        "Please enter a valid 10-digit Australian mobile number starting with 04",
      );
      return;
    }
    if (existingNumberType === "postpaid" && !arn.trim()) {
      alert("Please enter your ARN (Account Reference Number)");
      return;
    }

    setLoading(true);

    try {
      localStorage.setItem("portingNumber", existingPhone);

      setIsPorting(true);
      setHasSelectedNumber(true);
      setShowNumberButtons(false);
      setSelectedSim(existingPhone);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!custNo) {
        addBotMessage(
          "We're having trouble fetching your customer ID. Please try again in a moment.",
        );
        return;
      }

      const res = await fetch(
        "https://backend-bele.omnisuiteai.com/api/v1/auth/otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ custNo, destination: existingPhone }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP request failed");

      setOtpTransactionId(data.data.getOtp.transactionId);
      setShowExistingNumberOptions(false);
      setShowOtpInput(true);
      addBotMessage("OTP has been sent. Please enter it to proceed.");
    } catch (err) {
      console.error(err);
      addBotMessage("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!existingPhone || !existingPhone.match(/^04\d{8}$/)) {
      addBotMessage("Cannot resend OTP: Invalid phone number.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://backend-bele.omnisuiteai.com/api/v1/auth/otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ custNo, destination: existingPhone }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to resend OTP");

      setOtpTransactionId(data.data.getOtp.transactionId);
      setOtpCode("");
      addBotMessage("A new OTP has been sent to your number.");
    } catch (err) {
      console.error(err);
      addBotMessage("Failed to resend OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const confirmExistingNumber = (yes: boolean) => {
    setShowConfirmExistingNumber(false);
    if (yes) {
      localStorage.setItem("existingPhoneNumber", existingPhone);
      if (existingNumberType === "postpaid") {
        localStorage.setItem("arn", arn);
      }

      setIsPorting(true);
      setHasSelectedNumber(true);
      setSelectedSim(existingPhone);
      setNumberDecisionMade(true);
      setShowNumberButtons(false);

      if (selectedPlan) {
        setShowPlans(false);
      } else {
        setShowPlans(true);
      }

      addBotMessage(
        `Great! We'll port your existing number ${existingPhone}. Now please choose a plan.`,
      );
    } else {
      setShowExistingNumberOptions(true);
    }
  };

  const addUserMessage = (text: string) => {
    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user" as const,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const addBotMessage = (text: string) => {
    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot" as const,
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const normalizeBrandName = (text: string) => {
    return text.replace(/flying\s*kiwi/gi, "JUSTmobile");
  };

  const handleNumberSelect = async (num: string) => {
    setSelectedSim(num);
    setHasSelectedNumber(true);
    setShowNumberButtons(false);
    setShowInitialOptions(false);
    setIsTypingEnabled(false);

    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user",
        text: `You selected this number: ${num}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setLoading(true);
    await new Promise((r) => setTimeout(r, 50));
    await callAPI(num);
    setLoading(false);

    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot",
        text: selectedPlan
          ? "Perfect! Let's continue with payment."
          : "Choose one of the plans below:",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    if (selectedPlan) setShowPayment(true);
    else setShowPlans(true);
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    localStorage.setItem("planPrice", String(plan.price));
    setShowPlans(false);

    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user",
        text: `You selected this plan: ${plan.planName}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    callAPI(`User selected plan ${plan.planName}`);
    setShowPayment(true);
  };

  const handleIdSelection = (type: string) => {
    const label =
      type === "DL"
        ? "Driver License"
        : type === "PA"
          ? "Passport"
          : type === "PI"
            ? "Proof of Age Card"
            : "Pensioner Card";
    addUserMessage(label);
    setFormData((prev) => ({ ...prev, custAuthorityType: type }));
    setShowIdSelection(false);
    if (selectedPlan) {
      addBotMessage(
        `You selected plan ${selectedPlan.planName} — $${selectedPlan.price}. Let’s continue with your setup.`,
      );
    }
    setShowDetailsForm(true);
  };

  const handleOtpVerify = async () => {
    if (otpCode.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return;
    }
    try {
      const res = await fetch(
        "https://backend-bele.omnisuiteai.com/api/v1/auth/otp/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: otpCode,
            transactionId: otpTransactionId,
          }),
        },
      );

      const data = await res.json();
      const verifyOtp = data?.data?.verifyOtp;

      if (!verifyOtp?.valid) {
        alert(verifyOtp?.message || "OTP verification failed");
        return;
      }

      setOtpVerified(true);
      setShowOtpInput(false);
      addBotMessage(
        "OTP verified successfully! Please choose a plan to continue.",
      );
      if (!selectedPlan) {
        setShowPlans(true);
      } else {
        setShowPayment(true);
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed. Please try again.");
    }
  };

  const callDeleteIntentAPI = async (text: string) => {
    const res = await fetch("https://backend-bele.omnisuiteai.com/chat/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: text }),
    });

    if (!res.ok) throw new Error("Delete intent API failed");
    return res.json();
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    setPendingDeleteIntent(false);

    const storedCustNo = localStorage.getItem("custNo");

    if (!storedCustNo) {
      addBotMessage(
        "You need to sign up or log in first before deleting your account.",
      );
      return;
    }

    try {
      await callAPI(`Yes I am sure, my custNo is -- ${storedCustNo}`);
      addBotMessage("Your account has been deleted successfully.");
      localStorage.clear();
    } catch (err) {
      addBotMessage("Failed to delete your account. Please try again.");
    }
  };

  const handleActivateOrder = async () => {
    setLoading(true);
    try {
      const isPorting =
        existingNumberType === "prepaid" || existingNumberType === "postpaid";
      const existingType = existingNumberType;
      const arn = localStorage.getItem("arn") || "";
      const dob = formData.dob || "";
      const portingNo = localStorage.getItem("portingNumber") || "";
      const activationNumber = isPorting ? portingNo : selectedSim || "";

      let body: any = {
        number: activationNumber,
        cust: {
          custNo,
          suburb: formData.suburb,
          postcode: formData.postcode,
          address: formData.address.trim(),
          email: formData.email,
        },
        planNo: String(selectedPlan?.planNo),
        simNo: "",
      };

      if (isPorting) {
        body.numType = existingType;
        if (existingType === "prepaid") {
          body.cust.dob = dob;
        } else if (existingType === "postpaid") {
          body.cust.arn = arn;
        }
      }

      const url = isPorting
        ? "https://backend-bele.omnisuiteai.com/api/v1/orders/activate/port"
        : "https://backend-bele.omnisuiteai.com/api/v1/orders/activate";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Activation failed");
      const receiptNumber = data?.data?.orderId || "";

      const activationMessage = `Great news... your eSIM has been created with Just mobile.\n\nHere is your receipt number: ${receiptNumber}.\nTake a copy of it now, but you will also be getting an email of it.\n\nStep 3 is installing the eSIM on your phone.\nYou will receive a QR Code in the next 5 to 10 minutes via email from: donotreply@mobileservicesolutions.com.au\n\nMake sure to check your junk mail if it hasn't arrived in the next 5 to 10 minutes.`;

      setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: activationMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setFlowCompleted(true);
      setShowInitialOptions(false);
      setIsTypingEnabled(true);
      setLoading(false);
    } catch (err) {
      console.error("Activation error:", err);

      const failureMessage = `Unfortunately, we couldn't complete your SIM activation.\n\nThis can sometimes happen if:\n• Some of the details provided were incorrect\n• There was a temporary system issue\n• The selected number or SIM could not be validated\n\nNo worries — you can try again or choose one of the options below, and I'll help you from there.`;

      setChat((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          text: failureMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setFlowCompleted(false);
      setShowInitialOptions(true);
      setIsTypingEnabled(false);
    }
  };

  const handleInitialOptionSelect = async (option: string) => {
    setSelectedOption(option);
    setShowInitialOptions(false);

    const userMsg = {
      id: chat.length + 1,
      type: "user" as const,
      text: option,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setChat((prev) => [...prev, userMsg]);

    if (option === "Buy an eSIM") {
      addBotMessage("Could I start by asking your name please?");
      setIsWaitingForName(true);
      setIsTypingEnabled(true);
    } else if (option === "transfer-number") {
      setIsTransferMode(true);
      setPendingNumberChoice("existing");
      setShowTip(true);
      await handleSend("signup");
    } else if (option === "Account, billing or Technical Problem") {
      setIsTypingEnabled(true);
      addBotMessage(
        "Please describe your account, billing, or technical issue and I'll help you resolve it.",
      );
      // } else if (option === "transfer-number") {
      //   setIsTransferMode(true);
      //   setShowTip(true);
      //   await handleSend("signup");
    }
  };

  const sendMessage = () => {
    handleSend(message);
  };

  useEffect(() => {
    if (showDetailsForm && isTransferMode) {
      setShowTip(true);
    } else {
      setShowTip(false);
    }
  }, [showDetailsForm, isTransferMode]);

  // ─── Shared class strings ───────────────────────────────────────────────────
  const gradientBtn =
    "bg-gradient-to-r from-[#919191] to-[#231e20] text-white font-semibold rounded-xl hover:opacity-80 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-white/40";

  const blueBtn =
    "bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300";

  const panelBase =
    "bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl";

  const inputBase =
    "w-full p-2.5 rounded-xl bg-white/10 text-white placeholder-white/50 border border-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition";

  const errorText = "text-red-300 text-xs mt-1";

  return (
    <div className="relative w-full h-[100dvh] bg-[#05263D] overflow-hidden">
      {/* ── Background layers ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
        style={{ backgroundImage: "url('/images/bgbanner.png')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#919191]/80 via-[#231e20]/90 to-[#000000]/85 backdrop-blur-md" />

      {/* ── Chat container ────────────────────────────────────────────────── */}
      {/*
        Positioning: sits below a top-nav of ~7rem (top-28).
        On very small screens (< 375 px) we use top-20 so the panel
        doesn't clip behind a shorter nav.
      */}
      <div className="absolute top-20 sm:top-28 inset-x-0 bottom-0 z-10 flex flex-col bg-white/10 backdrop-blur-xl border-t border-white/20 shadow-2xl overflow-hidden">
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md shrink-0">
          {/* Logo / brand placeholder */}
          <div className="flex items-center gap-2">
            {/* You can place a logo image here */}
          </div>
          <button
            onClick={() => router.push("/")}
            aria-label="Close chat"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-2xl font-bold text-gray-700 leading-none"
          >
            ×
          </button>
        </header>

        {/* ── Scrollable message area ──────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-3 sm:px-5 md:px-8 py-4 space-y-1">
          {/* Title */}
          <div className="text-center mb-4 mt-2">
            <h2 className="text-white font-semibold text-base sm:text-lg drop-shadow-sm">
              How can I help you today?
            </h2>
          </div>

          {/* Selected plan banner */}
          {selectedPlan && (
            <div className="mb-3 bg-white/20 border border-white/30 text-white text-center text-sm px-3 py-2 rounded-xl shadow-md">
              You selected <strong>{selectedPlan.planName}</strong> — $
              {selectedPlan.price}. Let's continue with your setup.
            </div>
          )}

          {/* ── Messages ──────────────────────────────────────────────────── */}
          {chat.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.type === "user" ? "justify-end" : "justify-start"
                } mb-2`}
            >
              {msg.type === "bot" && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 overflow-hidden ring-2 ring-white/30 self-start mt-1">
                  <img
                    src="/images/bele-logo.png"
                    alt="Bot"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`relative rounded-2xl px-3.5 py-2.5 shadow-md max-w-[85%] sm:max-w-[75%] md:max-w-[65%] ${msg.type === "user"
                  ? "bg-white text-[#0E3B5C] rounded-br-sm"
                  : "bg-white text-[#0E3B5C] rounded-bl-sm"
                  }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed break-words whitespace-pre-line">
                  {msg.text}
                </p>
                <span className="block text-right text-[10px] text-gray-400 mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-end gap-2 mb-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden ring-2 ring-white/30 shrink-0">
                <img
                  src="/images/bele-logo.png"
                  alt="Typing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-md">
                <p className="text-[#0E3B5C] text-xs sm:text-sm font-medium">
                  Just mobile's Assistant
                </p>
                <p className="text-[#0E3B5C] text-xs sm:text-sm">
                  Just a moment{typingDots}
                </p>
              </div>
            </div>
          )}

          {/* ── Initial option buttons ─────────────────────────────────────── */}
          {showInitialOptions && (
            <div className={`${panelBase} p-4 mt-3 flex flex-col gap-2`}>
              {[
                { label: "Buy an eSIM", value: "Buy an eSIM" },
                {
                  label: "Account, billing or Technical Problem",
                  value: "Account, billing or Technical Problem",
                },
                { label: "Transfer my Number", value: "transfer-number" },
              ].map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => handleInitialOptionSelect(value)}
                  className={`${gradientBtn} w-full py-3 px-4 text-sm sm:text-base`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={chatEndRef} />
        </div>

        {/* ── Bottom action panels ─────────────────────────────────────────── */}
        <div className="shrink-0 px-3 sm:px-5 md:px-8 pb-safe-bottom pb-3 space-y-2">
          {/* ── Details form ─────────────────────────────────────────────── */}
          {showDetailsForm && (
            <form
              onSubmit={handleFormSubmit}
              className={`${panelBase} p-3 sm:p-4 overflow-y-auto max-h-[45vh] sm:max-h-[50vh]`}
            >
              {/* Tip banner */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mb-3 px-4 py-3 rounded-xl border border-blue-400/30 bg-gradient-to-r from-white to-teal-500/10 text-black text-xs sm:text-sm shadow"
                >
                  <p className="leading-relaxed">
                    <span className="font-semibold text-blue-700">
                      Before you start:
                    </span>{" "}
                    If you're transferring your number, you'll need your{" "}
                    <span className="font-semibold underline decoration-blue-500">
                      existing provider account number
                    </span>
                    .
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Form grid — 1 col on mobile, 2 col on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* First Name */}
                <div>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    placeholder="First Name"
                    className={inputBase}
                    required
                  />
                  {formErrors.firstName && (
                    <p className={errorText}>{formErrors.firstName}</p>
                  )}
                </div>

                {/* Surname */}
                <div>
                  <input
                    name="surname"
                    value={formData.surname}
                    onChange={handleFormChange}
                    placeholder="Surname"
                    className={inputBase}
                    required
                  />
                  {formErrors.surname && (
                    <p className={errorText}>{formErrors.surname}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Email"
                    type="email"
                    className={inputBase}
                    required
                  />
                  {formErrors.email && (
                    <p className={errorText}>{formErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Phone (e.g. 0412345678)"
                    className={inputBase}
                    required
                  />
                  {formErrors.phone && (
                    <p className={errorText}>{formErrors.phone}</p>
                  )}
                </div>

                {/* DOB */}
                <div>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleFormChange}
                    placeholder="Date of Birth (dd/mm/yyyy)"
                    maxLength={10}
                    className={inputBase}
                    required
                  />
                  {formErrors.dob && (
                    <p className={errorText}>{formErrors.dob}</p>
                  )}
                  {ageError && (
                    <p className="text-red-400 font-semibold text-xs mt-1">
                      {ageError}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    placeholder="Address"
                    className={inputBase}
                    required
                  />
                  {formErrors.address && (
                    <p className={errorText}>{formErrors.address}</p>
                  )}
                </div>

                {/* Suburb */}
                <div>
                  <input
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleFormChange}
                    placeholder="Suburb"
                    className={inputBase}
                    required
                  />
                  {formErrors.suburb && (
                    <p className={errorText}>{formErrors.suburb}</p>
                  )}
                </div>

                {/* State */}
                <div>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }));
                      setFormErrors((prev: any) => ({ ...prev, state: "" }));
                    }}
                    className={`${inputBase} appearance-none`}
                    required
                  >
                    <option value="" className="text-black">
                      Select State
                    </option>
                    {states.map((state: any, index) => (
                      <option
                        key={index}
                        value={state.code}
                        className="text-black"
                      >
                        {state.name ?? state.code}
                      </option>
                    ))}
                  </select>
                  {formErrors.state && (
                    <p className={errorText}>{formErrors.state}</p>
                  )}
                </div>

                {/* Postcode */}
                <div>
                  <input
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleFormChange}
                    placeholder="Postcode (4 digits)"
                    className={inputBase}
                    required
                  />
                  {formErrors.postcode && (
                    <p className={errorText}>{formErrors.postcode}</p>
                  )}
                </div>

                {/* PIN */}
                <div>
                  <input
                    name="pin"
                    value={formData.pin}
                    onChange={handleFormChange}
                    placeholder="Create a 4-digit PIN"
                    maxLength={4}
                    className={inputBase}
                    required
                  />
                  {formErrors.pin && (
                    <p className={errorText}>{formErrors.pin}</p>
                  )}
                </div>

                {/* ID Type */}
                <div>
                  <select
                    name="custAuthorityType"
                    value={formData.custAuthorityType}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        custAuthorityType: e.target.value,
                      }));
                      setFormErrors((prev: any) => ({
                        ...prev,
                        custAuthorityType: "",
                      }));
                    }}
                    className={`${inputBase} appearance-none`}
                    required
                  >
                    <option value="" disabled hidden className="text-gray-400">
                      ID Type
                    </option>
                    <option value="DL" className="text-black">
                      Driver Licence
                    </option>
                    <option value="PA" className="text-black">
                      Passport
                    </option>
                    <option value="PI" className="text-black">
                      Proof of Age Card
                    </option>
                  </select>
                  {formErrors.custAuthorityType && (
                    <p className={errorText}>{formErrors.custAuthorityType}</p>
                  )}
                </div>

                {/* Authority Number */}
                <div>
                  <input
                    name="custAuthorityNo"
                    value={formData.custAuthorityNo}
                    onChange={(e) => {
                      const value = e.target.value.substring(0, 20);
                      setFormData((prev) => ({
                        ...prev,
                        custAuthorityNo: value,
                      }));
                      setFormErrors((prev: any) => ({
                        ...prev,
                        custAuthorityNo: "",
                      }));
                    }}
                    placeholder="Customer Authority Number"
                    maxLength={20}
                    className={inputBase}
                    required
                  />
                  {formErrors.custAuthorityNo && (
                    <p className={errorText}>{formErrors.custAuthorityNo}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || ageError !== ""}
                className={`mt-4 w-full py-3 text-sm sm:text-base ${ageError
                  ? "bg-gray-500 cursor-not-allowed text-white rounded-xl"
                  : `${gradientBtn}`
                  } transition-all`}
              >
                {loading ? "Submitting…" : "Submit Details"}
              </button>
            </form>
          )}

          {/* ── Number type selection ─────────────────────────────────────── */}
          {showNumberTypeSelection && !isTransferMode && !pendingNumberChoice && (
            <div className={`${panelBase} p-4 text-center`}>
              <p className="text-white text-sm sm:text-base mb-3 font-medium">
                Do you want a new number or keep your existing one?
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={handleNewNumber}
                  className={`${blueBtn} px-5 py-2.5 text-sm`}
                >
                  New Number
                </button>
                <button
                  onClick={handleExistingNumber}
                  className={`${blueBtn} px-5 py-2.5 text-sm`}
                >
                  Existing Number
                </button>
              </div>
            </div>
          )}

          {/* ── Confirm new number ────────────────────────────────────────── */}
          {showConfirmNewNumber && (
            <div className={`${panelBase} p-4 text-center`}>
              <p className="text-white text-sm sm:text-base mb-3 font-medium">
                Are you sure you want a new number?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => confirmNewNumber(true)}
                  className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  Yes
                </button>
                <button
                  onClick={() => confirmNewNumber(false)}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* ── Existing number options ───────────────────────────────────── */}
          {showExistingNumberOptions && (
            <div className={`${panelBase} p-4`}>
              <p className="text-white text-center text-sm sm:text-base mb-3 font-medium">
                Is your existing number Prepaid or Postpaid?
              </p>

              <div className="flex gap-3 justify-center mb-4 flex-wrap">
                {(["prepaid", "postpaid"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleExistingTypeSelect(type)}
                    className={`px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-95 ${existingNumberType === type
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 ring-2 ring-white/50"
                      : "bg-white/20 hover:bg-white/30"
                      }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <input
                    type="tel"
                    value={existingPhone}
                    onChange={(e) =>
                      setExistingPhone(
                        e.target.value.replace(/\D/g, "").substring(0, 10),
                      )
                    }
                    placeholder="Enter your number (04xxxxxxxx)"
                    className={`${inputBase} text-center`}
                  />
                  {existingPhone && !existingPhone.match(/^04\d{8}$/) && (
                    <p className="text-red-400 text-xs mt-1 text-center">
                      Please enter a valid 10-digit AU mobile number starting
                      with 04
                    </p>
                  )}
                </div>

                {showArnInput && (
                  <input
                    type="text"
                    value={arn}
                    onChange={(e) => {
                      setArn(e.target.value);
                      localStorage.setItem("arn", e.target.value);
                    }}
                    placeholder="Enter ARN (Account Reference Number)"
                    className={`${inputBase} text-center`}
                  />
                )}

                <button
                  onClick={handleExistingNumberSubmit}
                  disabled={
                    loading ||
                    !existingPhone.match(/^04\d{8}$/) ||
                    (existingNumberType === "postpaid" && !arn.trim())
                  }
                  className={`w-full py-3 text-sm ${blueBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? "Processing…" : "Continue"}
                </button>
              </div>
            </div>
          )}

          {/* ── Confirm existing / port number ───────────────────────────── */}
          {showConfirmExistingNumber && (
            <div className={`${panelBase} p-4 text-center`}>
              <p className="text-white text-sm sm:text-base mb-3 font-medium">
                Are you sure you want to port{" "}
                <span className="font-bold">{existingPhone}</span>?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => confirmExistingNumber(true)}
                  className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  Yes
                </button>
                <button
                  onClick={() => confirmExistingNumber(false)}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* ── Number / ID / Plan selection panels ───────────────────────────── */}
          {showNumberButtons && numberOptions.length > 0 && (
            <div
              className={`${panelBase} p-3 sm:p-4 flex flex-wrap gap-2 justify-center`}
            >
              {numberOptions.map((num, index) => (
                <button
                  key={index}
                  onClick={() => handleNumberSelect(num)}
                  disabled={loading}
                  className={`${blueBtn} px-3 py-2 text-xs sm:text-sm tracking-wide disabled:opacity-50`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}

          {showIdSelection && (
            <div className="flex flex-wrap gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 justify-center">
              <button
                onClick={() => handleIdSelection("DL")}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 text-sm font-medium"
              >
                Driver License
              </button>
              <button
                onClick={() => handleIdSelection("PA")}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 text-sm font-medium"
              >
                Passport
              </button>
              <button
                onClick={() => handleIdSelection("PI")}
                className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded hover:opacity-90 text-sm font-medium"
              >
                Proof of Age Card
              </button>
            </div>
          )}

          {showPlans && !selectedPlan && plans.length > 0 && (
            <div
              className={`${panelBase} p-3 sm:p-4 flex flex-wrap gap-2 justify-center`}
            >
              {plans.map((plan, index) => (
                <button
                  key={index}
                  onClick={() => handlePlanSelect(plan)}
                  className={`${blueBtn} px-4 py-2.5 text-xs sm:text-sm`}
                >
                  {plan.planName} — ${plan.price}
                </button>
              ))}
            </div>
          )}

          {/* ── OTP input ─────────────────────────────────────────────────── */}
          {showOtpInput && (
            <div
              className={`${panelBase} p-4 flex flex-col items-center gap-3`}
            >
              <p className="text-white text-sm sm:text-base text-center font-medium">
                Enter the OTP sent to your existing number:
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                className={`${inputBase} text-center text-lg tracking-[0.4em] max-w-xs font-mono`}
                placeholder="● ● ● ● ● ●"
                autoFocus
              />
              <button
                onClick={handleOtpVerify}
                disabled={otpCode.length !== 6}
                className={`w-full max-w-xs py-2.5 text-sm ${blueBtn} bg-gradient-to-r from-green-600 to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Verifying…" : "Verify OTP"}
              </button>
              <button
                onClick={handleResendOtp}
                disabled={loading}
                className="text-white/70 hover:text-white underline text-xs sm:text-sm transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          )}

          {/* ── Payment card ──────────────────────────────────────────────── */}
          {showPayment &&
            selectedPlan &&
            (existingNumberType ? otpVerified : true) && (
              <PaymentCard
                custNo={custNo || ""}
                planName={selectedPlan.planName}
                planPrice={selectedPlan.price}
                onPaymentComplete={(success, msg) => {
                  setShowPayment(false);

                  if (msg) {
                    setChat((prev) => [
                      ...prev,
                      {
                        id: prev.length + 1,
                        type: "bot",
                        text: msg,
                        time: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                      },
                    ]);
                  }

                  if (success) handleActivateOrder();
                }}
              />
            )}

          {/* ── Message Input (only when typing is enabled) ─────────────────── */}
          {isTypingEnabled && !showPayment && (
            <div className="shrink-0 w-full px-3 sm:px-5 pb-3 sm:pb-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 sm:py-2.5 bg-white/15 backdrop-blur-md shadow-2xl">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && sendMessage()
                  }
                  placeholder="Message…"
                  disabled={loading}
                  className="flex-1 min-w-0 bg-transparent text-white placeholder-white/60 text-sm sm:text-base focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !message.trim()}
                  aria-label="Send message"
                  className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00A3FF] hover:bg-[#008EDB] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center active:scale-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Delete confirmation modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to permanently delete your account? This
                action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setPendingDeleteIntent(false);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm transition-all active:scale-95"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWindow;
