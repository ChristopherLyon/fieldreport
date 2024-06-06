import { ArrowRight } from "lucide-react";

export default function OurMission() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      <span className="text-5xl hidden md:block ">Our Mission <ArrowRight className="h-8 w-8 inline"/></span>
      <span className="text-7xl text-right">Drop dead simplicity.</span>
    </div>
  );
}
