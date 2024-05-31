import Footer from '@/components/frontend/footer';
import Header from '@/components/frontend/header';
import HeroSection from '@/components/frontend/hero-section'
import ProductFeatures from '@/components/frontend/product-features';
import VideoAndTitleBlock from '@/components/frontend/video-and-title-block';
import UserStory from '@/components/frontend/user-stories';
import { LoginFloater } from '@/components/login-floater';
import Agriculture from '@/public/images/agriculture.jpg';
import Telecom from '@/public/images/telecom.jpeg';
import OnTheGo from '@/public/images/on-the-go.jpg';
import AtTheBase from '@/public/images/at-the-base.jpg';
import MacBookMockup from '@/public/images/macbook-mockup.jpeg';
import IpadMockup from '@/public/images/ipad-mockup.jpeg';
import HardwarePrototype from '@/public/images/hardware-prototype.png';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen font-raleway">
      <Header />
      <LoginFloater />
      <HeroSection />
      <ProductFeatures />
      <VideoAndTitleBlock videoUrl="/videos/solar-farm.mov" title="Built for the people who build our future." />
      <section id="industries" aria-label="Key Industries">
        <UserStory
          sectionTitle='Key Industries'
          userStories={[
            {
              name: 'Agriculture',
              description: 'Monitor environmental conditions and manage field activities.',
              userStory: 'A farmer uses the FieldReport app to record soil moisture levels by speaking into their smartwatch. The AI converts the input into a detailed report, providing actionable insights into irrigation needs. The system categorizes the data, summarizes key points, and suggests optimal irrigation schedules, helping farmers make informed decisions quickly and efficiently.',
              src: Agriculture,
            },
            {
              name: 'Telecommunications',
              description: 'Improve network performance and reduce maintenance costs.',
              userStory: 'A telecom climber, equipped with heavy gear, uses their smartwatch to report rust and missing bolts on a cell tower with a single button press. The AI instantly processes the report, generates a maintenance schedule, and informs the safety compliance team. The system compiles weekly reports of multiple towers needing attention, streamlining maintenance and enhancing network reliability and safety.',
              src: Telecom,
            }
          ]} />
      </section>

      <VideoAndTitleBlock videoUrl="/videos/office.mp4" title="Effortlessly manage millions of moving parts." />
      {/* This user story block focuses on that FieldReport is with you on the go, in the field, har from home - as well as at base, in the office. Both sides of the reporting structure  */}
      <section id="use-cases" aria-label="Use Cases">
        <UserStory
          sectionTitle='Use Cases'
          userStories={[
            {
              name: 'On the Go',
              description: 'Record and report issues while on the move.',
              userStory: 'A truck driver is on a long haul across mountainous terrain, using the FieldReport app on their tablet. They encounter a road hazard and promptly use the app to report it. The AI processes the report, categorizes the issue, and alerts the logistics team. The system generates daily summaries of reported hazards, enabling the team to take immediate actions to ensure the safety and efficiency of the deliveries.',
              src: OnTheGo,
            },
            {
              name: 'At the Base',
              description: 'Manage and track logistics operations from the office.',
              userStory: 'A logistics manager uses the FieldReport web app to monitor the status of various truck routes. The AI compiles real-time reports from drivers, categorizes issues, and generates a daily summary of all logistics activities. The system provides live updates on delivery statuses, enabling the manager to make informed decisions, reroute drivers if necessary, and ensure timely deliveries.',
              src: AtTheBase,
            }
          ]} />
      </section>
      {/* This user story block focuses on that FieldReport is with you on the go, in the field, har from home - as well as at base, in the office. Both sides of the reporting structure  */}
      <section id="ecosystem" aria-label="Ecosystem">
        <UserStory
          sectionTitle="Ecosystem"

          userStories={[
            {
              name: 'Desktop [Web & Native]',
              description: 'Access the full suite of features from your computer, both via the web app and the desktop app.',
              userStory: 'A powerful desktop app that provides a comprehensive overview of all your projects, tasks, and reports. The AI processes data from multiple sources, categorizes issues, and generates detailed reports. The system provides real-time updates on project statuses, enabling you to make informed decisions and take immediate actions to ensure project success.',
              src: MacBookMockup,
            },
            {
              name: 'Mobile [iOS & Android]',
              description: 'Stay connected and informed on the go with the FieldReport mobile app, available on iOS and Android.',
              userStory: 'Mobile first design, with a focus on usability and accessibility. Access FieldReport on the go, in the field, and at the base. The AI processes data from multiple sources, categorizes issues, and generates detailed reports. The system provides real-time updates on project statuses, enabling you to make informed decisions and take immediate actions to ensure project success.',
              src: IpadMockup,
            },
            {
              name: 'Intercom [Hardware Prototype]',
              description: 'Introducing the FieldReport capacitive touch intercom puck, a sleek and modern device designed for seamless desk integration.',
              userStory: 'A desktop intercom device with capacitive touch functionality. Touch and hold the device to talk and transcribe to FieldReport AI. Release the touch to send your request. Double-tap to open open-mic mode for longer conversations, then tap twice to cancel or tap once to send and close open-mic mode. The device ensures you stay connected and can send immediate updates and queries to FieldReport from your desk.',
              src: HardwarePrototype,
            }
          ]}
        />
      </section>
      <Footer />
    </main>
  );
}
