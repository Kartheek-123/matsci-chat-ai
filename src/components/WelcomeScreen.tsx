
import React from 'react';
import { Atom, Beaker, Zap, Microscope } from 'lucide-react';

const sampleQueries = [
  {
    icon: Beaker,
    title: "Material Properties",
    query: "What are the mechanical properties of titanium alloys?",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Zap,
    title: "Electronic Materials",
    query: "Explain the band structure of semiconductors",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Microscope,
    title: "Characterization",
    query: "How does X-ray diffraction work for crystal structure analysis?",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Atom,
    title: "Nanomaterials",
    query: "What are the unique properties of carbon nanotubes?",
    color: "from-orange-500 to-orange-600"
  }
];

export const WelcomeScreen = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* Welcome Header */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-2xl inline-block">
            <Atom className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to MaterialScienceGPT
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your AI assistant for material science questions, research, and analysis. 
          Ask about properties, synthesis, characterization, and applications of materials.
        </p>
      </div>

      {/* Sample Queries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {sampleQueries.map((item, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className={`bg-gradient-to-r ${item.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.query}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          What I Can Help With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 p-3 rounded-lg inline-block mb-3">
              <Beaker className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Material Properties</h3>
            <p className="text-sm text-gray-600">
              Mechanical, thermal, electrical, and optical properties
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 p-3 rounded-lg inline-block mb-3">
              <Microscope className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Characterization</h3>
            <p className="text-sm text-gray-600">
              Analysis techniques and interpretation methods
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 p-3 rounded-lg inline-block mb-3">
              <Atom className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Synthesis & Processing</h3>
            <p className="text-sm text-gray-600">
              Manufacturing methods and processing techniques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
