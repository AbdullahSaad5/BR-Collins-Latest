"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutPageProps {
  plan: {
    title: string;
    price: number;
    type: "subscription" | "individual";
  };
  onBack: () => void;
}

const CheckoutForm: React.FC<{ plan: CheckoutPageProps["plan"]; onBack: () => void }> = ({ plan, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)!,
      });

      if (stripeError) {
        setError(stripeError.message || "An error occurred");
        setProcessing(false);
        return;
      }

      // Here you would typically send the paymentMethod.id to your backend
      // to complete the payment process
      console.log("PaymentMethod:", paymentMethod);

      // Simulate successful payment
      setSuccess(true);
      setTimeout(() => {
        router.push("/success");
      }, 2000);
    } catch (err) {
      setError("An unexpected error occurred");
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500">Redirecting to your account...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F86537]/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-[#F86537]" />
          </div>
          <h2 className="text-2xl font-semibold text-neutral-900">Payment Details</h2>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-1">{plan.title}</h3>
            <p className="text-gray-500">{plan.type === "subscription" ? "Yearly Subscription" : "Lifetime Access"}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-900">${plan.price}</span>
            {plan.type === "subscription" && <span className="text-gray-500">/year</span>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="w-4 h-4" />
            <span>Your payment is secure and encrypted</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!stripe || processing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#F86537] rounded-lg hover:bg-[#E55A2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {processing ? "Processing..." : "Complete Purchase"}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plan Selection
        </button>
      </div>
    </form>
  );
};

const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, onBack }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 animate-slideIn"
      >
        <div className="p-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm plan={plan} onBack={onBack} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
