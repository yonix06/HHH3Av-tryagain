'use client'
import { LandingCTA } from '@/designSystem/landing/LandingCTA'
import { LandingContainer } from '@/designSystem/landing/LandingContainer'
import LandingFAQ from '@/designSystem/landing/LandingFAQ'
import { LandingFeatures } from '@/designSystem/landing/LandingFeatures'
import { LandingHero } from '@/designSystem/landing/LandingHero'
import { LandingHowItWorks } from '@/designSystem/landing/LandingHowItWorks'
import { LandingPainPoints } from '@/designSystem/landing/LandingPainPoints'
import { LandingPricing } from '@/designSystem/landing/LandingPricing'
import { LandingSocialProof } from '@/designSystem/landing/LandingSocialProof'
import { LandingSocialRating } from '@/designSystem/landing/LandingSocialRating'
import { LandingTestimonials } from '@/designSystem/landing/LandingTestimonials'
import {
  EditOutlined,
  FileSearchOutlined,
  SafetyOutlined,
  GlobalOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons'

export default function LandingPage() {
  const features = [
    {
      heading: `Streamlined Document Creation`,
      description: `Create and manage official documents with ease, saving precious time for what truly matters.`,
      icon: <EditOutlined />,
    },
    {
      heading: `Intelligent Search & Retrieval`,
      description: `Find any document in seconds, not hours. Our smart search puts information at your fingertips.`,
      icon: <FileSearchOutlined />,
    },
    {
      heading: `GDPR Compliant Security`,
      description: `Rest easy knowing your sensitive data is protected with state-of-the-art security measures.`,
      icon: <SafetyOutlined />,
    },
    {
      heading: `Interactive Cartography`,
      description: `Visualize municipal decisions on Google Maps, bringing spatial context to your governance.`,
      icon: <GlobalOutlined />,
    },
    {
      heading: `Role-Based Access Control`,
      description: `Ensure the right people have the right access with our intuitive permission system.`,
      icon: <TeamOutlined />,
    },
    {
      heading: `Insightful Analytics`,
      description: `Gain valuable insights into your document workflows and optimize your municipal operations.`,
      icon: <BarChartOutlined />,
    },
  ]

  const testimonials = [
    {
      name: `Mayor Sarah Johnson`,
      designation: `City of Oakville`,
      content: `This system has revolutionized how we manage documents. We've cut our document processing time by 50% and improved transparency significantly.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `John Smith`,
      designation: `City Clerk, Maplewood`,
      content: `The cartography feature is a game-changer. It's made our urban planning meetings so much more productive and engaging.`,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      name: `Emily Chen`,
      designation: `IT Director, Riverside Municipality`,
      content: `Implementation was smooth, and the system's flexibility allows us to adapt it to our specific needs. It's truly a solution built for local governments.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
    {
      name: `Michael Brown`,
      designation: `Administrative Officer, Sunnyville`,
      content: `The time we save on document management is now spent on actually serving our citizens. It's made a real difference in our community.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: `Lisa Taylor`,
      designation: `Mayor's Assistant, Hillsborough`,
      content: `The version control and changelog features have improved our accountability. We can now trace every decision with ease.`,
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      name: `David Lee`,
      designation: `City Council Member, Brookside`,
      content: `As someone who's not tech-savvy, I appreciate how user-friendly this system is. It's made my job so much easier.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Essential`,
      description: `Perfect for small municipalities`,
      monthly: 299,
      yearly: 3299,
      features: [
        `Up to 10,000 documents`,
        `Basic cartography`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `Ideal for medium-sized cities`,
      monthly: 599,
      yearly: 6599,
      features: [
        `Up to 50,000 documents`,
        `Advanced cartography`,
        `Priority support`,
        `Custom integrations`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `For large metropolitan areas`,
      monthly: 999,
      yearly: 10999,
      features: [
        `Unlimited documents`,
        `Full-feature set`,
        `24/7 dedicated support`,
        `On-premise option`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How secure is the document management system?`,
      answer: `Our system is built with security as a top priority. We use industry-standard encryption, regular security audits, and are fully GDPR compliant to ensure your sensitive municipal data is always protected.`,
    },
    {
      question: `Can we integrate this with our existing systems?`,
      answer: `Absolutely! Our system is designed to be flexible and can integrate with a wide range of existing municipal software. Our team will work with you to ensure smooth integration and data migration.`,
    },
    {
      question: `How long does implementation typically take?`,
      answer: `Implementation time varies depending on the size of your municipality and the complexity of your needs. However, most of our clients are up and running within 4-6 weeks, including training and data migration.`,
    },
    {
      question: `Do you offer training for our staff?`,
      answer: `Yes, we provide comprehensive training as part of our implementation process. This includes both online and on-site options, as well as ongoing support to ensure your team can make the most of our system.`,
    },
  ]

  const logos = [
    { url: 'https://i.imgur.com/afwBIFK.png' },
    { url: 'https://i.imgur.com/LlloOPa.png' },
    { url: 'https://i.imgur.com/j8jPb4H.png' },
    { url: 'https://i.imgur.com/mJ1sZFv.png' },
  ]

  const steps = [
    {
      heading: `Sign Up`,
      description: `Create your account and tell us about your municipality's needs.`,
    },
    {
      heading: `Customize`,
      description: `We'll tailor the system to fit your specific requirements and workflows.`,
    },
    {
      heading: `Migrate`,
      description: `We'll securely transfer your existing documents into the new system.`,
    },
    {
      heading: `Transform`,
      description: `Watch as your document management becomes effortless and efficient.`,
    },
  ]

  const painPoints = [
    {
      emoji: `🕵️`,
      title: `Endless hours spent searching for documents`,
    },
    {
      emoji: `🗄️`,
      title: `Overwhelmed by paper files and disorganized digital storage`,
    },
    {
      emoji: `😓`,
      title: `Stress from compliance risks and data security concerns`,
    },
  ]

  const avatarItems = [
    {
      src: 'https://randomuser.me/api/portraits/men/51.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/9.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    {
      src: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Empower Your Municipality with Seamless Document Management`}
        subtitle={`Transform your local government's efficiency and transparency with our cutting-edge document management system. Say goodbye to paperwork chaos and hello to streamlined governance.`}
        buttonText={`Start Your Transformation`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/HHH3Av-tryagain-TV0M`}
        socialProof={
          <LandingSocialRating
            avatarItems={avatarItems}
            numberOfUsers={1000}
            suffixText={`from satisfied municipalities`}
          />
        }
      />
      <LandingSocialProof
        logos={logos}
        title={`Trusted by Leading Local Governments`}
      />
      <LandingPainPoints
        title={`The Hidden Costs of Inefficient Document Management: 19% of Government Time Wasted`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Journey to Effortless Municipal Document Management`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Unlock the Full Potential of Your Municipal Operations`}
        subtitle={`Our comprehensive suite of features is designed to address every aspect of local government document management, ensuring efficiency, compliance, and citizen satisfaction.`}
        features={features}
      />
      <LandingTestimonials
        title={`Success Stories from Municipalities Like Yours`}
        subtitle={`Discover how local governments across the country have transformed their operations with our document management system.`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Efficiency, Transparency, and Better Governance`}
        subtitle={`Choose the plan that best fits your municipality's size and needs. All plans include our core features, regular updates, and dedicated support.`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Your Questions, Answered`}
        subtitle={`We're here to help you make the best decision for your municipality. If you don't see your question here, please don't hesitate to contact us.`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Revolutionize Your Municipal Document Management?`}
        subtitle={`Join the growing number of local governments that are saving time, reducing stress, and serving their citizens better. Your efficient future starts here.`}
        buttonText={`Get Started Now`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
