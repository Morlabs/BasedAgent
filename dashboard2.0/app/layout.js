import {Inter} from "next/font/google";
import "./globals.css";

const inter = Inter({subsets: ["latin"]});
import SessionWrapper from '@/components/common/SessionWrapper'
import {AppKit} from '@/context/web3modal'

export const metadata = {
	title: "Based Agent",
	description: "Based Agent",
};

export default function RootLayout({children}) {
	return (
		<SessionWrapper>
			<AppKit>
				<html lang="en">
				<body className={inter.className}>{children}</body>
				</html>
			</AppKit>
		</SessionWrapper>
	);
}
