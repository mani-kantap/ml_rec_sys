// Header.js
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
        <div>
          <Link href="/About" className="text-gray-600 hover:text-gray-800">
              About
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
