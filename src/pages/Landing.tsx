
import React from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Atom, Beaker, Zap, Microscope, ArrowRight, Shield, Database, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Beaker,
      title: "Advanced Material Analysis",
      description: "Get detailed insights into material properties, compositions, and behaviors using AI-powered analysis.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Zap,
      title: "Real-time Responses",
      description: "Instant answers to your material science questions with comprehensive explanations and examples.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Microscope,
      title: "Research Assistance",
      description: "Comprehensive support for characterization techniques, synthesis methods, and property analysis.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Database,
      title: "Chat History",
      description: "Access your previous conversations and build upon past research discussions seamlessly.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your research data is protected with enterprise-grade security."
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Leveraging OpenAI's latest models for accurate material science insights."
    },
    {
      icon: Database,
      title: "Persistent Memory",
      description: "Your chat history is saved and accessible across all devices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MaterialScienceGPT</h1>
                <p className="text-xs text-gray-500">AI Assistant for Material Science</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Get Started</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button onClick={() => navigate('/chat')} className="mr-2">
                  Go to Chat
                </Button>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 rounded-3xl inline-block mb-6">
              <Atom className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your AI Assistant for
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Material Science</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Get instant, accurate answers to your material science questions. From properties and synthesis 
            to characterization and applications - MaterialScienceGPT is your research companion powered by advanced AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/chat')} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
            >
              Try Chat Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Sign Up for Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button 
                onClick={() => navigate('/chat')} 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg"
              >
                Continue to Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Material Scientists
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to accelerate your material science research and understanding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-lg inline-block mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose MaterialScienceGPT?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-8">
                <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join researchers worldwide who are using MaterialScienceGPT to advance their work.
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button 
              onClick={() => navigate('/chat')} 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Continue to Chat
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">MaterialScienceGPT</h3>
                <p className="text-sm text-gray-400">AI-powered material science research</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 MaterialScienceGPT. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
