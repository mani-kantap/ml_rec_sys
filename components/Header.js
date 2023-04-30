import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
              <Image src="/recs.svg" alt="Icon" width={40} height={40} />
          </Link>
          <span className="ml-2 font-bold text-xl">ML Paper Recommendations</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-800 font-medium">
            Home
          </Link>
          <Link href="/About" className="text-gray-600 hover:text-gray-800 font-medium">
            About
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
