"use client";
import React from "react";
import PlanCard from "./Cards";


const smallPlans = [
  { id: "1", title: "Basic Plan", data: "10GB", price: "$20.54", highlight: false },
  { id: "2", title: "Standard Plan", data: "15GB", price: "$24.60", highlight: true },
  { id: "3", title: "Premium Plan", data: "25GB", price: "$28.53", highlight: false },
  { id: "4", title: "Elite Plan", data: "40GB", price: "$33.24", highlight: false },
];

const bigPlans = [
  { id: "5", title: "Basic Plan", data: "60GB", price: "$37.55", highlight: false },
  { id: "6", title: "Standard Plan", data: "100GB", price: "$46.40", highlight: true },
  { id: "7", title: "Premium Plan", data: "120GB", price: "$54.86", highlight: false },
  { id: "8", title: "Elite Plan", data: "150GB", price: "$59.89", highlight: false },
];

const commonFeatures = [
  "Unlimited standard calls",
  "Unlimited SMS to Australian Numbers",
  "5G Network Access",
];

const PlansSection = () => {
  return (
    <section className="w-[80%] mx-auto py-20 bg-white space-y-28">
      
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Small Plans
          </h2>
          <p className="mt-2 text-gray-500">
            Get the highest level of protection and privacy at a price that suits you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {smallPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              data={plan.data}
              price={plan.price}
              features={commonFeatures}
              highlight={plan.highlight}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            Big Plans
          </h2>
          <p className="mt-2 text-gray-500">
            Get the highest level of protection and privacy at a price that suits you
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bigPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.title}
              data={plan.data}
              price={plan.price}
              features={commonFeatures}
              highlight={plan.highlight}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default PlansSection;
