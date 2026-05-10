// "use client";
// import React, { useState, useEffect } from "react";
// import { PaymentCard } from "./PaymentCard";
// import { useRouter, useSearchParams } from "next/navigation";
// import { formatDob, formatDobToISO, isDeleteIntent } from "@/src/lib/utils";
// import sessionStorage from "redux-persist/es/storage/session";
// import { motion, AnimatePresence } from "framer-motion";
// // import DatePicker from "react-datepicker";

// interface Plan {
//   _id: string;
//   planNo: number;
//   planName: string;
//   price: number;
//   network: string;
//   isActive: boolean;
// }
// const ChatWindow = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [chat, setChat] = useState<
//     { id: number; type: "user" | "bot"; text: string; time: string }[]
//   >([]);

//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [showPlans, setShowPlans] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
//   const [selectedSim, setSelectedSim] = useState<string | null>(null);
//   const [showDetailsForm, setShowDetailsForm] = useState(false);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [sessionId, setSessionId] = useState<string | null>(null);
//   const [custNo, setCustNo] = useState<string | null>(null);

//   const [showNumberButtons, setShowNumberButtons] = useState(false);
//   const [numberOptions, setNumberOptions] = useState<string[]>([]);

//   const [userEmail, setUserEmail] = useState("");

//   const [showExistingNumberOptions, setShowExistingNumberOptions] =
//     useState(false);
//   const [showNumberTypeSelection, setShowNumberTypeSelection] = useState(false);
//   const [showConfirmNewNumber, setShowConfirmNewNumber] = useState(false);
//   const [existingNumberType, setExistingNumberType] = useState<
//     "prepaid" | "postpaid" | null
//   >(null);
//   const [showArnInput, setShowArnInput] = useState(false);
//   const [arn, setArn] = useState("");
//   const [existingPhone, setExistingPhone] = useState("");
//   const [showConfirmExistingNumber, setShowConfirmExistingNumber] =
//     useState(false);
//   const [isPorting, setIsPorting] = useState(false);
//   const [hasSelectedNumber, setHasSelectedNumber] = useState(false);

//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [otpCode, setOtpCode] = useState("");
//   const [otpTransactionId, setOtpTransactionId] = useState(""); // to track OTP
//   const [otpVerified, setOtpVerified] = useState(false);

//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [pendingDeleteIntent, setPendingDeleteIntent] = useState(false);

//   const [states, setStates] = useState([]);
//   const [loadingStates, setLoadingStates] = useState(false);

//   const [showInitialOptions, setShowInitialOptions] = useState(true);
//   const [selectedOption, setSelectedOption] = useState<string | null>(null);
//   const [isTypingEnabled, setIsTypingEnabled] = useState(false);
//   const [isTransferMode, setIsTransferMode] = useState(false);

//   const [numberDecisionMade, setNumberDecisionMade] = useState(false);
//   const [ageError, setAgeError] = useState("");
//   const [flowCompleted, setFlowCompleted] = useState(false);
//   const [typingDots, setTypingDots] = useState("");
//   const [showTip, setShowTip] = useState(true);

//   useEffect(() => {
//     if (!loading) {
//       setTypingDots("");
//       return;
//     }

//     const interval = setInterval(() => {
//       setTypingDots((prev) => (prev.length < 3 ? prev + "." : ""));
//     }, 500);

//     return () => clearInterval(interval);
//   }, [loading]);

//   useEffect(() => {
//     const fromBanner = searchParams.get("fromBanner");
//     const support = searchParams.get("support");
//     const planParam = searchParams.get("plan");

//     setShowDetailsForm(false);
//     setShowPlans(false);
//     setShowPayment(false);
//     setShowNumberButtons(false);
//     setShowNumberTypeSelection(false);
//     setShowConfirmNewNumber(false);
//     setShowExistingNumberOptions(false);
//     setShowArnInput(false);
//     setShowOtpInput(false);
//     setShowConfirmExistingNumber(false);
//     setSelectedPlan(null);
//     setSelectedSim(null);
//     setIsPorting(false);
//     setHasSelectedNumber(false);
//     setNumberDecisionMade(false);
//     setOtpVerified(false);
//     setFlowCompleted(false);

//     if (fromBanner) {
//       setShowInitialOptions(false);
//       setIsTypingEnabled(false);
//       setChat([
//         {
//           id: 1,
//           type: "bot",
//           text: "Let me help you switch to an E-sim. Please fill the form below.",
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setShowDetailsForm(true);
//     } else if (support) {
//       setShowInitialOptions(false);
//       setIsTypingEnabled(true);
//       setChat([
//         {
//           id: 1,
//           type: "bot",
//           text: "Please describe your account, billing, or technical issue and I'll help you resolve it.",
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setShowDetailsForm(false);
//     } else {
//       setShowInitialOptions(true);
//       setIsTypingEnabled(false);
//       setChat([]);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     const loadPlans = async () => {
//       try {
//         const res = await fetch(
//           "https://backend-bele.omnisuiteai.com/api/v1/plans",
//         );
//         const data = await res.json();
//         const list: Plan[] = data.data || [];
//         setPlans(list);

//         // Preselect plan from URL
//         const planParam = searchParams.get("plan");
//         if (planParam) {
//           const match = list.find((p) => p.planName === planParam);
//           if (match) {
//             setSelectedPlan(match);
//             setShowInitialOptions(false);
//             setIsTypingEnabled(false);
//             setShowDetailsForm(true);
//             setChat((prev) => {
//               if (prev.length === 0) {
//                 return [
//                   {
//                     id: 1,
//                     type: "bot" as const,
//                     text: `Great choice! You selected ${match.planName} — $${match.price}. Please fill in your details below to continue.`,
//                     time: new Date().toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     }),
//                   },
//                 ];
//               }
//               return prev;
//             });
//           }
//         }
//       } catch (e) {
//         console.error("Failed loading plans:", e);
//       }
//     };

//     loadPlans();
//   }, [searchParams]);

//   useEffect(() => {
//     if (showDetailsForm && states.length === 0) {
//       setLoadingStates(true);
//       fetch("https://backend-bele.omnisuiteai.com/states")
//         .then((res) => res.json())
//         .then((data) => setStates(data))
//         .catch((err) => console.error("Failed to fetch states:", err))
//         .finally(() => setLoadingStates(false));
//     }
//   }, [showDetailsForm]);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     surname: "",
//     email: "",
//     phone: "",
//     dob: "",
//     address: "",
//     suburb: "",
//     state: "",
//     postcode: "",
//     pin: "",
//     custAuthorityNo: "",
//     custAuthorityType: "",
//   });
//   const [formErrors, setFormErrors] = useState<any>({});

//   const validateForm = () => {
//     const errors: any = {};
//     let ok = true;

//     const requiredFields: (keyof typeof formData)[] = [
//       "firstName",
//       "surname",
//       "email",
//       "phone",
//       "dob",
//       "address",
//       "suburb",
//       "state",
//       "postcode",
//       "pin",
//       "custAuthorityNo",
//       "custAuthorityType",
//     ];

//     for (let field of requiredFields) {
//       if (!formData[field].trim()) {
//         errors[field] = "Required";
//         ok = false;
//       }
//     }
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
//       errors.email = "Invalid email";
//       ok = false;
//     }
//     if (formData.phone && !/^04\d{8}$/.test(formData.phone)) {
//       errors.phone = "Invalid AU mobile";
//       ok = false;
//     }
//     if (formData.postcode && !/^\d{4}$/.test(formData.postcode)) {
//       errors.postcode = "Postcode must be 4 digits";
//       ok = false;
//     }

//     if (formData.pin && !/^\d{4}$/.test(formData.pin)) {
//       errors.pin = "PIN must be 4 digits";
//       ok = false;
//     }

//     if (!formData.custAuthorityNo.trim()) {
//       errors.custAuthorityNo = "Customer Authority Number is required";
//     }

//     if (!formData.custAuthorityType) {
//       errors.custAuthorityType = "Please select a Customer Authority Type";
//     }

//     // if (formData.dob) {
//     //   const [day, month, year] = formData.dob.split("/").map(Number);
//     //   const birthDate = new Date(year, month - 1, day);
//     //   const today = new Date();
//     //   let age = today.getFullYear() - birthDate.getFullYear();
//     //   const m = today.getMonth() - birthDate.getMonth();
//     //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     //     age--;
//     //   }

//     //   if (age < 18) {
//     //     setAgeError("You must be at least 18 years old to sign up.");
//     //     ok = false;
//     //   } else {
//     //     setAgeError("");
//     //   }
//     // }
//     if (formData.dob) {
//       const match = formData.dob.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
//       if (!match) {
//         errors.dob = "Please enter date in dd/mm/yyyy format";
//         ok = false;
//       } else {
//         const [, day, month, year] = match;
//         const birthDate = new Date(
//           Number(year),
//           Number(month) - 1,
//           Number(day),
//         );

//         // Invalid date check (e.g. 31/02/2000, 00/01/2000 etc.)
//         if (
//           isNaN(birthDate.getTime()) ||
//           Number(day) < 1 ||
//           Number(day) > 31 ||
//           Number(month) < 1 ||
//           Number(month) > 12 ||
//           Number(year) < 1900 ||
//           Number(year) > new Date().getFullYear()
//         ) {
//           errors.dob = "Invalid date";
//           ok = false;
//         } else {
//           // Age calculation only when date is valid
//           const today = new Date();
//           let age = today.getFullYear() - birthDate.getFullYear();
//           const m = today.getMonth() - birthDate.getMonth();
//           if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//             age--;
//           }

//           if (age < 18) {
//             setAgeError("You must be at least 18 years old to sign up.");
//             ok = false;
//           } else {
//             setAgeError("");
//           }
//         }
//       }
//     } else {
//       errors.dob = "Date of birth is required";
//       ok = false;
//     }

//     setFormErrors(errors);
//     return ok;
//   };

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const name = e.target.name as keyof typeof formData;
//     const { value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setFormErrors((prev: any) => ({ ...prev, [name]: "" }));
//     // if (name === "dob" && value.trim()) {
//     //   const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
//     //   if (match) {
//     //     const [_, day, month, year] = match.map(Number);
//     //     const birthDate = new Date(year, month - 1, day);
//     //     const today = new Date();
//     //     let age = today.getFullYear() - birthDate.getFullYear();
//     //     const m = today.getMonth() - birthDate.getMonth();
//     //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//     //       age--;
//     //     }

//     //     if (age < 18) {
//     //       setAgeError("You must be at least 18 years old to sign up.");
//     //     } else {
//     //       setAgeError("");
//     //     }
//     //   }
//     // }
//     if (name === "dob") {
//       const value = e.target.value;
//       // Allow only digits and one '/'
//       if (
//         value.length <= 10 &&
//         (/\d/.test(value.slice(-1)) || value.endsWith("/"))
//       ) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         setFormErrors((prev: any) => ({ ...prev, [name]: "" }));
//       }

//       // Real-time age check only when format is complete
//       if (value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
//         const [, day, month, year] = value.split("/").map(Number);
//         const birthDate = new Date(year, month - 1, day);
//         const today = new Date();
//         let age = today.getFullYear() - birthDate.getFullYear();
//         const m = today.getMonth() - birthDate.getMonth();
//         if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//           age--;
//         }
//         if (age < 18) {
//           setAgeError("You must be at least 18 years old to sign up.");
//         } else {
//           setAgeError("");
//         }
//       } else {
//         setAgeError(""); // Clear error if incomplete
//       }
//     }
//   };

//   const handleFormSubmit = async (e: any) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const isoDob = formatDobToISO(formData.dob);

//     sessionStorage.setItem("userDOB", isoDob);
//     setUserEmail(formData.email);
//     sessionStorage.setItem("userEmail", formData.email);

//     const formatted = Object.entries(formData)
//       .map(([k, v]) => `${k}: ${v}`)
//       .join(", ");

//     setShowDetailsForm(false);
//     if (isTransferMode) {
//       setShowExistingNumberOptions(true);
//     } else {
//       setShowNumberTypeSelection(true);
//     }
//     await handleSend(formatted);
//     const numberMessage = isTransferMode
//       ? "Thanks! Now let's proceed with transferring your existing number. Please provide your number details below."
//       : "Thanks!, Now it's time to choose a number -- either a new number or your existing number -- from the options below.";

//     setChat((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot",
//         text: numberMessage,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//   };

//   useEffect(() => {
//     sessionStorage.removeItem("custNo");
//     sessionStorage.removeItem("userEmail");
//     sessionStorage.removeItem("userDOB");
//   }, []);

//   const callAPI = async (text: string) => {
//     const payload = sessionId
//       ? { query: text, session_id: sessionId, brand: "Just mobile" }
//       : { query: text, brand: "Just mobile" };

//     try {
//       const res = await fetch("/api", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) return null;
//       const data = await res.json();

//       if (!sessionId && data.session_id) setSessionId(data.session_id);
//       if (data.custNo) setCustNo(data.custNo);
//       if (data.custNo) sessionStorage.setItem("custNo", data.custNo);
//       return data;
//     } catch (e) {
//       console.error("API error:", e);
//       return null;
//     }
//   };

//   const handleSend = async (text: string) => {
//     if (!text.trim() || loading) return;

//     const userMsg = {
//       id: chat.length + 1,
//       type: "user" as const,
//       text,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setChat((prev) => [...prev, userMsg]);
//     setMessage("");
//     setLoading(true);

//     if (text.toLowerCase().trim() === "signup") {
//       setIsTypingEnabled(false);
//     }
//     if (isDeleteIntent(text)) {
//       try {
//         const data = await callDeleteIntentAPI(text);

//         setLoading(false);

//         // show bot message from /chat/query
//         if (data?.message) {
//           addBotMessage(normalizeBrandName(data.message));
//         }

//         // open modal AFTER success
//         setPendingDeleteIntent(true);
//         setShowDeleteModal(true);
//         return;
//       } catch (err) {
//         setLoading(false);
//         addBotMessage("Something went wrong. Please try again.");
//         return;
//       }
//     }
//     await new Promise((res) => setTimeout(res, 50));

//     // Skip API call if it's a new number confirmation
//     if (text.toLowerCase().includes("new number") && showConfirmNewNumber) {
//       const botText = "Please choose a number from the selection below.";
//       setChat((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: "bot",
//           text: botText,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setLoading(false);
//       return;
//     }

//     const data = await callAPI(text);
//     setLoading(false);

//     if (!data) {
//       return setChat((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: "bot",
//           text: "Oops! Something went wrong.",
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     }

//     const botText = normalizeBrandName(data.message || data.response || "");

//     if (
//       botText.toLowerCase().includes("first name") ||
//       botText.toLowerCase().includes("surname")
//     ) {
//       if (!showNumberTypeSelection && !showConfirmNewNumber) {
//         setShowDetailsForm(true);
//         setIsTypingEnabled(false);
//       }
//       return;
//     }

//     const matches = botText.match(/04\d{8}/g);
//     if (matches?.length === 5 && !isPorting && !hasSelectedNumber) {
//       setNumberOptions(matches);
//       setShowNumberButtons(true);
//       // Override bot message
//       // addBotMessage("Please choose a number from the selection below");
//       return;
//     }
//     // Only add bot message if it's not empty
//     if (botText.trim()) {
//       setChat((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: "bot",
//           text: botText,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     }
//   };

//   const handleNewNumber = () => {
//     setShowNumberTypeSelection(false);
//     setShowConfirmNewNumber(true);
//   };

//   const confirmNewNumber = async (yes: boolean) => {
//     setShowConfirmNewNumber(false);

//     if (!yes) {
//       setShowNumberTypeSelection(true);
//       return;
//     }

//     setSelectedOption("new");
//     setIsPorting(false);
//     setHasSelectedNumber(false);
//     setNumberDecisionMade(false);

//     addBotMessage(
//       "Thanks, now it's time to choose a number from the selection below.",
//     );

//     await handleSend("new number");
//   };

//   const handleExistingNumber = () => {
//     setShowNumberTypeSelection(false);
//     setShowConfirmNewNumber(false);
//     setExistingNumberType(null);
//     setShowArnInput(false);
//     setArn("");
//     setExistingPhone("");
//     setShowConfirmExistingNumber(false);

//     setShowExistingNumberOptions(true);
//   };

//   const handleExistingTypeSelect = (type: "prepaid" | "postpaid") => {
//     setExistingNumberType(type);
//     setShowArnInput(type === "postpaid");
//   };

//   const handleExistingNumberSubmit = async () => {
//     if (!existingPhone.match(/^04\d{8}$/)) {
//       alert(
//         "Please enter a valid 10-digit Australian mobile number starting with 04",
//       );
//       return;
//     }
//     if (existingNumberType === "postpaid" && !arn.trim()) {
//       alert("Please enter your ARN (Account Reference Number)");
//       return;
//     }

//     setLoading(true);

//     try {
//       localStorage.setItem("portingNumber", existingPhone);

//       setIsPorting(true);
//       setHasSelectedNumber(true);
//       setShowNumberButtons(false);
//       setSelectedSim(existingPhone);

//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       if (!custNo) {
//         addBotMessage(
//           "We're having trouble fetching your customer ID. Please try again in a moment.",
//         );
//         return;
//       }
//       const res = await fetch(
//         "https://backend-bele.omnisuiteai.com/api/v1/auth/otp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             custNo,
//             destination: existingPhone,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "OTP request failed");

//       setOtpTransactionId(data.data.getOtp.transactionId);

//       setShowExistingNumberOptions(false);
//       setShowOtpInput(true);
//       addBotMessage("OTP has been sent. Please enter it to proceed.");
//     } catch (err) {
//       console.error(err);
//       addBotMessage("Failed to send OTP. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (!existingPhone || !existingPhone.match(/^04\d{8}$/)) {
//       addBotMessage("Cannot resend OTP: Invalid phone number.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch(
//         "https://backend-bele.omnisuiteai.com/api/v1/auth/otp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             custNo,
//             destination: existingPhone,
//           }),
//         },
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to resend OTP");
//       }
//       setOtpTransactionId(data.data.getOtp.transactionId);

//       setOtpCode("");

//       addBotMessage("A new OTP has been sent to your number.");
//     } catch (err) {
//       console.error(err);
//       addBotMessage("Failed to resend OTP. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmExistingNumber = (yes: boolean) => {
//     setShowConfirmExistingNumber(false);
//     if (yes) {
//       localStorage.setItem("existingPhoneNumber", existingPhone);
//       if (existingNumberType === "postpaid") {
//         localStorage.setItem("arn", arn);
//       }

//       setIsPorting(true);
//       setHasSelectedNumber(true);
//       setSelectedSim(existingPhone);
//       setNumberDecisionMade(true);

//       setShowNumberButtons(false);
//       if (selectedPlan) {
//         setShowPlans(false);
//       } else {
//         setShowPlans(true);
//       }

//       addBotMessage(
//         `Great! We'll port your existing number ${existingPhone}. Now please choose a plan.`,
//       );
//     } else {
//       setShowExistingNumberOptions(true);
//     }
//   };

//   const addBotMessage = (text: string) => {
//     setChat((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot" as const,
//         text,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//   };

//   const normalizeBrandName = (text: string) => {
//     return text.replace(/flying\s*kiwi/gi, "JUSTmobile");
//   };
//   const handleNumberSelect = async (num: string) => {
//     setSelectedSim(num);
//     setHasSelectedNumber(true);
//     setShowNumberButtons(false);
//     setShowInitialOptions(false);
//     setIsTypingEnabled(false);

//     setChat((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "user",
//         text: `You selected this number: ${num}`,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 50));
//     await callAPI(num);
//     setLoading(false);

//     setChat((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "bot",
//         text: selectedPlan
//           ? "Perfect! Let's continue with payment."
//           : "Choose one of the plans below:",
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     if (selectedPlan) setShowPayment(true);
//     else setShowPlans(true);
//   };

//   const handlePlanSelect = (plan: Plan) => {
//     setSelectedPlan(plan);
//     localStorage.setItem("planPrice", String(plan.price));

//     setShowPlans(false);

//     setChat((prev) => [
//       ...prev,
//       {
//         id: prev.length + 1,
//         type: "user",
//         text: `You selected this plan: ${plan.planName}`,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);

//     callAPI(`User selected plan ${plan.planName}`);
//     setShowPayment(true);
//   };

//   const handleOtpVerify = async () => {
//     if (otpCode.length !== 6) {
//       alert("Please enter a 6-digit OTP");
//       return;
//     }
//     try {
//       const res = await fetch(
//         "https://backend-bele.omnisuiteai.com/api/v1/auth/otp/verify",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             code: otpCode,
//             transactionId: otpTransactionId,
//           }),
//         },
//       );

//       const data = await res.json();
//       const verifyOtp = data?.data?.verifyOtp;

//       if (!verifyOtp?.valid) {
//         alert(verifyOtp?.message || "OTP verification failed");
//         return;
//       }

//       setOtpVerified(true);
//       setShowOtpInput(false);
//       addBotMessage(
//         "OTP verified successfully! Please choose a plan to continue.",
//       );
//       if (!selectedPlan) {
//         setShowPlans(true);
//       } else {
//         setShowPayment(true);
//       }
//       return;
//     } catch (err) {
//       console.error(err);
//       alert("OTP verification failed. Please try again.");
//     }
//   };
//   const callDeleteIntentAPI = async (text: string) => {
//     const res = await fetch("https://backend-bele.omnisuiteai.com/chat/query", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ query: text }),
//     });

//     if (!res.ok) throw new Error("Delete intent API failed");

//     return res.json();
//   };

//   const handleConfirmDelete = async () => {
//     setShowDeleteModal(false);
//     setPendingDeleteIntent(false);

//     const storedCustNo = localStorage.getItem("custNo");

//     if (!storedCustNo) {
//       addBotMessage(
//         "You need to sign up or log in first before deleting your account.",
//       );
//       return;
//     }

//     try {
//       await callAPI(`Yes I am sure, my custNo is -- ${storedCustNo}`);
//       addBotMessage("Your account has been deleted successfully.");

//       // optional cleanup
//       localStorage.clear();
//     } catch (err) {
//       addBotMessage("Failed to delete your account. Please try again.");
//     }
//   };

//   const handleActivateOrder = async () => {
//     try {
//       const isPorting =
//         existingNumberType === "prepaid" || existingNumberType === "postpaid";
//       const existingType = existingNumberType;
//       const arn = localStorage.getItem("arn") || "";
//       const dob = formData.dob || "";
//       const portingNo = localStorage.getItem("portingNumber") || "";
//       const activationNumber = isPorting ? portingNo : selectedSim || "";

//       let body: any = {
//         number: activationNumber,
//         cust: {
//           custNo,
//           suburb: formData.suburb,
//           postcode: formData.postcode,
//           address: formData.address.trim(),
//           email: formData.email,
//         },
//         planNo: String(selectedPlan?.planNo),
//         simNo: "",
//       };

//       if (isPorting) {
//         body.numType = existingType;

//         if (existingType === "prepaid") {
//           body.cust.dob = dob;
//         } else if (existingType === "postpaid") {
//           body.cust.arn = arn;
//         }
//       }

//       console.log("Activation payload:", body);

//       const url = isPorting
//         ? "https://backend-bele.omnisuiteai.com/api/v1/orders/activate/port"
//         : "https://backend-bele.omnisuiteai.com/api/v1/orders/activate";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error("Activation failed");
//       const receiptNumber = data?.data?.orderId || "";

//       const activationMessage = `Great news... your eSIM has been created with Just mobile.

// Here is your receipt number: ${receiptNumber}.
// Take a copy of it now, but you will also be getting an email of it.

// Step 3 is installing the eSIM on your phone.
// You will receive a QR Code in the next 5 to 10 minutes via email from: donotreply@mobileservicesolutions.com.au

// Make sure to check your junk mail if it hasn't arrived in the next 5 to 10 minutes.`;

//       setChat((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: "bot",
//           text: activationMessage,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setFlowCompleted(true);
//       setShowInitialOptions(false);
//       setIsTypingEnabled(false);
//     } catch (err) {
//       console.error("Activation error:", err);

//       const failureMessage = `Unfortunately, we couldn't complete your SIM activation.

// This can sometimes happen if:
// • Some of the details provided were incorrect
// • There was a temporary system issue
// • The selected number or SIM could not be validated

// No worries — you can try again or choose one of the options below, and I’ll help you from there.`;

//       setChat((prev) => [
//         ...prev,
//         {
//           id: prev.length + 1,
//           type: "bot",
//           text: failureMessage,
//           time: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);

//       setFlowCompleted(false);
//       setShowInitialOptions(true);
//       setIsTypingEnabled(false);
//     }
//   };

//   const handleInitialOptionSelect = async (option: string) => {
//     setSelectedOption(option);
//     setShowInitialOptions(false);

//     const userMsg = {
//       id: chat.length + 1,
//       type: "user" as const,
//       text: option,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setChat((prev) => [...prev, userMsg]);

//     if (option === "Buy an eSIM") {
//       await handleSend("signup");
//     } else if (option === "Account, billing or Technical Problem") {
//       setIsTypingEnabled(true);
//       addBotMessage(
//         "Please describe your account, billing, or technical issue and I'll help you resolve it.",
//       );
//     } else if (option === "transfer-number") {
//       setIsTransferMode(true);
//       setShowTip(true);
//       await handleSend("signup");
//     }
//   };

//   const sendMessage = () => {
//     handleSend(message);
//   };

//   useEffect(() => {
//     if (showDetailsForm && isTransferMode) {
//       setShowTip(true);
//     } else {
//       setShowTip(false);
//     }
//   }, [showDetailsForm, isTransferMode]);

//   return (
//     <div className="relative w-full h-[100dvh] bg-[#05263D] overflow-hidden">
//       {/* Background layers */}
//       <div
//         className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
//         style={{ backgroundImage: "url('/images/bgbanner.png')" }}
//       />
//       <div className="absolute inset-0 bg-linear-to-br from-[#919191]/80 via-[#231e20]/90 to-[#000000]/85 backdrop-blur-md" />

//       {/* Chat window container */}
//       <div className="absolute top-28 inset-x-0 bottom-0 z-10 w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
//         {/* Header */}

//         <div className="flex justify-between items-center p-3 sm:p-4 bg-white shadow-md">
//           {/* Left: Main Logo */}
//           <div className="flex items-center gap-2">
//             {/* <img
//               src="/images/logo.png"
//               alt="Logo"
//               className="hidden sm:block h-8 sm:h-16 w-auto drop-shadow-md"
//             /> */}
//           </div>

//           {/* Right: Just Mobile Logo + Close */}
//           <div className="flex items-center gap-3">
//             {/* <img
//               src="/images/just-mobile-logo.png"
//               alt="Just Mobile"
//               className="h-10 sm:h-12 w-auto drop-shadow-md"
//             /> */}

//             <button
//               onClick={() => router.push("/")}
//               className="text-lg sm:text-xl font-bold hover:text-gray-600 transition-colors"
//               aria-label="Close"
//             >
//               ×
//             </button>
//           </div>
//         </div>

//         {/* Chat body */}
//         <div className="flex-1 flex flex-col px-3 sm:px-6 py-4 sm:py-6 overflow-y-auto scroll-smooth relative">
//           <div className="text-center mb-4 sm:mb-6 mt-2 sm:mt-4">
//             <h2 className="text-[#ffffff] font-semibold text-base sm:text-lg mb-1 drop-shadow-sm">
//               How can I help you today?
//             </h2>
//           </div>

//           {selectedPlan && (
//             <div className="mb-4 bg-white/20 border border-white/30 text-white text-center text-sm sm:text-base px-3 py-2 rounded-md shadow-md">
//               You selected <strong>{selectedPlan.planName}</strong> — $
//               {selectedPlan.price}. Let’s continue with your setup.
//             </div>
//           )}

//           {chat.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 ${msg.type === "user" ? "justify-end" : "justify-start"
//                 }`}
//             >
//               {msg.type === "bot" && (
//                 <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
//                   <img
//                     src="/images/bele-logo.png"
//                     alt="Bot Avatar"
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 </div>
//               )}

//               <div
//                 className={`${msg.type === "user"
//                   ? "bg-white text-[#0E3B5C]"
//                   : "bg-white text-[#0E3B5C]"
//                   } rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[70%]`}
//               >
//                 <p className="text-xs sm:text-xs md:text-sm leading-relaxed wrap-break-word">
//                   {msg.text}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 animate-fade-in">
//               <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
//                 <img
//                   src="/images/bele-logo.png"
//                   alt="Loading Avatar"
//                   className="w-full h-full rounded-full object-cover"
//                 />
//               </div>

//               <div className="bg-white rounded-2xl px-4 py-2 shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
//                 <p className="text-[#0E3B5C] text-xs sm:text-sm font-medium">
//                   Just mobiles Assistant
//                 </p>
//                 <p className="text-[#0E3B5C] text-xs sm:text-sm leading-relaxed">
//                   Just a moment{typingDots}
//                 </p>
//               </div>
//             </div>
//           )}

//           {showInitialOptions && (
//             <div className="flex flex-col gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 mb-4">
//               {/* <p className="text-white text-center font-medium mb-2">
//                 How can I help you today?
//               </p> */}
//               <div className="flex flex-col gap-2">
//                 <button
//                   onClick={() => handleInitialOptionSelect("Buy an eSIM")}
//                   className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
//                 >
//                   Buy an eSIM
//                 </button>
//                 <button
//                   onClick={() =>
//                     handleInitialOptionSelect(
//                       "Account, billing or Technical Problem",
//                     )
//                   }
//                   className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
//                 >
//                   Account, billing or Technical Problem
//                 </button>
//                 <button
//                   onClick={() => handleInitialOptionSelect("transfer-number")}
//                   className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
//                 >
//                   Transfer my Number
//                 </button>
//               </div>
//             </div>
//           )}
//           {/* Input Bar */}
//           <div className="mt-auto">
//             {showDetailsForm ? (
//               <>
//                 <form
//                   onSubmit={handleFormSubmit}
//                   className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-black/30 overflow-y-auto max-h-[40vh] sm:max-h-[50vh]"
//                 >
//                   <AnimatePresence>
//                     {
//                       <motion.div
//                         initial={{ opacity: 0, y: -20, scale: 0.98 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.98 }}
//                         transition={{ duration: 0.35, ease: "easeOut" }}
//                         className="relative mb-3 sm:mb-4 px-4 py-3 rounded-xl border border-blue-400/30 bg-gradient-to-r from-white to-teal-500/10 backdrop-blur-md text-black text-xs sm:text-sm shadow-md"
//                       >
//                         {/* Content */}
//                         <p className="leading-relaxed pr-5">
//                           <span className="font-semibold text-blue-700">
//                             Before you start:
//                           </span>{" "}
//                           If you're transferring your number, you'll need your{" "}
//                           <span className="font-semibold underline decoration-blue-500">
//                             existing provider account number
//                           </span>
//                           .
//                         </p>
//                       </motion.div>
//                     }
//                   </AnimatePresence>
//                   <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
//                     <div>
//                       <input
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleFormChange}
//                         placeholder="First Name"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.firstName && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.firstName}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="surname"
//                         value={formData.surname}
//                         onChange={handleFormChange}
//                         placeholder="Surname"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.surname && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.surname}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="email"
//                         value={formData.email}
//                         onChange={handleFormChange}
//                         placeholder="Email"
//                         type="email"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.email && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.email}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleFormChange}
//                         placeholder="Phone (e.g., 0412345678)"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.phone && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.phone}
//                         </p>
//                       )}
//                     </div>
//                     {/* <DatePicker
//                     selected={
//                       formData.dob ? parseDateFromDDMMYYYY(formData.dob) : null
//                     }
//                     onChange={(date: Date | null) => {
//                       if (date) {
//                         const day = String(date.getDate()).padStart(2, "0");
//                         const month = String(date.getMonth() + 1).padStart(
//                           2,
//                           "0"
//                         );
//                         const year = date.getFullYear();
//                         const newDob = `${day}/${month}/${year}`;

//                         // Update form data
//                         setFormData((prev) => ({
//                           ...prev,
//                           dob: newDob,
//                         }));
//                         const birthDate = new Date(
//                           year,
//                           date.getMonth(),
//                           date.getDate()
//                         );
//                         const today = new Date();
//                         let age = today.getFullYear() - birthDate.getFullYear();
//                         const m = today.getMonth() - birthDate.getMonth();
//                         if (
//                           m < 0 ||
//                           (m === 0 && today.getDate() < birthDate.getDate())
//                         ) {
//                           age--;
//                         }

//                         if (age < 18) {
//                           setAgeError(
//                             "You must be at least 18 years old to sign up."
//                           );
//                         } else {
//                           setAgeError(""); // Clear error if now 18+
//                         }
//                         setFormErrors((prev: any) => ({ ...prev, dob: "" }));
//                       } else {
//                         setFormData((prev) => ({ ...prev, dob: "" }));
//                         setAgeError("");
//                       }
//                     }}
//                     placeholderText="dd/mm/yyyy"
//                     dateFormat="dd/MM/yyyy"
//                     className="w-full p-2 rounded bg-transparent text-white border border-white/50 text-xs sm:text-sm focus:outline-none"
//                   />
//                   {formErrors.dob && (
//                     <p className="text-red-300 text-xs mt-1">
//                       {formErrors.dob}
//                     </p>
//                   )} */}
//                     <div>
//                       <input
//                         type="text"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleFormChange}
//                         placeholder="dd/mm/yyyy"
//                         maxLength={10}
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.dob && (
//                         <p className="text-red-300 text-xs mt-0.5">
//                           {formErrors.dob}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="address"
//                         value={formData.address}
//                         onChange={handleFormChange}
//                         placeholder="Address"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.address && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.address}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="suburb"
//                         value={formData.suburb}
//                         onChange={handleFormChange}
//                         placeholder="Suburb"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.suburb && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.suburb}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <div>
//                         <select
//                           name="state"
//                           value={formData.state}
//                           onChange={(e) => {
//                             setFormData((prev) => ({
//                               ...prev,
//                               state: e.target.value,
//                             }));
//                             setFormErrors((prev: any) => ({
//                               ...prev,
//                               state: "",
//                             }));
//                           }}
//                           className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black border border-white/50 text-xs sm:text-sm focus:outline-none"
//                           required
//                         >
//                           <option value="" className="text-black font-medium">
//                             Select State
//                           </option>

//                           {states.map((state: any, index) => (
//                             <option
//                               key={index}
//                               value={state.code}
//                               className="text-black font-medium"
//                             >
//                               {state.name ?? state.code}
//                             </option>
//                           ))}
//                         </select>

//                         {formErrors.state && (
//                           <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                             {formErrors.state}
//                           </p>
//                         )}
//                       </div>
//                       {formErrors.state && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.state}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="postcode"
//                         value={formData.postcode}
//                         onChange={handleFormChange}
//                         placeholder="Postcode (4 digits)"
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.postcode && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.postcode}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="pin"
//                         value={formData.pin}
//                         onChange={handleFormChange}
//                         placeholder="Create a 4-digit PIN"
//                         maxLength={4}
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.pin && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.pin}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <select
//                         name="custAuthorityType"
//                         value={formData.custAuthorityType}
//                         onChange={(e) => {
//                           setFormData((prev) => ({
//                             ...prev,
//                             custAuthorityType: e.target.value,
//                           }));
//                           setFormErrors((prev: any) => ({
//                             ...prev,
//                             custAuthorityType: "",
//                           }));
//                         }}
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black border border-white/50 text-xs sm:text-sm focus:outline-none"
//                         required
//                       >
//                         <option
//                           value=""
//                           disabled
//                           hidden
//                           className="text-gray-400"
//                         >
//                           ID Type
//                         </option>
//                         <option value="DL" className="text-black ">
//                           Driver License
//                         </option>
//                         <option value="PA" className="text-black ">
//                           Passport
//                         </option>
//                         <option value="PI" className="text-black ">
//                           Proof of age Card
//                         </option>
//                       </select>

//                       {formErrors.custAuthorityType && (
//                         <p className=" text-xs mt-0.5 sm:mt-1">
//                           {formErrors.custAuthorityType}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <input
//                         name="custAuthorityNo"
//                         value={formData.custAuthorityNo}
//                         onChange={(e) => {
//                           const value = e.target.value.substring(0, 20);
//                           setFormData((prev) => ({
//                             ...prev,
//                             custAuthorityNo: String(value),
//                           }));
//                           setFormErrors((prev: any) => ({
//                             ...prev,
//                             custAuthorityNo: "",
//                           }));
//                         }}
//                         placeholder="Customer Authority Number"
//                         maxLength={20}
//                         className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
//                         required
//                       />
//                       {formErrors.custAuthorityNo && (
//                         <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
//                           {formErrors.custAuthorityNo}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   {ageError && (
//                     <p className="text-red-400 font-semibold text-sm mt-2 col-span-2 text-center">
//                       {ageError}
//                     </p>
//                   )}
//                   <button
//                     type="submit"
//                     disabled={loading || ageError !== ""}
//                     className={`mt-3 sm:mt-4 w-full py-3 rounded text-white font-semibold transition-opacity ${ageError
//                       ? "bg-gray-500 cursor-not-allowed"
//                       : "bg-linear-to-r from-[#919191] to-[#231e20] hover:opacity-70"
//                       } border-none`}
//                   >
//                     {loading ? "Submitting..." : "Submit Details"}
//                   </button>
//                 </form>
//               </>
//             ) : showNumberTypeSelection && !isTransferMode ? (
//               <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
//                 <p className="text-white mb-3">
//                   Do you want a new number or keep your existing one?
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={handleNewNumber}
//                     className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded"
//                   >
//                     New Number
//                   </button>
//                   <button
//                     onClick={handleExistingNumber}
//                     className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded"
//                   >
//                     Existing Number
//                   </button>
//                 </div>
//               </div>
//             ) : showConfirmNewNumber ? (
//               <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
//                 <p className="text-white mb-3">
//                   Are you sure you want a new number?
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={() => confirmNewNumber(true)}
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => confirmNewNumber(false)}
//                     className="bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             ) : showExistingNumberOptions ? (
//               <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30">
//                 <p className="text-white mb-3 text-center">
//                   Is your existing number Prepaid or Postpaid?
//                 </p>
//                 <div className="flex gap-3 justify-center mb-4">
//                   <button
//                     onClick={() => handleExistingTypeSelect("prepaid")}
//                     className={`px-4 py-2 rounded ${existingNumberType === "prepaid"
//                       ? "bg-linear-to-r from-blue-600 to-teal-500"
//                       : "bg-gray-400"
//                       } text-white`}
//                   >
//                     Prepaid
//                   </button>
//                   <button
//                     onClick={() => handleExistingTypeSelect("postpaid")}
//                     className={`px-4 py-2 rounded ${existingNumberType === "postpaid"
//                       ? "bg-linear-to-r from-blue-600 to-teal-500"
//                       : "bg-gray-400"
//                       } text-white`}
//                   >
//                     Postpaid
//                   </button>
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="tel"
//                     value={existingPhone}
//                     onChange={(e) =>
//                       setExistingPhone(
//                         e.target.value.replace(/\D/g, "").substring(0, 10),
//                       )
//                     }
//                     placeholder="Enter your 10-digit mobile number (04xxxxxxxx)"
//                     className="w-full p-2 rounded bg-transparent border border-white/50 text-white text-center"
//                   />
//                   {existingPhone && !existingPhone.match(/^04\d{8}$/) && (
//                     <p className="text-red-600 text-md mt-1">
//                       Please enter a valid 10-digit Australian mobile number
//                       starting with 04
//                     </p>
//                   )}
//                 </div>

//                 {showArnInput && (
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       value={arn}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         setArn(value);
//                         localStorage.setItem("arn", value);
//                       }}
//                       placeholder="Enter ARN (Account Reference Number)"
//                       className="w-full p-2 rounded bg-transparent border border-white/50 text-white text-center"
//                     />
//                   </div>
//                 )}

//                 <button
//                   onClick={handleExistingNumberSubmit}
//                   disabled={
//                     loading ||
//                     !existingPhone.match(/^04\d{8}$/) ||
//                     (existingNumberType === "postpaid" && !arn.trim())
//                   }
//                   className="w-full bg-linear-to-r from-blue-600 to-teal-500 text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
//                 >
//                   {loading ? "Processing..." : "Continue"}
//                 </button>
//               </div>
//             ) : showConfirmExistingNumber ? (
//               <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
//                 <p className="text-white mb-3">
//                   Are you sure you want to port {existingPhone}?
//                 </p>
//                 <div className="flex gap-3 justify-center">
//                   <button
//                     onClick={() => confirmExistingNumber(true)}
//                     className="bg-green-600 text-white px-4 py-2 rounded"
//                   >
//                     Yes
//                   </button>
//                   <button
//                     onClick={() => confirmExistingNumber(false)}
//                     className="bg-red-600 text-white px-4 py-2 rounded"
//                   >
//                     No
//                   </button>
//                 </div>
//               </div>
//             ) : showNumberButtons && numberOptions.length > 0 ? (
//               <div className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 justify-center">
//                 {numberOptions.map((num, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleNumberSelect(num)}
//                     disabled={loading}
//                     className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded hover:opacity-90 text-xs sm:text-xs md:text-sm"
//                   >
//                     {num}
//                   </button>
//                 ))}
//               </div>
//             ) : showPlans && !selectedPlan && plans.length > 0 ? (
//               <div className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 justify-center">
//                 {plans.map((plan, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePlanSelect(plan)}
//                     className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded hover:opacity-90 text-xs sm:text-xs md:text-sm"
//                   >
//                     {plan.planName} - ${plan.price}
//                   </button>
//                 ))}
//               </div>
//             ) : showOtpInput ? (
//               <div className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-lg border border-white/30 text-white">
//                 <p className="text-sm sm:text-base">
//                   Enter the OTP sent to your existing number:
//                 </p>
//                 <input
//                   type="text"
//                   maxLength={6}
//                   value={otpCode}
//                   onChange={(e) =>
//                     setOtpCode(e.target.value.replace(/\D/g, ""))
//                   }
//                   className="w-full p-2 rounded bg-transparent border border-white/50 text-center text-white text-sm sm:text-base"
//                   placeholder="Enter 6-digit OTP"
//                   autoFocus
//                 />
//                 <button
//                   onClick={handleOtpVerify}
//                   disabled={otpCode.length !== 6}
//                   className="bg-[#2bb673] text-white px-8 py-2 rounded hover:opacity-90 disabled:opacity-50 text-sm"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>

//                 <button
//                   onClick={handleResendOtp}
//                   disabled={loading}
//                   className="text-white/80 hover:text-white underline text-sm mt-4 transition-colors disabled:opacity-50"
//                 >
//                   Resend OTP
//                 </button>
//               </div>
//             ) : showPayment &&
//               selectedPlan &&
//               (existingNumberType ? otpVerified : true) ? (
//               <PaymentCard
//                 custNo={custNo || ""}
//                 planName={selectedPlan.planName}
//                 planPrice={selectedPlan.price}
//                 onPaymentComplete={(success, msg) => {
//                   setShowPayment(false);

//                   if (msg) {
//                     setChat((prev) => [
//                       ...prev,
//                       {
//                         id: prev.length + 1,
//                         type: "bot",
//                         text: msg,
//                         time: new Date().toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         }),
//                       },
//                     ]);
//                   }

//                   if (success) handleActivateOrder();
//                 }}
//               />
//             ) : null}
//           </div>
//         </div>

//         {isTypingEnabled && !flowCompleted && (
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[98%] z-30">
//             <div className="flex items-center gap-2 sm:gap-3 border border-white/20 rounded-full px-4 py-2 sm:py-3 bg-white/15 backdrop-blur-md shadow-2xl">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Message..."
//                 disabled={loading}
//                 className="flex-1 bg-transparent text-white placeholder-white/60 text-sm sm:text-base focus:outline-none px-2"
//               />

//               <button
//                 onClick={sendMessage}
//                 disabled={loading || !message.trim()}
//                 className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00A3FF] text-white hover:bg-[#008EDB] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2.5"
//                   className="w-4 h-4 sm:w-5 sm:h-5"
//                 >
//                   <path d="M22 2L11 13" />
//                   <path d="M22 2l-7 20-4-9-9-4 20-7z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       {showDeleteModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//           <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-2xl text-center">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">
//               Delete Account
//             </h3>
//             <p className="text-sm text-gray-600 mb-6">
//               Are you sure you want to delete your account?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => {
//                   setShowDeleteModal(false);
//                   setPendingDeleteIntent(false);
//                 }}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//               >
//                 No
//               </button>

//               <button
//                 onClick={handleConfirmDelete}
//                 className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;

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

  useEffect(() => {
    const fromBanner = searchParams.get("fromBanner");
    const support = searchParams.get("support");
    const planParam = searchParams.get("plan");

    setShowDetailsForm(false);
    setShowPlans(false);
    setShowPayment(false);
    setShowNumberButtons(false);
    setShowNumberTypeSelection(false);
    setShowConfirmNewNumber(false);
    setShowExistingNumberOptions(false);
    setShowArnInput(false);
    setShowOtpInput(false);
    setShowConfirmExistingNumber(false);
    setSelectedPlan(null);
    setSelectedSim(null);
    setIsPorting(false);
    setHasSelectedNumber(false);
    setNumberDecisionMade(false);
    setOtpVerified(false);
    setFlowCompleted(false);

    if (fromBanner) {
      setShowInitialOptions(false);
      setIsTypingEnabled(false);
      setChat([
        {
          id: 1,
          type: "bot",
          text: "Let me help you switch to an E-sim. Please fill the form below.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setShowDetailsForm(true);
    } else if (support) {
      setShowInitialOptions(false);
      setIsTypingEnabled(true);
      setChat([
        {
          id: 1,
          type: "bot",
          text: "Please describe your account, billing, or technical issue and I'll help you resolve it.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setShowDetailsForm(false);
    } else {
      setShowInitialOptions(true);
      setIsTypingEnabled(false);
      setChat([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await fetch(
          "https://backend-bele.omnisuiteai.com/api/v1/plans",
        );
        const data = await res.json();
        const list: Plan[] = data.data || [];
        setPlans(list);

        const planParam = searchParams.get("plan");
        if (planParam) {
          const match = list.find((p) => p.planName === planParam);
          if (match) {
            setSelectedPlan(match);
            setShowInitialOptions(false);
            setIsTypingEnabled(false);
            setShowDetailsForm(true);
            setChat((prev) => {
              if (prev.length === 0) {
                return [
                  {
                    id: 1,
                    type: "bot" as const,
                    text: `Great choice! You selected ${match.planName} — $${match.price}. Please fill in your details below to continue.`,
                    time: new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  },
                ];
              }
              return prev;
            });
          }
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev: any) => ({ ...prev, [name]: "" }));

    if (name === "dob") {
      const value = e.target.value;
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
    if (isTransferMode) {
      setShowExistingNumberOptions(true);
    } else {
      setShowNumberTypeSelection(true);
    }
    await handleSend(formatted);
    const numberMessage = isTransferMode
      ? "Thanks! Now let's proceed with transferring your existing number. Please provide your number details below."
      : "Thanks!, Now it's time to choose a number -- either a new number or your existing number -- from the options below.";

    setChat((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "bot",
        text: numberMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
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
    setLoading(true);

    if (text.toLowerCase().trim() === "signup") {
      setIsTypingEnabled(false);
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
    setShowNumberTypeSelection(false);
    setShowConfirmNewNumber(true);
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
    setShowNumberTypeSelection(false);
    setShowConfirmNewNumber(false);
    setExistingNumberType(null);
    setShowArnInput(false);
    setArn("");
    setExistingPhone("");
    setShowConfirmExistingNumber(false);

    setShowExistingNumberOptions(true);
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
          body: JSON.stringify({
            custNo,
            destination: existingPhone,
          }),
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
          body: JSON.stringify({
            custNo,
            destination: existingPhone,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to resend OTP");
      }
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
      return;
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

      const activationMessage = `Great news... your eSIM has been created with Just mobile.

Here is your receipt number: ${receiptNumber}.
Take a copy of it now, but you will also be getting an email of it.

Step 3 is installing the eSIM on your phone.
You will receive a QR Code in the next 5 to 10 minutes via email from: donotreply@mobileservicesolutions.com.au

Make sure to check your junk mail if it hasn't arrived in the next 5 to 10 minutes.`;

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
      setIsTypingEnabled(false);
    } catch (err) {
      console.error("Activation error:", err);

      const failureMessage = `Unfortunately, we couldn't complete your SIM activation.

This can sometimes happen if:
• Some of the details provided were incorrect
• There was a temporary system issue
• The selected number or SIM could not be validated

No worries — you can try again or choose one of the options below, and I'll help you from there.`;

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
      await handleSend("signup");
    } else if (option === "Account, billing or Technical Problem") {
      setIsTypingEnabled(true);
      addBotMessage(
        "Please describe your account, billing, or technical issue and I'll help you resolve it.",
      );
    } else if (option === "transfer-number") {
      setIsTransferMode(true);
      setShowTip(true);
      await handleSend("signup");
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

  return (
    <div className="relative w-full h-[100dvh] bg-[#05263D] overflow-hidden">
      {/* Background layers */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm opacity-60"
        style={{ backgroundImage: "url('/images/bgbanner.png')" }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-[#919191]/80 via-[#231e20]/90 to-[#000000]/85 backdrop-blur-md" />

      {/* Chat window container */}
      <div className="absolute top-28 inset-x-0 bottom-0 z-10 w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 bg-white shadow-md">
          <div className="flex items-center gap-2" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="text-lg sm:text-xl font-bold hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Chat body — scrollable area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto scroll-smooth px-3 sm:px-6 py-4 sm:py-6">
            <div className="text-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <h2 className="text-[#ffffff] font-semibold text-base sm:text-lg mb-1 drop-shadow-sm">
                How can I help you today?
              </h2>
            </div>

            {selectedPlan && (
              <div className="mb-4 bg-white/20 border border-white/30 text-white text-center text-sm sm:text-base px-3 py-2 rounded-md shadow-md">
                You selected <strong>{selectedPlan.planName}</strong> — $
                {selectedPlan.price}. Let's continue with your setup.
              </div>
            )}

            {chat.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/bele-logo.png"
                      alt="Bot Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                )}

                <div
                  className={`${
                    msg.type === "user"
                      ? "bg-white text-[#0E3B5C]"
                      : "bg-white text-[#0E3B5C]"
                  } rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[70%]`}
                >
                  <p className="text-xs sm:text-xs md:text-sm leading-relaxed wrap-break-word">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6 animate-fade-in">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
                  <img
                    src="/images/bele-logo.png"
                    alt="Loading Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div className="bg-white rounded-2xl px-4 py-2 shadow-md max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
                  <p className="text-[#0E3B5C] text-xs sm:text-sm font-medium">
                    Just mobiles Assistant
                  </p>
                  <p className="text-[#0E3B5C] text-xs sm:text-sm leading-relaxed">
                    Just a moment{typingDots}
                  </p>
                </div>
              </div>
            )}

            {showInitialOptions && (
              <div className="flex flex-col gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 mb-4">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleInitialOptionSelect("Buy an eSIM")}
                    className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
                  >
                    Buy an eSIM
                  </button>
                  <button
                    onClick={() =>
                      handleInitialOptionSelect(
                        "Account, billing or Technical Problem",
                      )
                    }
                    className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
                  >
                    Account, billing or Technical Problem
                  </button>
                  <button
                    onClick={() => handleInitialOptionSelect("transfer-number")}
                    className="bg-linear-to-r from-[#919191] to-[#231e20] text-white px-4 py-3 rounded-lg hover:opacity-40 transition-opacity text-sm sm:text-base font-medium"
                  >
                    Transfer my Number
                  </button>
                </div>
              </div>
            )}

            {/* Auto-scroll anchor — always sits at the very bottom of messages */}
            <div ref={chatEndRef} />
          </div>

          {/* ── Bottom action panels (forms, buttons, payment) ── */}
          <div className="flex-shrink-0 px-3 sm:px-6 pb-3">
            {showDetailsForm ? (
              <form
                onSubmit={handleFormSubmit}
                className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-black/30 overflow-y-auto max-h-[40vh] sm:max-h-[50vh]"
              >
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="relative mb-3 sm:mb-4 px-4 py-3 rounded-xl border border-blue-400/30 bg-gradient-to-r from-white to-teal-500/10 backdrop-blur-md text-black text-xs sm:text-sm shadow-md"
                  >
                    <p className="leading-relaxed pr-5">
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
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  <div>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      placeholder="First Name"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="surname"
                      value={formData.surname}
                      onChange={handleFormChange}
                      placeholder="Surname"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.surname && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.surname}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Email"
                      type="email"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="Phone (e.g., 0412345678)"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                      placeholder="dd/mm/yyyy"
                      maxLength={10}
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.dob && (
                      <p className="text-red-300 text-xs mt-0.5">
                        {formErrors.dob}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      placeholder="Address"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.address && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.address}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleFormChange}
                      placeholder="Suburb"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.suburb && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.suburb}
                      </p>
                    )}
                  </div>
                  <div>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }));
                        setFormErrors((prev: any) => ({
                          ...prev,
                          state: "",
                        }));
                      }}
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black border border-white/50 text-xs sm:text-sm focus:outline-none"
                      required
                    >
                      <option value="" className="text-black font-medium">
                        Select State
                      </option>
                      {states.map((state: any, index) => (
                        <option
                          key={index}
                          value={state.code}
                          className="text-black font-medium"
                        >
                          {state.name ?? state.code}
                        </option>
                      ))}
                    </select>
                    {formErrors.state && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.state}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleFormChange}
                      placeholder="Postcode (4 digits)"
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.postcode && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.postcode}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="pin"
                      value={formData.pin}
                      onChange={handleFormChange}
                      placeholder="Create a 4-digit PIN"
                      maxLength={4}
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.pin && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.pin}
                      </p>
                    )}
                  </div>
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
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black border border-white/50 text-xs sm:text-sm focus:outline-none"
                      required
                    >
                      <option value="" disabled hidden className="text-gray-400">
                        ID Type
                      </option>
                      <option value="DL" className="text-black">
                        Driver License
                      </option>
                      <option value="PA" className="text-black">
                        Passport
                      </option>
                      <option value="PI" className="text-black">
                        Proof of age Card
                      </option>
                    </select>
                    {formErrors.custAuthorityType && (
                      <p className="text-xs mt-0.5 sm:mt-1">
                        {formErrors.custAuthorityType}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="custAuthorityNo"
                      value={formData.custAuthorityNo}
                      onChange={(e) => {
                        const value = e.target.value.substring(0, 20);
                        setFormData((prev) => ({
                          ...prev,
                          custAuthorityNo: String(value),
                        }));
                        setFormErrors((prev: any) => ({
                          ...prev,
                          custAuthorityNo: "",
                        }));
                      }}
                      placeholder="Customer Authority Number"
                      maxLength={20}
                      className="w-full p-1.5 sm:p-2 rounded bg-transparent text-black font-medium border border-white/50 text-xs sm:text-sm"
                      required
                    />
                    {formErrors.custAuthorityNo && (
                      <p className="text-red-300 text-xs mt-0.5 sm:mt-1">
                        {formErrors.custAuthorityNo}
                      </p>
                    )}
                  </div>
                </div>
                {ageError && (
                  <p className="text-red-400 font-semibold text-sm mt-2 col-span-2 text-center">
                    {ageError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading || ageError !== ""}
                  className={`mt-3 sm:mt-4 w-full py-3 rounded text-white font-semibold transition-opacity ${
                    ageError
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-linear-to-r from-[#919191] to-[#231e20] hover:opacity-70"
                  } border-none`}
                >
                  {loading ? "Submitting..." : "Submit Details"}
                </button>
              </form>
            ) : showNumberTypeSelection && !isTransferMode ? (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
                <p className="text-white mb-3">
                  Do you want a new number or keep your existing one?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleNewNumber}
                    className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded"
                  >
                    New Number
                  </button>
                  <button
                    onClick={handleExistingNumber}
                    className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded"
                  >
                    Existing Number
                  </button>
                </div>
              </div>
            ) : showConfirmNewNumber ? (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
                <p className="text-white mb-3">
                  Are you sure you want a new number?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => confirmNewNumber(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => confirmNewNumber(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : showExistingNumberOptions ? (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30">
                <p className="text-white mb-3 text-center">
                  Is your existing number Prepaid or Postpaid?
                </p>
                <div className="flex gap-3 justify-center mb-4">
                  <button
                    onClick={() => handleExistingTypeSelect("prepaid")}
                    className={`px-4 py-2 rounded ${
                      existingNumberType === "prepaid"
                        ? "bg-linear-to-r from-blue-600 to-teal-500"
                        : "bg-gray-400"
                    } text-white`}
                  >
                    Prepaid
                  </button>
                  <button
                    onClick={() => handleExistingTypeSelect("postpaid")}
                    className={`px-4 py-2 rounded ${
                      existingNumberType === "postpaid"
                        ? "bg-linear-to-r from-blue-600 to-teal-500"
                        : "bg-gray-400"
                    } text-white`}
                  >
                    Postpaid
                  </button>
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    value={existingPhone}
                    onChange={(e) =>
                      setExistingPhone(
                        e.target.value.replace(/\D/g, "").substring(0, 10),
                      )
                    }
                    placeholder="Enter your 10-digit mobile number (04xxxxxxxx)"
                    className="w-full p-2 rounded bg-transparent border border-white/50 text-white text-center"
                  />
                  {existingPhone && !existingPhone.match(/^04\d{8}$/) && (
                    <p className="text-red-600 text-md mt-1">
                      Please enter a valid 10-digit Australian mobile number
                      starting with 04
                    </p>
                  )}
                </div>

                {showArnInput && (
                  <div className="mb-3">
                    <input
                      type="text"
                      value={arn}
                      onChange={(e) => {
                        const value = e.target.value;
                        setArn(value);
                        localStorage.setItem("arn", value);
                      }}
                      placeholder="Enter ARN (Account Reference Number)"
                      className="w-full p-2 rounded bg-transparent border border-white/50 text-white text-center"
                    />
                  </div>
                )}

                <button
                  onClick={handleExistingNumberSubmit}
                  disabled={
                    loading ||
                    !existingPhone.match(/^04\d{8}$/) ||
                    (existingNumberType === "postpaid" && !arn.trim())
                  }
                  className="w-full bg-linear-to-r from-blue-600 to-teal-500 text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </div>
            ) : showConfirmExistingNumber ? (
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/30 text-center">
                <p className="text-white mb-3">
                  Are you sure you want to port {existingPhone}?
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => confirmExistingNumber(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => confirmExistingNumber(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : showNumberButtons && numberOptions.length > 0 ? (
              <div className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 justify-center">
                {numberOptions.map((num, index) => (
                  <button
                    key={index}
                    onClick={() => handleNumberSelect(num)}
                    disabled={loading}
                    className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded hover:opacity-90 text-xs sm:text-xs md:text-sm"
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : showPlans && !selectedPlan && plans.length > 0 ? (
              <div className="flex flex-wrap gap-1 sm:gap-2 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/30 justify-center">
                {plans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlanSelect(plan)}
                    className="bg-linear-to-r from-blue-600 to-teal-500 text-white px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded hover:opacity-90 text-xs sm:text-xs md:text-sm"
                  >
                    {plan.planName} - ${plan.price}
                  </button>
                ))}
              </div>
            ) : showOtpInput ? (
              <div className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-lg border border-white/30 text-white">
                <p className="text-sm sm:text-base">
                  Enter the OTP sent to your existing number:
                </p>
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full p-2 rounded bg-transparent border border-white/50 text-center text-white text-sm sm:text-base"
                  placeholder="Enter 6-digit OTP"
                  autoFocus
                />
                <button
                  onClick={handleOtpVerify}
                  disabled={otpCode.length !== 6}
                  className="bg-[#2bb673] text-white px-8 py-2 rounded hover:opacity-90 disabled:opacity-50 text-sm"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-white/80 hover:text-white underline text-sm mt-4 transition-colors disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            ) : showPayment &&
              selectedPlan &&
              (existingNumberType ? otpVerified : true) ? (
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
            ) : null}
          </div>

          {/* Typing input bar — sits naturally at the bottom, never overlaps */}
          {isTypingEnabled && !flowCompleted && (
            <div className="flex-shrink-0 w-full px-3 sm:px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-2 sm:gap-3 border border-white/20 rounded-full px-4 py-2 sm:py-3 bg-white/15 backdrop-blur-md shadow-2xl">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Message..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-white placeholder-white/60 text-sm sm:text-base focus:outline-none px-2"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !message.trim()}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#00A3FF] text-white hover:bg-[#008EDB] transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="w-4 h-4 sm:w-5 sm:h-5"
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

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-2xl text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Delete Account
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setPendingDeleteIntent(false);
                }}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;