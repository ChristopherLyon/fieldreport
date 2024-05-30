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


export default function Home() {
  return (
    <main className="h-screen font-raleway">
      <Header />
      <LoginFloater />
      <HeroSection />
      <ProductFeatures />
      <VideoAndTitleBlock videoUrl="/videos/solar-farm.mov" title="Built for the people who build our future." />
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
      <Footer />
    </main>
  );
}
