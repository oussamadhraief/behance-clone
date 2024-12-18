import { Link } from 'react-router-dom'

const footerLinks = {
  'Built For Creators': [
    'Try Behance Pro',
    'Find Inspiration',
    'Get Hired',
    'Sell Creative Assets',
  ],
  'Find Talent': [
    'Post a Job',
    'Graphic Designers',
    'Photographers',
    'Web Designers',
  ],
  'Behance': [
    'About Behance',
    'Careers',
    'Help Center',
    'Contact Us',
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold">
              Behance
            </Link>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-gray-400 hover:text-white text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

