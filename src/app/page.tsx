import { Heading } from "./components/UIComponents/Heading";
import Small from "./components/AppComponents/Small";

import Hero from "./components/AppComponents/Hero";
import HowItWorks from "./components/AppComponents/Works";
import Banner from "./components/AppComponents/Banner";
export default function Home() {
  return (
    <div className="">
      <Hero
        title="Welcome to Australia's first AI-powered eSIM provider."
        description="Experience seamless connectivity with our AI-powered eSIM technology. Get instant access to mobile data in over 200+ countries with just a few taps."
        ctaText="Get Your eSIM"
        userCount="2M+ People has joined us"
        imageSrc="/images/hero-phone.png"
      />
      <HowItWorks
        title="How It Works"
        circleImage="/images/bg.png" // Add your circle background image
        screenImage="/images/bannerscreen.png" // Add your app screen image
        steps={[
          {
            number: "1",
            title: "Choose Your Plan",
          },
          {
            number: "2",
            title: "Keep your old number or pick a new one",
          },
          {
            number: "3",
            title: "Check your email for the QR code to click",
          },
          {
            number: "4",
            title: "Your phone will do the rest",
          }
        ]}
      />
      <Small />
      <Banner
        title="JUSTmobile uses the Telstra Wholesale Mobile Network."
        ctaText="Get Started"
        appStoreLink="https://apps.apple.com/au/app/just-mobile/id1234567890" // Replace with your actual App Store link
        googlePlayLink="https://play.google.com/store/apps/details?id=com.justmobile.app" // Replace with your actual Google Play link
      />
    </div>
  );
}
