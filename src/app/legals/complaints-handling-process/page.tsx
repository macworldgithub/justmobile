"use client";

import LegalDocLayout from "../../components/layout/LegalDocLayout";

export default function ComplaintsHandlingProcessPage() {
  return (
    <LegalDocLayout
      title="Complaints Handling Process"
      effectiveDate="14 September 2026"
      version="1.0"
      appliesTo="All customers" // Using a generic appliesTo as it's not explicitly in the header, or I can use "At least annually" for review as it was in the text. Let's use "Review: At least annually"
    >
      {/* Intro section that is outside the numbered list */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
        <p className="text-indigo-900 mt-0 mb-4 font-medium">
          We want complaints to be easy to make, free of charge and resolved as
          quickly as possible. You do not need to use the word 'complaint'. If
          you tell us you are dissatisfied with our service or with the way we
          have handled an issue and you expect a response or resolution, we will
          treat it as a complaint.
        </p>
        <p className="text-indigo-800 mb-4">
          You can complain by phone on <strong>1300 492 002</strong>, by email
          at <strong>info@justmobile.ai</strong>, through our website/chat at{" "}
          <strong>justmobile.ai</strong>, or by post. Our staffed support hours
          are Monday to Friday, 9:00am-5:00pm Sydney time (AEST/AEDT as
          applicable). Online and email complaints may be submitted at any time.
        </p>
        <p className="text-indigo-800 mb-4">
          We will try to resolve your complaint on first contact. If that is not
          possible, we will generally propose a resolution within 10 working
          days. Urgent complaints are resolved within 2 working days, including
          implementation. Once you agree to a non-urgent resolution, we will
          normally implement it within 5 working days unless we agree otherwise
          with you or need you to complete an action first.
        </p>
        <p className="text-indigo-800 mb-0">
          If you are not satisfied with how we have handled your complaint, you
          have the right to take it to the Telecommunications Industry Ombudsman
          (TIO), which is a free and independent service. Call{" "}
          <strong>1800 062 058</strong> or visit <strong>tio.com.au</strong>.
        </p>
      </div>

      <h3>1. Purpose and scope</h3>
      <p>
        This process explains how JUSTmobile receives, records, investigates,
        resolves and monitors consumer complaints. It applies to prospective,
        current and former consumers of JUSTmobile telecommunications services,
        including complaints about our products, services, billing, customer
        support, network-related issues, privacy handling associated with the
        service, or this complaints process itself.
      </p>
      <p>
        JUSTmobile's complaints process is designed to comply with the
        Telecommunications (Consumer Complaints Handling) Industry Standard 2018
        and related Australian telecommunications consumer protection
        requirements.
      </p>

      <h3>2. What is a complaint?</h3>
      <p>
        A complaint is an expression of dissatisfaction about JUSTmobile's
        telecommunications products or services, or about the way we have
        handled a complaint, where you explicitly or implicitly expect us to
        respond or resolve the issue.
      </p>
      <ul>
        <li>You do not need to use the word 'complaint'.</li>
        <li>
          If we are unsure whether you want an issue treated as a complaint, we
          will ask you.
        </li>
        <li>
          A simple request for information, technical support or help is not
          automatically a complaint unless you tell us you are dissatisfied or
          want it treated as one.
        </li>
        <li>
          A complaint can be made by you, your authorised representative or an
          advocate acting on your behalf.
        </li>
      </ul>

      <h3>3. How to make a complaint</h3>
      <p>Making a complaint is free. You can use any of the following channels:</p>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm text-left">
          <tbody>
            <tr className="border-b">
              <th className="py-2 pr-4 font-semibold text-gray-900 w-32 align-top">Phone</th>
              <td className="py-2 text-gray-700">
                <strong>1300 492 002</strong> - Monday to Friday, 9:00am-5:00pm
                Sydney time (AEST/AEDT as applicable). The complaints option
                will allow you to speak directly with customer service personnel
                who can handle complaints.
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-2 pr-4 font-semibold text-gray-900 align-top">Email</th>
              <td className="py-2 text-gray-700">
                <a href="mailto:info@justmobile.ai">info@justmobile.ai</a>
              </td>
            </tr>
            <tr className="border-b">
              <th className="py-2 pr-4 font-semibold text-gray-900 align-top">Website / chat</th>
              <td className="py-2 text-gray-700">
                <a href="https://justmobile.ai">justmobile.ai</a> - including
                the JUSTmobile online support or chat channel.
              </td>
            </tr>
            <tr>
              <th className="py-2 pr-4 font-semibold text-gray-900 align-top">Post</th>
              <td className="py-2 text-gray-700">
                JUSTmobile Complaints, [postal address to be inserted before
                publication]
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        If JUSTmobile introduces a customer app that customers ordinarily use to
        communicate with us, complaints will also be accepted through that app.
      </p>
      <p>
        If you are deaf, hard of hearing or have a speech impairment, you may
        use the National Relay Service. Information is available at{" "}
        <a href="https://accesshub.gov.au/about-the-nrs" target="_blank" rel="noopener noreferrer">
          accesshub.gov.au/about-the-nrs
        </a>
        .
      </p>
      <p>
        If you need help to make or progress a complaint because of disability,
        language, financial hardship or another accessibility need, tell us and
        we will provide reasonable assistance.
      </p>

      <h3>4. What happens when we receive your complaint</h3>
      <ul>
        <li>
          For complaints made by phone or live chat, we will acknowledge the
          complaint straight away.
        </li>
        <li>
          For complaints received by email or post, we will acknowledge the
          complaint within 2 working days.
        </li>
        <li>
          We will give you a reference number or another way to identify your
          complaint.
        </li>
        <li>
          We will record the issues you raise, the outcome you are seeking and
          your preferred way for us to communicate with you.
        </li>
        <li>
          We will make best efforts to resolve the complaint at first contact.
          If we cannot, we will investigate it in a way that is proportionate to
          the seriousness and complexity of the issue.
        </li>
      </ul>

      <h3>5. Resolution timeframes</h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <tbody>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-2 font-semibold text-gray-900 w-1/3">
                Acknowledgement - phone/live chat
              </th>
              <td className="px-4 py-2 text-gray-700">Immediately</td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 font-semibold text-gray-900">
                Acknowledgement - email/post
              </th>
              <td className="px-4 py-2 text-gray-700">Within 2 working days</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-2 font-semibold text-gray-900">
                Urgent complaint
              </th>
              <td className="px-4 py-2 text-gray-700">
                Resolved and the resolution implemented within 2 working days
              </td>
            </tr>
            <tr className="border-b">
              <th className="px-4 py-2 font-semibold text-gray-900">
                Non-urgent complaint
              </th>
              <td className="px-4 py-2 text-gray-700">
                We will propose a resolution within 10 working days
              </td>
            </tr>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-2 font-semibold text-gray-900">
                Implement agreed non-urgent resolution
              </th>
              <td className="px-4 py-2 text-gray-700">
                Within 5 working days after you accept it, unless we agree a
                different timeframe or we are waiting for you to complete an
                agreed action
              </td>
            </tr>
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-900">
                Written confirmation
              </th>
              <td className="px-4 py-2 text-gray-700">
                Once an agreed resolution has been implemented, we will confirm
                this in writing within 5 working days
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>6. Urgent complaints</h3>
      <p>
        We will treat a complaint as urgent where the applicable rules require
        it, including where:
      </p>
      <ul>
        <li>
          you are a payment assistance / financial hardship customer (or have
          applied for assistance) and the complaint concerns an issue that could
          warsen your financial circumstances;
        </li>
        <li>
          the complaint relates to a service for which you receive Priority
          Assistance, where applicable;
        </li>
        <li>
          your service is about to be disconnected, or has been disconnected,
          and the required disconnection process was not followed; or
        </li>
        <li>
          you identify as experiencing, or possibly experiencing, domestic or
          family violence and indicate there is a threat to your safety or the
          safety of your children.
        </li>
      </ul>
      <p>
        Urgent complaints will be prioritised and resolved, including
        implementation of the resolution, within 2 working days.
      </p>

      <h3>7. Our approach to resolving complaints</h3>
      <p>
        We will consider the cause of the problem, your circumstances and the
        outcome you are seeking. A proposed resolution may include, depending on
        the issue:
      </p>
      <ul>
        <li>correcting an account or billing error;</li>
        <li>providing an explanation or further information;</li>
        <li>repairing or restoring a service where reasonably possible;</li>
        <li>changing, replacing or re-provisioning a service;</li>
        <li>applying an appropriate credit, refund or adjustment;</li>
        <li>correcting personal or account information;</li>
        <li>providing payment assistance where appropriate;</li>
        <li>taking steps to address a recurring or systemic issue; or</li>
        <li>another fair and reasonable remedy suited to the complaint.</li>
      </ul>
      <p>
        A complaint is considered resolved when we have proposed a resolution
        that you accept, or when we have advised that a straightforward issue
        has been resolved. If we cannot resolve the complaint to your
        satisfaction, we will explain our position and tell you about your right
        to go to the TIO.
      </p>

      <h3>8. Escalating or prioritising your complaint</h3>
      <p>
        You can ask us to escalate or prioritise your complaint if you are
        dissatisfied with its progress or outcome, believe it should be treated
        as urgent, or want to know what other review options are available.
      </p>
      <ul>
        <li>
          Within 24 hours, we will explain our internal escalation/prioritisation
          process and tell you about your right to contact the TIO.
        </li>
        <li>
          If you ask us to escalate or prioritise the complaint, we will assess
          that request within 5 working days and apply the relevant escalation
          process where appropriate.
        </li>
        <li>
          An escalated complaint will be reviewed by an appropriately authorised
          person who was not solely responsible for the original decision where
          practicable.
        </li>
      </ul>

      <h3>9. Delays</h3>
      <p>
        If we reasonably believe we cannot meet the required resolution timeframe,
        we will tell you as soon as possible. We will explain the reason for the
        delay and when we expect the complaint to be resolved.
      </p>
      <p>
        If the expected delay is more than 10 working days beyond the required
        resolution timeframe, we will also give you the TIO contact details and
        explain your right to take the complaint to the TIO, unless an applicable
        exception applies (for example, a notified mass service outage or a delay
        caused by an action we are waiting for you to complete).
      </p>

      <h3>10. If we cannot contact you</h3>
      <p>
        Where we need to contact you to progress your complaint and cannot reach
        you, we will make at least 5 separate contact attempts on different
        calendar days within a period of no more than 10 calendar days.
      </p>
      <p>
        If those attempts are unsuccessful, we will write to you explaining how
        we tried to contact you and giving you at least 10 working days to
        contact us before we consider the complaint unable to progress because
        you are uncontactable.
      </p>

      <h3>11. Telecommunications Industry Ombudsman (TIO)</h3>
      <p>
        You should give JUSTmobile a reasonable opportunity to resolve your
        complaint first. However, you may contact the TIO at any time if you need
        independent assistance.
      </p>
      <p>
        If you are not satisfied with how we have handled your complaint, you
        have the right to take it to the Telecommunications Industry Ombudsman,
        which is a free and independent service.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
        <p className="mt-0">
          <strong>Phone:</strong> 1800 062 058<br />
          <strong>Website:</strong> <a href="https://www.tio.com.au" target="_blank" rel="noopener noreferrer">tio.com.au</a>
        </p>
      </div>
      <p>
        We will specifically provide TIO information when required, including
        where you are dissatisfied with complaint progress or timing, where a
        significant resolution delay is expected, or where a complaint remains
        unresolved for 30 calendar days and you have not already been given the
        TIO information directly.
      </p>

      <h3>12. Domestic, family and sexual violence</h3>
      <p>
        If you tell us you are experiencing domestic, family or sexual violence,
        we will take your safety, privacy, security and preferred communication
        method into account. Where a complaint involves a threat to your safety
        or your children's safety, we will treat it as an urgent complaint.
      </p>
      <p>
        We will not require you to provide unnecessary evidence of violence and
        will take reasonable steps to avoid communications or account actions
        that could create additional safety risks. Our separate Domestic, Family
        and Sexual Violence Support policy explains the additional assistance
        available.
      </p>

      <h3>13. Complaints about network outages</h3>
      <p>
        Complaints that arise from a notified network outage may be subject to
        additional outage-specific consumer protection requirements. JUSTmobile
        will identify and manage those complaints in accordance with the
        applicable telecommunications outage complaint rules, including any
        special communication, time, escalation or record-keeping requirements
        that apply.
      </p>

      <h3>14. Privacy and complaint records</h3>
      <p>
        We will handle personal information in accordance with applicable privacy
        laws and JUSTmobile's Privacy Policy. We maintain systematic records of
        complaints, including:
      </p>
      <ul>
        <li>your name and contact details (and those of a representative where applicable);</li>
        <li>a complaint reference or other unique identifier;</li>
        <li>the issues raised and relevant supporting information;</li>
        <li>the outcome or resolution sought;</li>
        <li>investigation findings and reasons for our proposed resolution;</li>
        <li>the proposed and agreed resolution and relevant due dates;</li>
        <li>your response to the proposed resolution;</li>
        <li>actions taken to implement the resolution; and</li>
        <li>relevant correspondence and communications.</li>
      </ul>

      <h3>15. Monitoring and continuous improvement</h3>
      <p>
        At least once every 3 months, JUSTmobile will classify and analyse
        complaint information to identify recurring or systemic issues. We will
        record and track actions taken to address identified problems and reduce
        the likelihood of recurrence.
      </p>
      <p>
        We will review this Complaints Handling Process at least annually and
        update it where regulatory, operational or service changes require.
      </p>

      <div className="bg-gray-100 rounded-lg p-6 mt-12 border border-gray-200">
        <h3 className="mt-0 text-gray-900">16. Contact JUSTmobile</h3>
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
            <dt className="font-semibold text-gray-700">Hours</dt>
            <dd className="text-gray-600 mt-1">
              Monday to Friday, 9:00am-5:00pm Sydney time (AEST/AEDT as
              applicable)
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
