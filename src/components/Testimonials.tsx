import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "Materials Researcher at MIT",
    avatar: "SC",
    content: "MaterialScienceGPT has revolutionized how we approach materials research. The AI insights are incredibly accurate and save us hours of literature review.",
    rating: 5
  },
  {
    name: "Prof. Michael Rodriguez",
    role: "Chemical Engineering, Stanford",
    avatar: "MR", 
    content: "This tool has become indispensable for my graduate students. It provides expert-level guidance on complex materials science concepts.",
    rating: 5
  },
  {
    name: "Dr. Lisa Park",
    role: "R&D Director, NanoTech Corp",
    avatar: "LP",
    content: "The ability to get instant answers about material properties and synthesis routes has accelerated our product development timeline significantly.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="container mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Trusted by researchers worldwide
        </h2>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          See what materials scientists are saying about MaterialScienceGPT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;