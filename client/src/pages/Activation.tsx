import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useActivationMutation } from "../redux/features/auth/authApi";
import { useParams, useLocation } from "wouter";

const Activation = () => {
  const { activation_token } = useParams();
  const [, navigate] = useLocation();

  const [activateUser, { isSuccess, data, error }] = useActivationMutation();

  // ✅ Run as soon as activation_token is available
  useEffect(() => {
    if (!activation_token) return;         // <-- guard
    activateUser({ activation_token });    // automatically re-runs when token changes
  }, [activation_token]);

  // ✅ Handle success / error
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Account activated!");

      // Redirect to "/auth" after 2 seconds
      const timer = setTimeout(() => navigate("/auth"), 2000);
      return () => clearTimeout(timer);
    }

    if (error && "data" in error) {
      // show the error message from your API
      toast.error((error as any).data?.message || "Activation failed");
      // optionally redirect after a delay on error
      const timer = setTimeout(() => navigate("/auth"), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, data, error, navigate]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isSuccess ? (
        <p>Activating your account, please wait…</p>
      ) : (
        <p>Your account has been activated! Redirecting you to login…</p>
      )}
    </div>
  );
};

export default Activation;
