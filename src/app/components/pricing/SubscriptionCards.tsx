"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Define TypeScript interfaces for the data structure
interface IndividualPlan {
  title: string;
  description: string;
  price: number;
  priceText: string;
  paymentType: string;
  buttonText: string;
}

interface CorporatePlan {
  price: number;
  users: string;
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

  if (loading) return <div>Loading subscription plans...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No subscription data available</div>;

  return (
    <div className="w-full flex flex-col lg:p-0 p-3 lg:flex-row gap-6 h-auto lg:h-[494px]">
      {/* Left Column - Individual Plans */}
      <div className="w-full lg:w-1/2 flex flex-col lg:gap-0 gap-3 justify-between ">
        {data.individualPlans.map((plan, index) => (
          <div key={index} className="flex flex-row  h-auto lg:h-[237px] justify-between">
            <div className="bg-white border-1 border-gray-300 rounded-lg w-full p-6 flex flex-row justify-between mr-auto">
              <div className="flex flex-col justify-between w-1/2">
                <div>
                  <h1 className="text-xl font-bold text-black mb-2">{plan.title}</h1>
                  <p className="text-gray-700">{plan.description}</p>
                </div>
                <button className="bg-[#F86537] text-white py-3 font-medium px-6 rounded-4xl self-start mt-2 lg:mt-0">
                  {plan.buttonText}
                </button>
              </div>
              <div className="flex flex-col justify-between w-1/2">
                <div className="flex flex-col items-end">
                  <h1 className="text-white text-sm uppercase bg-blue-500 w-fit rounded-lg px-2 py-1 self-end mb-2">
                    {plan.paymentType}
                  </h1>
                </div>
                <div>
                  <h2 className="text-6xl font-bold flex items-end flex-col">${plan.price}</h2>
                  <p className="flex items-end flex-col">{plan.priceText}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column - Corporate Plans */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-lg p-6 flex flex-col justify-between h-auto lg:h-full">
        <div>
          <h1 className="text-2xl font-bold text-black mb-2">{data.corporatePlans.title}</h1>
          <p className="text-gray-700 mb-4">{data.corporatePlans.description}</p>
          <ul className="space-y-2">
            {data.corporatePlans.plans.map((plan, index) => (
              <React.Fragment key={index}>
                <li className="flex py-2 items-center">
                  <div className="flex flex-row w-full justify-between">
                    <div>
                      <h1 className="text-4xl font-bold">${plan.price}</h1>
                    </div>
                    <div className="flex items-center w-1/3 md:w-1/5 justify-between flex-row">
                      <h2>{plan.users}</h2>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="checkbox"
                          className="peer hidden"
                          checked={selectedCorporatePlan === index}
                          onChange={() => setSelectedCorporatePlan(index)}
                        />
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 p-2 flex items-center justify-center peer-checked:bg-[#F86537] peer-checked:border-[#F86537] transition">
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
        <button className="bg-[#F86537] text-white py-4 font-medium px-6 rounded-full w-full mt-2 lg:mt-0">
          {data.corporatePlans.buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCards;
