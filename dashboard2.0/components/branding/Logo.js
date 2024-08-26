import Link from 'next/link'

function Logo() {
	return (
		<Link href="/home">
			<img className="logo" src="/Based_Agent_logo_small.png" alt="Based Agent Logo"/>
		</Link>
	)
}

export default Logo
