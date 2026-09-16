"use client";

import LegalDocLayout from "../../components/layout/LegalDocLayout";

export default function StandardFormOfAgreementPage() {
  return (
    <LegalDocLayout
      title="General Terms and Standard Form of Agreement"
      effectiveDate="14 September 2026"
      version="1.0 DRAFT"
      appliesTo="JUSTmobile mobile services"
    >
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
        <p className="text-amber-900 mt-0 mb-2 font-bold uppercase tracking-wider text-sm">
          Draft for legal review before publication
        </p>
        <p className="text-amber-800 mb-0 text-sm">
          This agreement has been prepared from JUSTmobile's confirmed service
          information, the Pennytel CIS supplied as the operating reference, and
          current Australian consumer/telco requirements. Several operational
          details that are not stated in the supplied CIS are identified in the
          publication checklist at the end.
        </p>
      </div>

      <h3>1. About this agreement</h3>
      <p>
        These General Terms form JUSTmobile's Standard Form of Agreement
        (Agreement) for the supply of eligible mobile services. The Agreement is
        between Just Mobile Pty Ltd (ABN 38 673 355 836), trading as JUSTmobile
        (we, us or JUSTmobile), and the customer who acquires or uses the service
        (you).
      </p>
      <p>
        Your Agreement includes these General Terms, the Critical Information
        Summary (CIS) for your plan, any applicable rate schedule, the Acceptable
        Use Policy, Privacy Policy, Payment Assistance Policy, Complaints Handling
        Process, Domestic, Family and Sexual Violence Support Policy, and any
        specific promotional or offer terms disclosed to you before you acquire
        the service.
      </p>
      <p>
        If there is an inconsistency, a specific offer term or CIS applies to the
        extent of the inconsistency, except where the law requires otherwise.
      </p>

      <h3>2. When the agreement starts and your minimum term</h3>
      <p>
        For month-to-month services, the Agreement starts when your service is
        activated or when you begin using the service, whichever occurs first.
        The minimum term is one month unless a different term is expressly
        disclosed to you before sign-up.
      </p>
      <p>
        Month-to-month services do not have an early termination charge. You
        remain responsible for charges properly incurred up to the date your
        service ends and for any other amounts payable under the Agreement.
      </p>

      <h3>3. Your mobile service</h3>
      <p>
        JUSTmobile supplies SIM-only mobile services that allow you to make and
        receive calls, send and receive SMS/MMS, and access mobile data in
        Australia. You may request a new Australian mobile number or transfer an
        eligible existing Australian mobile number to JUSTmobile.
      </p>
      <p>
        JUSTmobile uses part of the Telstra Wholesale Mobile Network and its
        capabilities to provide mobile services. JUSTmobile is responsible for
        providing the service to you and is not affiliated with or related to the
        principal carrier.
      </p>
      <p>
        Network access, maximum plan speeds, data inclusions, international
        inclusions and data-bank limits vary by plan and are set out in the
        applicable CIS. Actual speeds and coverage may vary due to location,
        network congestion, network availability, device capability and other
        technical factors.
      </p>

      <h3>4. Equipment and compatibility</h3>
      <p>
        You must use a compatible, unlocked handset and any other compatible
        customer equipment needed to access the service. Voice calling requires a
        compatible 4G/VoLTE handset. 5G access requires an eligible plan, a
        compatible 5G handset and 5G coverage.
      </p>
      <p>
        You are responsible for ensuring your device is lawful, safe, compatible
        and configured correctly. We are not responsible for faults in equipment
        that we did not supply, subject always to your rights under the
        Australian Consumer Law.
      </p>

      <h3>5. Plans and charges</h3>
      <p>
        Your monthly plan charge and inclusions are set out in your CIS and any
        applicable offer terms. All advertised consumer prices include GST unless
        stated otherwise.
      </p>

      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-900 border-b">Plan</th>
              <th className="px-4 py-2 font-semibold text-gray-900 border-b">Standard monthly charge</th>
              <th className="px-4 py-2 font-semibold text-gray-900 border-b">Monthly data</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b"><td className="px-4 py-2">15GB</td><td className="px-4 py-2">$32</td><td className="px-4 py-2">15GB</td></tr>
            <tr className="border-b"><td className="px-4 py-2">45GB</td><td className="px-4 py-2">$37</td><td className="px-4 py-2">45GB</td></tr>
            <tr className="border-b"><td className="px-4 py-2">65GB</td><td className="px-4 py-2">$40</td><td className="px-4 py-2">65GB</td></tr>
            <tr className="border-b"><td className="px-4 py-2">100GB</td><td className="px-4 py-2">$49</td><td className="px-4 py-2">100GB</td></tr>
            <tr className="border-b"><td className="px-4 py-2">120GB</td><td className="px-4 py-2">$57</td><td className="px-4 py-2">120GB</td></tr>
            <tr className="border-b"><td className="px-4 py-2">150GB</td><td className="px-4 py-2">$63</td><td className="px-4 py-2">150GB</td></tr>
            <tr><td className="px-4 py-2">180GB</td><td className="px-4 py-2">$68</td><td className="px-4 py-2">180GB</td></tr>
          </tbody>
        </table>
      </div>

      <p>
        The maximum monthly charge may not be calculable in advance because
        charges can arise for usage or services outside plan inclusions, where
        those services are enabled. Any applicable Pay As You Go, roaming, paper
        bill, late payment or other charges will be disclosed in the CIS,
        relevant rate schedule or before the charge applies.
      </p>

      <h3>6. Included services and exclusions</h3>
      <p>
        Subject to the applicable CIS and our Acceptable Use Policy, eligible
        plans include:
      </p>
      <ul>
        <li>unlimited standard calls in Australia to Australian landlines, mobiles, 13, 1300 and 1800 numbers;</li>
        <li>unlimited standard SMS to Australian mobile numbers;</li>
        <li>unlimited standard photo MMS to Australian mobile numbers;</li>
        <li>voicemail;</li>
        <li>call forwarding in Australia to Australian fixed lines and mobiles; and</li>
        <li>the monthly mobile data allowance and any eligible data banking described in your CIS.</li>
      </ul>
      <p>
        Premium numbers, directory assistance, time and weather services, mobile
        satellite services, international MMS and other non-standard destinations
        may be charged separately or may not be supported.
      </p>

      <h3>7. International calls and roaming</h3>
      <p>
        International calling inclusions vary by plan. Where your plan includes
        international calls and SMS, the included destinations are listed in your
        CIS. For plans without included international usage, international calling
        may be disabled by default and Pay As You Go rates may apply if enabled.
      </p>
      <p>
        International roaming is not part of the standard domestic plan
        allowance. Where available, roaming is supplied under the applicable
        roaming terms, eligible-country list and Travel Pack or other roaming
        charges disclosed by JUSTmobile.
      </p>

      <h3>8. Data use and data banking</h3>
      <p>
        Your service first uses your current monthly data allowance and then any
        available banked data, subject to the rules for your plan. Unused
        eligible monthly data rolls into your Data Bank up to the cap specified
        in your CIS.
      </p>
      <p>
        Banked data is for eligible use in Australia and cannot be used while
        roaming overseas. Banked data may be forfeited if you downgrade to a plan
        that does not support the same bank, move to an ineligible plan, cancel,
        disconnect or transfer your service.
      </p>
      <p>
        Should you exhaust all of your allowed data during a billing period, an
        automatic top up of 1Gb is available at a cost of $10 per Gb.
      </p>

      <h3>9. Billing and payment</h3>
      <p>
        JUSTmobile services are postpaid. Service charges start when your service
        is activated. Your billing cycle, the timing of invoices, any pro-rata
        treatment for activation part-way through a cycle, and available payment
        methods will be described in your CIS, billing information or at sign-up.
      </p>
      <p>
        You must pay valid charges by the due date shown on your invoice. If you
        believe a charge is incorrect, contact us promptly. You are not required
        to pay a genuinely disputed amount while it is being dealt with where
        applicable law or our complaints process requires otherwise.
      </p>
      <p>
        If you are having difficulty paying, you have the right to ask for
        assistance under our Payment Assistance Policy. Applying for or receiving
        payment assistance is free.
      </p>

      <h3>10. Number allocation and porting</h3>
      <p>
        A mobile number allocated to you remains subject to Australia's
        telecommunications numbering arrangements and is not owned by you. You
        may request to port an eligible number to or from JUSTmobile in
        accordance with applicable law and industry processes.
      </p>
      <p>
        We may require identity verification and additional authentication before
        completing a port, SIM replacement, eSIM change or another high-risk
        transaction. We may delay or refuse a transaction where required or
        permitted to protect customers, prevent fraud or comply with law.
      </p>

      <h3>11. Your responsibilities</h3>
      <p>You must:</p>
      <ul>
        <li>provide accurate, current information and promptly tell us if relevant details change;</li>
        <li>keep account credentials, PINs, passwords, verification codes, SIMs and devices secure;</li>
        <li>not use the service unlawfully, fraudulently, abusively or in a way that interferes with the network or other users;</li>
        <li>comply with our Acceptable Use Policy and reasonable security directions;</li>
        <li>take reasonable steps to prevent unauthorised use and notify us promptly if you suspect loss, theft, fraud or account compromise; and</li>
        <li>pay valid charges when due, subject to your rights to dispute charges and seek payment assistance.</li>
      </ul>

      <h3>12. Acceptable use</h3>
      <p>
        Unlimited and included services are for ordinary personal or permitted
        business use and remain subject to our Acceptable Use Policy. We may take
        proportionate steps where use is unlawful, fraudulent, threatens network
        integrity or security, materially affects other users, or otherwise
        breaches the Acceptable Use Policy.
      </p>
      <p>
        Where practicable and legally permitted, we will give reasonable notice
        and an opportunity to remedy the issue before restricting, suspending or
        cancelling a service, unless urgent action is reasonably required for
        safety, security, fraud prevention or legal compliance.
      </p>

      <h3>13. Changes to plans, prices or terms</h3>
      <p>
        We may change a plan, price, term, feature or service where reasonably
        necessary for legitimate business, technical, network, regulatory or
        security reasons.
      </p>
      <p>
        If a change is likely to have more than a minor adverse impact on you, we
        will give advance notice as required by law and, where required, provide
        a fair right to cancel or change service without an unfair penalty.
        Nothing in this clause permits JUSTmobile to make a change in a way that
        is unfair under the Australian Consumer Law.
      </p>

      <h3>14. Changing or cancelling your service</h3>
      <p>
        For a month-to-month service, you may ask us to change or cancel your
        service at any time, subject to any reasonable processing requirements,
        outstanding valid charges and applicable porting rules.
      </p>
      <p>
        If you port your number to another provider, the JUSTmobile service
        associated with that number may end once the port completes. You should
        not separately cancel a service before a port if doing so could cause you
        to lose the number.
      </p>
      <p>
        Should you encounter any issues with your cancellation or port out
        request you can reach us at <a href="mailto:info@justmobile.ai">info@justmobile.ai</a> or call us on 1300 492 002.
      </p>

      <h3>15. Suspension and disconnection</h3>
      <p>
        We may suspend, restrict or disconnect a service where reasonably
        necessary, including for serious non-payment, fraud, unlawful use,
        misuse, security threats, network protection, emergency response, or
        where required by law.
      </p>
      <p>
        Credit management action is subject to our Payment Assistance Policy and
        applicable telecommunications rules. Suspension or disconnection for
        financial hardship is a last resort, and we will provide required notices
        and support.
      </p>
      <p>
        We will take account of any known domestic, family or sexual violence
        safety concerns and comply with our relevant support obligations before
        taking action that could create or increase risk.
      </p>

      <h3>16. Service faults, outages and maintenance</h3>
      <p>
        Mobile services depend on network availability and may be affected by
        planned maintenance, outages, congestion, weather, power failures,
        emergency events, device compatibility and other factors outside our
        reasonable control.
      </p>
      <p>
        We will provide outage information and customer communications where
        required by applicable telecommunications rules. If you experience a
        service problem, contact us so we can investigate and provide available
        remedides.
      </p>

      <h3>17. Emergency calls</h3>
      <p>
        Mobile services rely on handset power, device compatibility and available
        mobile network coverage. If your handset has no battery, is faulty, is
        incompatible with the available network, or is outside coverage, you may
        be unable to call 000.
      </p>
      <p>
        If you or another person relies on uninterrupted access to emergency
        calling, you should maintain an appropriate alternative means of
        communication.
      </p>

      <h3>18. Privacy and customer information</h3>
      <p>
        We collect, use, hold and disclose personal information in accordance
        with our Privacy Policy and applicable law. This includes information
        required to supply telecommunications services, verify identity, prevent
        fraud, manage billing, support customers, handle complaints and meet
        legal or regulatory obligations.
      </p>
      <p>
        JUSTmobile may use AI-assisted systems as part of customer support and
        service administration. Use of AI does not reduce our obligations under
        privacy, telecommunications and consumer-protection laws.
      </p>

      <h3>19. Domestic, family and sexual violence support</h3>
      <p>
        If you are experiencing or at risk of domestic, family or sexual
        violence, JUSTmobile can provide additional privacy, safety, account and
        communication support. See our Domestic, Family and Sexual Violence
        Support Policy and Statement. In an emergency, call 000.
      </p>

      <h3>20. Complaints and the TIO</h3>
      <p>
        If you have a complaint, contact JUSTmobile free of charge on 1300 492
        002 or at <a href="mailto:info@justmobile.ai">info@justmobile.ai</a>.
        Human support is available Monday to Friday, 9:00am-5:00pm Sydney time
        (AEST/AEDT as applicable). We will handle complaints in accordance with
        our Complaints Handling Process.
      </p>
      <p>
        If you are not satisfied with how we handle your complaint, you may
        contact the Telecommunications Industry Ombudsman (TIO), a free and
        independent dispute resolution service, on 1800 062 058 or at{" "}
        <a href="https://www.tio.com.au" target="_blank" rel="noopener noreferrer">tio.com.au</a>.
      </p>

      <h3>21. Australian Consumer Law</h3>
      <p>
        Our services come with guarantees and other rights under the Australian
        Consumer Law that cannot be excluded, restricted or modified. Nothing in
        this Agreement excludes, restricts or modifies those rights or any other
        right or remedy that cannot lawfully be excluded.
      </p>

      <h3>22. Liability</h3>
      <p>
        To the maximum extent permitted by law, each party is responsible for
        loss or damage to the extent caused by that party's breach of the
        Agreement, negligence, unlawful conduct or other act or omission for
        which it is legally responsible.
      </p>
      <p>
        Nothing in this Agreement limits liability where doing so would be
        unlawful, including liability that cannot be excluded under the
        Australian Consumer Law. Any limitation or exclusion in this Agreement is
        subject to those mandatory rights.
      </p>
      <p>
        JUSTmobile is not responsible for loss caused solely by equipment,
        applications, services or networks outside our reasonable control, except
        to the extent the law provides otherwise.
      </p>

      <h3>23. Assignment and transfer</h3>
      <p>
        You may not transfer contractual responsibility for your service without
        our agreement, except where a legal or regulatory process provides
        otherwise. We may transfer or assign our rights and obligations as part
        of a genuine business sale, restructure or service arrangement, provided
        this does not materially reduce your rights and is permitted by law.
      </p>

      <h3>24. Notices and communications</h3>
      <p>
        We may communicate with you using the contact details you have provided,
        including email, SMS, account notifications or other agreed channels. You
        must keep your contact details current.
      </p>
      <p>
        Where a law requires a particular form, timing or method of notice, we
        will comply with that requirement.
      </p>

      <h3>25. Governing law</h3>
      <p>
        This Agreement is governed by the laws applicable in the Australian State
        or Territory in which you ordinarily reside or acquire the service,
        subject to applicable Commonwealth law. Nothing in this clause limits any
        right you have to bring a matter in a court or tribunal with
        jurisdiction.
      </p>

      <div className="bg-gray-100 rounded-lg p-6 mt-12 border border-gray-200">
        <h3 className="mt-0 text-gray-900">26. Contact JUSTmobile</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0 text-sm">
          <div>
            <dt className="font-semibold text-gray-700">Provider</dt>
            <dd className="text-gray-600 mt-1">
              Just Mobile Pty Ltd trading as JUSTmobile
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">ABN</dt>
            <dd className="text-gray-600 mt-1">38 673 355 836</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">Phone</dt>
            <dd className="text-gray-600 mt-1">1300 492 002</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">Email</dt>
            <dd className="text-gray-600 mt-1">
              <a href="mailto:info@justmobile.ai">info@justmobile.ai</a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">Human support hours</dt>
            <dd className="text-gray-600 mt-1">
              Monday to Friday, 9:00am-5:00pm Sydney time (AEST/AEDT as applicable)
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-700">Website</dt>
            <dd className="text-gray-600 mt-1">
              <a href="https://justmobile.ai">justmobile.ai</a>
            </dd>
          </div>
        </dl>
      </div>
    </LegalDocLayout>
  );
}
