
import React from 'react';
import { motion } from 'framer-motion';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Bot, MessageSquare, FileText, Sparkles, ArrowRight, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PPTGenerator } from '@/components/PPTGenerator';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Conversations",
      description: "Advanced AI that understands context and provides intelligent responses to your queries.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload PDFs and images for comprehensive analysis and get detailed insights instantly.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: MessageSquare,
      title: "Smart Presentations",
      description: "Generate professional PowerPoint presentations from simple text prompts with AI magic.",
      gradient: "from-green-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Collaborative Sharing",
      description: "Share your generated presentations with teams through secure, shareable links.",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  MaterialScienceGPT
                </h1>
                <p className="text-xs text-muted-foreground">AI-Powered Assistant</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-primary to-purple-600 text-white hover:opacity-90">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button 
                  onClick={() => navigate('/chat')} 
                  variant="outline"
                  className="mr-2"
                >
                  Go to Chat
                </Button>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 -skew-y-1 transform origin-top-left"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Platform</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent mb-8"
          >
            Chat. Analyze.
            <br />
            Create.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The ultimate AI assistant for material science research. Chat with advanced AI, 
            analyze documents, and generate professional presentations - all in one powerful platform.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={() => navigate('/chat')} 
              size="lg" 
              className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Chatting
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-6 text-lg rounded-xl border-2 hover:bg-muted/50 transition-all duration-300"
                >
                  Sign Up Free
                </Button>
              </SignUpButton>
            </SignedOut>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to enhance your research and productivity.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:shadow-xl transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PPT Generator Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              AI Presentation Generator
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your ideas into professional presentations instantly with our AI-powered generator.
            </p>
          </motion.div>
          
          <PPTGenerator />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-purple-500/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Our Platform?
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Enterprise-grade security ensures your data is protected and your research remains confidential."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get instant responses and generate presentations in seconds with our optimized AI infrastructure."
              },
              {
                icon: Users,
                title: "Collaboration Ready",
                description: "Share your work seamlessly with teams and colleagues through secure sharing links."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-8"
              >
                <div className="bg-gradient-to-r from-primary to-purple-600 p-4 rounded-full inline-block mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of researchers and professionals using our AI platform to accelerate their work.
            </p>
            <SignedOut>
              <SignUpButton mode="modal">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button 
                onClick={() => navigate('/chat')} 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Continue to Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </SignedIn>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-primary to-purple-600 p-2 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">MaterialScienceGPT</h3>
                <p className="text-sm text-muted-foreground">AI-powered research platform</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">© 2024 MaterialScienceGPT. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
