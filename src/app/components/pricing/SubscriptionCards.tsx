"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscriptionConfirmationModal from "./SubscriptionConfirmationModal";
import LoginRequiredModal from "./LoginRequiredModal";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { isUserLoggedIn, getSubscription } from "@/app/store/features/users/userSlice";
import { ISubscription } from "@/app/types/subscription.contract";

// Define TypeScript interfaces for the data structure
interface IndividualPlan {
  title: string;
  description: string;
  price: number;
  priceText: string;
  paymentType: string;
  buttonText: string;
  type: "subscription" | "individual";
  plan: string;
}

interface CorporatePlan {
  price: number;
  users: string;
  type: "subscription";
  plan: string;
}

interface SubscriptionData {
  individualPlans: IndividualPlan[];
  corporatePlans: {
    title: string;
    description: string;
    plans: CorporatePlan[];
    buttonText: string;
  };
}

const SubscriptionCards: React.FC = () => {
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCorporatePlan, setSelectedCorporatePlan] = useState<number | null>(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<IndividualPlan | CorporatePlan | null>(null);
  const [isCorporatePlan, setIsCorporatePlan] = useState(false);
  const router = useRouter();
  const isLoggedIn = useAppSelector(isUserLoggedIn);
  const subscription = useAppSelector(getSubscription) as ISubscription;

  const isSubscribed = () => {
    return subscription && Object.keys(subscription).length > 0 && "isActive" in subscription && subscription.isActive;
  };

  const isCurrentPlan = (plan: IndividualPlan | CorporatePlan) => {
    if (!isSubscribed() || !subscription) return false;

    const planType = plan.type;
    if (planType !== "subscription") {
      return false;
    }

    if ("users" in plan) {
      const userCount = parseInt(plan.users);
      switch (subscription.plan) {
        case "organization_10":
          return userCount === 10;
        case "organization_20":
          return userCount === 20;
        case "organization_50":
          return userCount === 50;
        default:
          return false;
      }
    } else {
      return subscription.plan === plan.plan;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/subscriptionData.json");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch subscription data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePlanClick = (plan: IndividualPlan) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isSubscribed()) {
      return;
    }
    setSelectedPlan(plan);
    setIsCorporatePlan(false);
    setShowConfirmationModal(true);
  };

  const handleCorporatePlanClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (isSubscribed()) {
      return;
    }
    if (selectedCorporatePlan !== null && data) {
      setSelectedPlan(data.corporatePlans.plans[selectedCorporatePlan]);
      setIsCorporatePlan(true);
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmPurchase = () => {
    // TODO: Implement purchase logic
    setShowConfirmationModal(false);
    if (selectedPlan?.type === "individual") {
      router.push("/course");
    } else {
      router.push("/buy-now?type=subscription");
    }
  };

  if (loading) return <div>Loading subscription plans...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No subscription data available</div>;

  return (
    <>
      <div className="w-full flex flex-col p-1  max-xl:p-4  lg:flex-row gap-6 h-auto lg:h-[494px] px-4">
        {/* Left Column - Individual Plans */}
        <div className="w-full lg:w-1/2 flex flex-col  gap-3 justify-between ">
          {data.individualPlans.map((plan, index) => (
            <div key={index} className="flex flex-row  h-auto lg:h-[237px] justify-between">
              <div className="bg-white border-1 border-gray-300 rounded-lg w-full p-6 flex flex-row justify-between mr-auto">
                <div className="flex flex-col justify-between w-1/2">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-black mb-2">{plan.title}</h1>
                    <p className="text-gray-700 text-sm sm:text-base">{plan.description}</p>
                  </div>
                  <button
                    onClick={() => handlePlanClick(plan)}
                    disabled={isSubscribed()}
                    className={`bg-[#F86537] text-sm sm:text-base text-white py-2 sm:py-3 font-medium px-6 rounded-4xl self-start mt-2 lg:mt-0 ${
                      isSubscribed()
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:bg-[#E55A2E] transition-all duration-300"
                    }`}
                  >
                    {isCurrentPlan(plan) ? "Current Plan" : isSubscribed() ? "Already Subscribed" : plan.buttonText}
                  </button>
                </div>
                <div className="flex flex-col justify-between w-1/2">
                  <div className="flex flex-col items-end">
                    <h1 className="text-white text-xs sm:text-sm uppercase bg-blue-500 w-fit rounded-lg px-2 py-1 self-end mb-2">
                      {plan.paymentType}
                    </h1>
                  </div>
                  <div>
                    <h2 className="text-5xl sm:text-6xl font-bold flex items-end flex-col">${plan.price}</h2>
                    <p className="flex items-end flex-col text-sm sm:text-base">{plan.priceText}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Corporate Plans */}
        <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between h-auto lg:h-full">
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-black mb-2">{data.corporatePlans.title}</h1>
            <p className="text-gray-700 text-sm sm:text-base mb-4">{data.corporatePlans.description}</p>
            <ul className="space-y-2">
              {data.corporatePlans.plans.map((plan, index) => (
                <React.Fragment key={index}>
                  <li
                    className="flex py-2 items-center cursor-pointer"
                    onClick={() => !isSubscribed() && setSelectedCorporatePlan(index)}
                  >
                    <div className="flex flex-row w-full justify-between">
                      <div>
                        <h1 className="text-3xl sm:text-4xl font-bold">${plan.price}</h1>
                      </div>
                      <div className="flex items-center w-1/3 md:w-1/5 justify-between flex-row">
                        <h2 className="text-sm sm:text-base">{plan.users}</h2>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="checkbox"
                            className="peer hidden"
                            checked={selectedCorporatePlan === index}
                            onChange={() => !isSubscribed() && setSelectedCorporatePlan(index)}
                            disabled={isSubscribed()}
                          />
                          <div
                            className={`h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-[#F86537] peer-checked:border-[#F86537] transition ${
                              isSubscribed() ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <svg
                              className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </label>
                      </div>
                    </div>
                  </li>
                  {index < data.corporatePlans.plans.length - 1 && <hr className="border-gray-200" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <button
            onClick={handleCorporatePlanClick}
            disabled={selectedCorporatePlan === null || isSubscribed()}
            className={`bg-[#F86537] duration-300 text-sm sm:text-base text-white py-2 sm:py-4 font-medium px-6 rounded-full w-full mt-2 lg:mt-0 ${
              selectedCorporatePlan === null || isSubscribed()
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#E55A2E]"
            }`}
          >
            {isSubscribed() &&
            selectedCorporatePlan !== null &&
            isCurrentPlan(data.corporatePlans.plans[selectedCorporatePlan])
              ? "Current Plan"
              : isSubscribed()
              ? "Already Subscribed"
              : data.corporatePlans.buttonText}
          </button>
        </div>
      </div>

      {selectedPlan && (
        <SubscriptionConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmPurchase}
          plan={{
            title: isCorporatePlan ? data.corporatePlans.title : (selectedPlan as IndividualPlan).title,
            price: selectedPlan.price,
            paymentType: isCorporatePlan ? "Corporate" : (selectedPlan as IndividualPlan).paymentType,
            users: isCorporatePlan ? data.corporatePlans.plans[selectedCorporatePlan!].users : undefined,
            type: selectedPlan.type,
          }}
        />
      )}

      <LoginRequiredModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
};

export default SubscriptionCards;
