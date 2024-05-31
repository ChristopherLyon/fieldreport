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
import Logistics from '@/public/images/logistics.jpg';
import Warehouse from '@/public/images/signin-page.png';

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
              userStory: 'A farmer uses the FieldReport app to record soil moisture levels by speaking into their smartwatch. The AI assistant converts the input into a structured report, providing a summary of key points and actionable insights into irrigation needs. It suggests optimal irrigation schedules and tags the data with relevant keywords, helping farmers make informed decisions quickly and efficiently.',
              src: Agriculture,
            },
            {
              name: 'Telecommunications',
              description: 'Improve network performance and reduce maintenance costs.',
              userStory: 'A telecom worker, equipped with heavy gear, uses their smartwatch to report rust and missing bolts on a cell tower with a single button press. The AI assistant instantly processes the input, generating a maintenance schedule and informing the safety compliance team. The AI compiles weekly reports of multiple towers needing attention, providing summaries and prioritizing tasks, thus streamlining maintenance and enhancing network reliability and safety.',
              src: Telecom,
            },
            {
              name: 'Logistics',
              description: 'Optimize delivery routes and manage shipment statuses.',
              userStory: 'A logistics manager uses the FieldReport app to record delivery issues by speaking into their smartwatch. The AI assistant parses the input and generates structured, categorized reports, providing summaries and actionable insights for route optimization. It tags the data with relevant keywords and suggests improvements, helping managers make quick and efficient decisions to ensure timely deliveries.',
              src: Logistics,
            },
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
            },
            {
              name: 'In the Warehouse',
              description: 'Streamline inventory management and operations within the warehouse.',
              userStory: 'A warehouse manager uses the FieldReport app on their tablet to scan and update inventory levels. The AI assistant processes the data, categorizes inventory, and provides real-time updates on stock levels. The system generates daily reports highlighting low-stock items and suggesting reorder points. This helps the manager make informed decisions quickly, ensuring that inventory levels are optimized and operations run smoothly.',
              src: Warehouse, // Adjust the path as needed
            },
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
