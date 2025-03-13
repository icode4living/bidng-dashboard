import { useState, useEffect } from "react";

interface ResendVerificationCodeProps {
  onResend: () => void; // Callback function to trigger resend action
}

const OtpRequest: React.FC<ResendVerificationCodeProps> = ({ onResend }) => {
  const [countdown, setCountdown] = useState<number>(30); // Start the countdown at 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      setIsResendDisabled(false); // Re-enable resend after countdown reaches 0
    }

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [countdown]);

  const handleResend = async() => {
    // Trigger the resend logic (like API call)
   onResend();
   
    // Reset countdown to 30 seconds after resend
    setCountdown(30);
    setIsResendDisabled(true); // Disable resend button during countdown
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-6">
      {/*<p className="text-lg text-gray-700">Enter the verification code sent to your email:</p>
      <input
        type="text"
        placeholder="Verification Code"
        className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />*/}
      <button
        onClick={handleResend}
        disabled={isResendDisabled}
        className={`px-6 py-2 text-white rounded-md transition-all ${
          isResendDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-primary-600"
        }`}
      >
        {isResendDisabled ? `Resend in ${countdown}s` : "Get OTP"}
      </button>
    </div>
  );
};

export default OtpRequest;
