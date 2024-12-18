import { Button } from '@/components/ui/button'
import React from 'react'

export default function Hero() {
  return (
    <div>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
          The World's Best Creators Are On Behance
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          A comprehensive platform to help hirers and creators navigate the creative world from discovering inspiration, to connecting with one another
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="secondary">Hire a Freelancer</Button>
          <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white">Try Behance Pro</Button>
        </div>
      </div>
    </div>
    </div>
  )
}
