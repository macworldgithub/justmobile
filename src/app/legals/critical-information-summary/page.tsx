"use client";

import LegalDocLayout from "../../components/layout/LegalDocLayout";

export default function CriticalInformationSummaryPage() {
  return (
    <LegalDocLayout
      title="Critical Information Summary"
      effectiveDate="14 September 2026"
      version="1.0"
      appliesTo="JUSTmobile Mobile Plans"
    >
      <div className="bg-indigo-50 p-6 rounded-lg mb-8 text-indigo-900 border border-indigo-100">
        <p className="mt-0 mb-0 font-medium">
          This Critical Information Summary outlines the key features, pricing and conditions of JUSTmobile Mobile Plans. It is a summary only. Read it together with JUSTmobile's General Terms, Standard Form of Agreement, applicable rate schedules and policies at <a href="https://justmobile.ai" className="underline hover:text-indigo-700">justmobile.ai</a>.¹
        </p>
      </div>

      <h3>1. Information about the service</h3>
      <p>
        JUSTmobile Residential Mobile Plans are month-to-month SIM-only mobile
        services. They allow you to make and receive calls, send and receive
        SMS/MMS, and access mobile data in Australia. You may request a new
        Australian mobile number or transfer an existing Australian mobile number
        to JUSTmobile.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm text-left border-collapse border border-gray-200">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 w-1/4 align-top">
                Minimum term
              </th>
              <td className="px-4 py-3 text-gray-700">
                <strong>Month-to-month services:</strong> 1 month. Some Business Mobile services may be supplied on a fixed term where agreed at sign-up.
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 align-top">
                Minimum total cost
              </th>
              <td className="px-4 py-3 text-gray-700">
                <strong>Month-to-month services:</strong> one month of the selected plan charge shown below.<br />
                <strong>Fixed-term Business Mobile services:</strong> the selected monthly plan charge multiplied by the agreed fixed-term months, as disclosed at sign-up.
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 align-top">
                Maximum monthly charge
              </th>
              <td className="px-4 py-3 text-gray-700">
                Not calculable. Your monthly cost may exceed the plan charge if you use or incur charges for services outside plan inclusions, including Pay As You Go usage, International Roaming Travel Packs, paper bills, late payment fees or other applicable charges.
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 align-top">
                Early termination charge
              </th>
              <td className="px-4 py-3 text-gray-700">
                <strong>Residential and month-to-month Business Mobile services:</strong> $0.<br />
                <strong>Fixed-term Business Mobile services:</strong> an early termination charge may apply if you cancel before the end of the agreed term. It will be calculated as the remaining monthly plan charges for the fixed term, capped at the maximum amount disclosed at sign-up.
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 align-top">
                SIM activation &amp; porting
              </th>
              <td className="px-4 py-3 text-gray-700">$0</td>
            </tr>
            <tr>
              <th className="px-4 py-3 bg-gray-50 font-semibold text-gray-900 align-top">
                Equipment required
              </th>
              <td className="px-4 py-3 text-gray-700">
                BYO compatible, unlocked mobile handset. Voice calling requires a compatible 4G/VoLTE handset. 5G access requires a compatible 5G handset and 5G coverage.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>2. Plans, Pricing &amp; Charges</h3>
      <p className="text-sm text-gray-500 mb-2">All prices include GST.</p>
      
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-xs text-left border border-gray-200">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-3 py-2 font-semibold text-gray-900">Plan</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Monthly charge</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Data included</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Network access</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Speed cap* (Down/Up)</th>
              <th className="px-3 py-2 font-semibold text-gray-900">Data Bank</th>
              <th className="px-3 py-2 font-semibold text-gray-900">International calls &amp; SMS from Australia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-3 py-2 font-medium">15GB</td>
              <td className="px-3 py-2">$32</td>
              <td className="px-3 py-2">15 GB</td>
              <td className="px-3 py-2">4G</td>
              <td className="px-3 py-2">100/100 Mbps</td>
              <td className="px-3 py-2">Up to 500GB</td>
              <td className="px-3 py-2">PAYG if enabled</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">45GB</td>
              <td className="px-3 py-2">$37</td>
              <td className="px-3 py-2">45 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">150/150 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">65GB</td>
              <td className="px-3 py-2">$40</td>
              <td className="px-3 py-2">65 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">150/150 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">100GB</td>
              <td className="px-3 py-2">$49</td>
              <td className="px-3 py-2">100 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">150/150 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">120GB</td>
              <td className="px-3 py-2">$57</td>
              <td className="px-3 py-2">120 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">250/250 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">150GB</td>
              <td className="px-3 py-2">$63</td>
              <td className="px-3 py-2">150 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">250/250 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">180GB</td>
              <td className="px-3 py-2">$68</td>
              <td className="px-3 py-2">180 GB</td>
              <td className="px-3 py-2">4G &amp; 5G</td>
              <td className="px-3 py-2">250/250 Mbps</td>
              <td className="px-3 py-2">Up to 1,000GB</td>
              <td className="px-3 py-2">Included to 15 countries</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-xs text-gray-500 mb-6 italic">
        * Speed caps are the maximum potential upload/download speeds for the plan. Actual speeds may be lower and vary due to location, coverage, network congestion, device capability and other technical factors.
      </p>

      <h4>Included in all plans</h4>
      <ul>
        <li>unlimited standard calls in Australia to Australian landlines, mobiles, 13, 1300 and 1800 numbers;</li>
        <li>unlimited standard SMS to Australian mobile numbers;</li>
        <li>unlimited standard photo MMS to Australian mobile numbers;</li>
        <li>voicemail;</li>
        <li>call forwarding in Australia to Australian fixed lines and mobiles;</li>
        <li>the monthly mobile data allowance shown above; and</li>
        <li>Data Banking, subject to the conditions below.</li>
      </ul>
      <p className="text-sm">
        Unlimited inclusions are subject to JUSTmobile's Acceptable Use Policy.¹
      </p>

      <h3>3. International calls, SMS and MMS</h3>
      <ul>
        <li>
          The 45GB, 65GB, 100GB, 120GB, 150GB and 180GB plans include unlimited standard calls and SMS from Australia to landlines and mobiles in: China, France, Germany, Greece, Hong Kong, India, Ireland, Malaysia, New Zealand, Singapore, South Korea, Thailand, United Kingdom, USA and Vietnam.
        </li>
        <li>
          The 15GB plan does not include international calls or SMS. International calling is disabled when you first join this plan. You may ask JUSTmobile to enable it; once enabled, Pay As You Go rates apply.
        </li>
        <li>
          Calls or SMS to destinations not included in your plan are charged at applicable Pay As You Go rates.
        </li>
        <li>
          International MMS is not included on any plan. Pay As You Go rates apply.
        </li>
        <li>
          See JUSTmobile's applicable international and Pay As You Go rates at justmobile.ai.¹
        </li>
      </ul>

      <h3>4. Data usage and Data Banking</h3>
      <ul>
        <li>
          Your service uses your monthly data allowance; then any available data in your Data Bank.
        </li>
        <li>
          Once both have been used, your service will no longer have access to mobile data until further data becomes available under your plan at the start of a new billing cycle. No automatic data top-up applies.²
        </li>
        <li>
          Unused monthly data rolls into your Data Bank, up to the cap shown in the plan table. Banked data is for use in Australia only and cannot be used while roaming overseas. Banked data may be forfeited if you downgrade to a lower-cost plan, move to a plan that is not eligible for Data Banking, cancel, disconnect or transfer your service.
        </li>
      </ul>

      <h3>5. Additional charges and exclusions</h3>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full text-sm text-left border-collapse border border-gray-200">
          <tbody>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900 w-1/3">SIM card &amp; activation</th>
              <td className="px-4 py-2 text-gray-700">$0.00 (free)</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">Number porting</th>
              <td className="px-4 py-2 text-gray-700">$0.00 (free) to keep your existing AU mobile number</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">International Calls / SMS</th>
              <td className="px-4 py-2 text-gray-700">PAYG rates apply outside plan inclusions</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">International MMS</th>
              <td className="px-4 py-2 text-gray-700">PAYG rates apply</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">International Roaming Travel Pack</th>
              <td className="px-4 py-2 text-gray-700">Available in eligible countries from $5 per day</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">Late Payment Fee</th>
              <td className="px-4 py-2 text-gray-700">$10.00 may apply if an invoice remains unpaid 14 days after the due date</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-50 font-semibold text-gray-900">Paper Bill</th>
              <td className="px-4 py-2 text-gray-700">$3.00 per bill</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm">
        Non-standard calls, SMS or MMS - such as premium numbers, directory assistance, time and weather services, mobile satellite services and other non-standard destinations - may be charged separately or may not be supported. See JUSTmobile's applicable rate schedules at justmobile.ai.¹
      </p>

      <h3>6. Network access, coverage and emergency calls</h3>
      <ul>
        <li>
          JUSTmobile uses the Telstra Wholesale Mobile Network. The Telstra Wholesale Mobile Network reaches at least 98.7% of the Australian population and at least 75% with 5G. Check likely coverage before purchase. 5G access is provided on the 45GB plan and above, requires a compatible 5G handset and is available in selected areas.
        </li>
        <li>
          Mobile services rely on handset power, device compatibility and available mobile network coverage. If your handset has no battery, is faulty, is not compatible with the available network or is outside mobile coverage, you may be unable to call 000.
        </li>
        <li>
          If you or another person relies on uninterrupted access to emergency calling, consider maintaining an appropriate alternative means of communication.
        </li>
      </ul>

      <h4>Billing, usage information and itemised bills</h4>
      <ul>
        <li>
          JUSTmobile services are postpaid services. Charges and inclusions are metered on a monthly billing cycle from the 28th of each month to the 27th of the following month.
        </li>
        <li>
          Service charges start from the day your service is activated. If your service is activated part-way through a billing cycle, your first bill may include a pro-rata charge for the period from your activation date to the 27th of that month and the next month's plan charge in advance. This means your first bill may be higher than your standard monthly plan charge.
        </li>
        <li>
          Invoices are generally issued after the billing cycle starts and sent to your nominated email address.
        </li>
        <li>
          If you request a printed and mailed bill, JUSTmobile may charge a paper bill fee where that fee has been disclosed to you and is permitted by law.
        </li>
        <li>
          You can access available account, bill, usage and service information through JUSTmobile's customer service channels. Usage information may not always be real-time.
        </li>
        <li>
          You may request an itemised bill for any current or past billing period. JUSTmobile provides itemised bills by email at no charge. If you request a printed and mailed itemised bill, JUSTmobile may charge a paper bill fee.
        </li>
        <li>
          See JUSTmobile's Billing &amp; Refunds Information, Payment Assistance Policy and other applicable policies at justmobile.ai.¹
        </li>
      </ul>

      <h4>Changes, support and complaints</h4>
      <p>
        JUSTmobile may change prices, terms, services or offers in accordance with its General Terms and applicable law. Where JUSTmobile reasonably considers that a change is likely to have more than a minor adverse impact on you, JUSTmobile will provide at least 14 days' written notice before the change takes effect, unless a shorter notice period is permitted or required under the General Terms or applicable law.
      </p>

      <h4>Contact JUSTmobile</h4>
      <ul>
        <li><strong>Website / AI support:</strong> justmobile.ai (24/7 AI-assisted activation, support and plan management)</li>
        <li><strong>Phone:</strong> 1300 492 002</li>
        <li><strong>Email:</strong> info@justmobile.ai</li>
      </ul>

      <h4>Complaints</h4>
      <ul>
        <li><strong>Complaints email:</strong> info@justmobile.ai</li>
        <li><strong>Complaints phone:</strong> 1300 492 002</li>
        <li>
          JUSTmobile will handle complaints in accordance with its Complaints Handling Process, including Network Outage Complaints.
        </li>
        <li>
          If you are not satisfied with how JUSTmobile has handled your complaint, you may contact the Telecommunications Industry Ombudsman, a free and independent dispute resolution service: Phone 1800 062 058; online at tio.com.au.
        </li>
      </ul>

      <h3>7. Other important information</h3>
      <h4>Service provider</h4>
      <p>
        Just Mobile Pty Ltd (ABN 38 673 355 836) acts as a reseller and uses part of the 5G/4G mobile network and capabilities of Telstra Corporation Limited (ABN 33 051 775 556) to provide these mobile services. Despite this, JUSTmobile is responsible for providing the service to you and is not affiliated with or related to the principal carrier.
      </p>
      
      <h4>Priority Assistance and Customer Service Guarantee</h4>
      <p>
        Priority Assistance is not available for JUSTmobile mobile services. The Customer Service Guarantee does not apply to mobile services.
      </p>
      
      <h4>Australian Consumer Law</h4>
      <p>
        Our services come with guarantees under the Australian Consumer Law that cannot be excluded. Nothing in this Critical Information Summary excludes, restricts or modifies your rights under the Australian Consumer Law.
      </p>
      
      <h4>Promotions</h4>
      <p>
        This summary describes JUSTmobile's standard Residential Mobile Plans. If a promotional offer, discount or bonus inclusion applies, the separate promotional terms will describe that variation.
      </p>

    </LegalDocLayout>
  );
}
