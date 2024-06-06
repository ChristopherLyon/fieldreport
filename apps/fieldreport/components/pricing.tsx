import { Check } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import Link from 'next/link';

type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  mostPopular: boolean;
  active?: boolean;
  buttonText?: string;
  buttonHref: string;
};

const tiers: Tier[] = [
  {
    name: 'Personal',
    id: 'personal',
    href: '#',
    priceMonthly: '$19.99',
    description:
      'Ideal for individuals looking to enhance productivity with AI-driven tools.',
    mostPopular: true,
    features: [
      'AI Voice-to-Text',
      'Automatic Tasks',
      'Curated Learning',
      'AI Summarization',
    ],
    active: true,
    buttonText: 'Get started',
    buttonHref: 'https://app.fieldreport.ai/auth/signin' as string,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: '#',
    priceMonthly: '$49.99',
    description:
      'Comprehensive solution for teams with advanced features like geotagging and hierarchical reporting.',
    mostPopular: false,
    features: [
      'AI Voice-to-Text',
      'Automatic Tasks',
      'Curated Learning',
      'AI Summarization',
      'Geolocation',
      'Hierarchical Reporting',
      'Team Members: Up to 20 users',
    ],
    active: false,
    buttonText: 'Comming soon',
    buttonHref: 'https://app.fieldreport.ai/auth/signin' as string,
  },
];

export default function Pricing({
  customerType,
  setCustomerType,
}: {
  customerType: string;
  setCustomerType: any;
}) {
  return (
    <div className="border- border-r border-l border-dashed  py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl tracking-tight sm:text-4xl">
            Simple no-tricks pricing
          </h2>
          <p className="mt-6 text-lg leading-8">
            Enhance productivity and streamline operations with our AI-driven
            solutions. Choose the plan that fits your needs.
          </p>
        </div>
        <div className="md:flex  mt-6">
          <Tabs
            defaultValue="personal"
            className="mx-auto"
            onValueChange={setCustomerType}
            value={customerType}
          >
            <TabsList>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl tracking-tight">
              {customerType === 'personal'
                ? 'Personal Plan'
                : 'Enterprise Plan'}
            </h3>
            <p className="mt-6 text-base leading-7">
              {tiers.find((tier) => tier.id === customerType)?.description}
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm leading-6">What’s included</h4>
              <div className="h-px flex-auto bg-muted" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
            >
              {tiers
                .find((tier) => tier.id === customerType)
                ?.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-muted/20 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base">Month</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl tracking-tight">
                    {
                      tiers.find((tier) => tier.id === customerType)
                        ?.priceMonthly
                    }
                  </span>
                  <span className="text-sm leading-6 tracking-wide">USD</span>
                </p>
                <Link href="https://app.fieldreport.ai/auth/signin">
                  <Button
                    className="mt-10"
                    disabled={
                      !tiers.find((tier) => tier.id === customerType)?.active
                    }
                  >
                    {tiers.find((tier) => tier.id === customerType)?.buttonText}
                  </Button>
                </Link>
                <p className="mt-6 text-xs leading-5 text-foreground/40">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
