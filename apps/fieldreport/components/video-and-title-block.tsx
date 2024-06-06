import { AudioLines } from 'lucide-react';

export default function VideoAndTitleBlock({
  videoUrl,
  title,
  focus,
}: {
  videoUrl: string;
  title: string;
  focus: 'left' | 'middle' | 'right';
}) {
  // Map the focus prop to corresponding Tailwind CSS classes
  const focusClasses = {
    left: 'object-left',
    middle: 'object-center',
    right: 'object-right',
  };

  return (
    <div className="relative h-screen overflow-hidden font-raleway">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        <div className="relative h-full aspect-square">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disableRemotePlayback
            className={`absolute top-0 left-0 w-full h-full object-cover ${focusClasses[focus]}`}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="relative flex items-center justify-center h-full z-10 px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
          <h1 className="text-6xl tracking-tight text-gray-100 sm:text-6xl font-raleway">
            {title}
          </h1>
        </div>
      </div>
      <AudioLines className="h-10 w-auto absolute bottom-10 right-10 z-10" />
    </div>
  );
}
