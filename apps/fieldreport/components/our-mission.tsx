import { ArrowDown, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function OurMission() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      <span className="text-5xl hidden md:block ">
        Our Mission <ArrowRight className="h-8 w-8 inline" />
      </span>
      <div className="flex flex-col items-end">
        <span className="text-7xl text-right">Drop dead simplicity.</span>

        <div className="flex-col items-center pr-20 hidden md:flex">
          <ArrowDown className="h-8 w-8 translate-y-20" />
          <Input className="translate-y-40 w-52" placeholder='Missing M16 bolt on Tower 2...' />
        </div>
      </div>
    </div>
  );
}
