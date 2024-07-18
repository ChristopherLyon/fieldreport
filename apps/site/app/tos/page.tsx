import Footer from "@/components/footer";
import Header from "@/components/header";
import MarkdownWrapper from "@/components/markdown-wrapper";

const markdown = `
# Terms of Service

## 1. Introduction
Welcome to FieldReport. These Terms of Service ("Terms") govern your use of our website, products, and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms.

## 2. Use of Services
You may use our Services only as permitted by these Terms and applicable laws. Do not misuse our Services. For example, do not interfere with our Services or try to access them using a method other than the interface and the instructions we provide.

## 3. Privacy
Your use of our Services is also subject to our Privacy Policy, which explains how we collect, use, and protect your information.

## 4. Accounts
You may need an account to use some of our Services. You are responsible for protecting your account and keeping your password confidential. You are also responsible for all activities that occur under your account.

## 5. Content
Our Services allow you to upload, store, and share content. You retain ownership of any intellectual property rights that you hold in that content. However, by uploading content to our Services, you give us a worldwide, royalty-free, sublicensable, and transferable license to use, host, store, reproduce, modify, create derivative works, communicate, publish, and distribute such content.

## 6. Modifications
We may modify these Terms or any additional terms that apply to a Service to reflect changes to the law or changes to our Services. You should look at the Terms regularly. We will post notice of modifications to these Terms on this page. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted.

## 7. Termination
We may suspend or terminate your access to our Services if you do not comply with these Terms, or if we are investigating suspected misconduct. We may also terminate your access to our Services at our sole discretion.

## 8. Disclaimers and Limitation of Liability
Our Services are provided "as is" without warranty of any kind. We do not guarantee that the Services will be secure or available at any particular time or location. We will not be liable for any damages arising from the use or inability to use our Services.

## 9. Governing Law
These Terms are governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law principles.

## 10. Contact Us
If you have any questions about these Terms, please contact us at support@fieldreport.ai.

**Effective Date:** January 1, 2024
`;

export default function TosPage() {
	return (
		<main className="h-screen font-raleway">
			<Header />
			<div className="pt-12 lg:pt-24">
				<MarkdownWrapper markdown={markdown} />
			</div>
			<Footer />
		</main>
	);
}
