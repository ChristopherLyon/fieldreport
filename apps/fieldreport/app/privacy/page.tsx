import Header from '@/components/header';
import Footer from '@/components/footer';
import MarkdownWrapper from '@/components/markdown-wrapper';

const markdown = `
# Privacy Policy

## 1. Introduction
FieldReport ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information about you when you use our website, products, and services ("Services").

## 2. Information We Collect
- **Personal Information:** We may collect personal information, such as your name, email address, phone number, and payment information when you create an account or use our Services.
- **Usage Information:** We collect information about your interactions with our Services, including IP address, browser type, operating system, pages visited, and the dates and times of your visits.

## 3. How We Use Information
We use the information we collect to:
- Provide, maintain, and improve our Services;
- Process transactions and send you related information, including purchase confirmations and invoices;
- Send you technical notices, updates, security alerts, and support messages;
- Communicate with you about products, services, offers, promotions, and events.

## 4. Sharing Information
We do not share your personal information with third parties except in the following circumstances:
- **With your consent:** We may share your information with third parties if you give us permission to do so.
- **For legal reasons:** We may disclose your information if we believe it is necessary to comply with a legal obligation, protect our rights, or prevent fraud or abuse of our Services.

## 5. Data Security
We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no data transmission over the internet or electronic storage system can be guaranteed to be 100% secure.

## 6. Your Choices
You may update or delete your account information at any time by logging into your account. You can also unsubscribe from our promotional emails by following the instructions in those emails.

## 7. Children's Privacy
Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.

## 8. Changes to This Privacy Policy
We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.

## 9. Contact Us
If you have any questions about this Privacy Policy, please contact us at support@fieldreport.ai.

**Effective Date:** January 1, 2024

`;

export default function TosPage() {
  return (
    <main className="h-screen font-raleway">
      <Header />
      <div className='pt-12 lg:pt-24'>
        <MarkdownWrapper markdown={markdown} />
      </div>
      <Footer />
    </main>
  );
}