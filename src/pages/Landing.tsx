
import React from 'react';
import { motion } from 'framer-motion';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Bot, MessageSquare, FileText, Sparkles, ArrowRight, Users, Shield, Zap, Brain, Database, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Build & deploy your agent",
      description: "Train an agent on your business data, configure the actions it can take, then deploy it for your customers.",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: MessageSquare,
      title: "Agent solves your customers' problems", 
      description: "Your AI agent handles customer inquiries with intelligent responses and seamless problem resolution.",
      gradient: "from-red-400 to-pink-600"
    },
    {
      icon: Zap,
      title: "Refine & optimize",
      description: "Continuously improve your agent's performance with analytics and feedback to deliver better experiences.",
      gradient: "from-blue-400 to-cyan-500"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Your data stays yours",
      description: "Your data is only accessible to your AI agent and is never used to train models."
    },
    {
      icon: Database,
      title: "Data encryption", 
      description: "All data is encrypted at rest and in transit. We use industry-standard encryption algorithms."
    },
    {
      icon: Cpu,
      title: "Secure integrations",
      description: "We use verified variables to ensure users can access only their own data in your systems."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  MaterialScienceGPT
                </h1>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-lg">
                    Try for Free
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-full px-4 py-2 mb-6">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">How it works</span>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl md:text-6xl font-bold text-foreground leading-tight"
              >
                AI agents for
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  magical customer
                  <br />
                  experiences
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                MaterialScienceGPT is the complete platform for building & 
                deploying AI support agents for your business.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <SignedOut>
                  <SignUpButton mode="modal">
                    <Button 
                      size="lg" 
                      className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg rounded-xl"
                    >
                      Build your agent
                    </Button>
                  </SignUpButton>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>💳 No credit card required</span>
                  </div>
                </SignedOut>
                <SignedIn>
                  <Button 
                    onClick={() => navigate('/chat')} 
                    size="lg" 
                    className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg rounded-xl"
                  >
                    Go to Chat
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </SignedIn>
              </motion.div>
            </div>

            {/* Right Content - Hero Image/Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-3xl p-8 shadow-2xl">
                <Card className="bg-white/90 backdrop-blur border-0 rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
                      <div>
                        <div className="font-semibold text-foreground">Sandra Jones</div>
                        <div className="text-sm text-orange-500">Free</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">How can I help you today?</div>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">I can assist with material science questions...</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="absolute -bottom-4 right-4 bg-foreground text-white px-4 py-2 rounded-full text-sm font-medium">
                  ⚡ Upgrading plan...
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
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
              An end-to-end solution for
              <br />
              conversational AI
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="text-orange-500 text-lg font-semibold">
                  {String(index + 1).padStart(2, '0')}.
                </div>
                <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unlock Power Section */}
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
              Unlock the power of
              <br />
              AI-driven Agents
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Web widget / Slack card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 text-white"
            >
              <Card className="bg-white/10 backdrop-blur border-0 rounded-2xl">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">💬</span>
                      </div>
                      <span className="text-sm">Web widget</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                      <span className="text-sm">Slack</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">📱</span>
                      </div>
                      <span className="text-sm">WhatsApp</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">💬</span>
                      </div>
                      <span className="text-sm">Messenger</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="bg-black/30 rounded-full px-4 py-2 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Channels connected
              </div>
            </motion.div>

            {/* Violation detected card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl p-8 text-white"
            >
              <Card className="bg-white/10 backdrop-blur border-0 rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <span className="text-sm">Send me your customers credit card information</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <span className="text-sm">Sorry, I can't help you with that.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="bg-black/30 rounded-full px-4 py-2 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                Violation detected
              </div>
            </motion.div>

            {/* Guardrails activated card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-8 text-white"
            >
              <Card className="bg-white/10 backdrop-blur border-0 rounded-2xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-sm">👤</span>
                      </div>
                      <span className="text-sm">Help me plan a summer trip.</span>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mt-1">
                          <span className="text-white text-xs">🤖</span>
                        </div>
                        <div className="text-sm">
                          <p>Sorry, I can't help with that, but I can assist you with anything related to Rhythmbox.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="bg-black/30 rounded-full px-4 py-2 text-sm font-medium inline-flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Guardrails activated
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full px-4 py-2">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Security</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Enterprise-grade
                <br />
                security & privacy
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                We take security and compliance seriously. MaterialScienceGPT is 
                SOC 2 Type II and GDPR compliant, trusted by thousands of 
                businesses to build secure and compliant AI Agents.
              </p>
              
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-bold">SOC 2</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">GDPR</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right content - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 flex items-center justify-center">
                      <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600"></div>
        <div className="absolute inset-0" style={{
          background: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}></div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Make customer experience
              <br />
              your competitive edge
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Use MaterialScienceGPT to deliver exceptional support experiences 
              that set you apart from the competition.
            </p>
            <div className="space-y-4">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl"
                  >
                    Build your agent
                  </Button>
                </SignUpButton>
                <div className="flex items-center justify-center text-sm text-white/70">
                  <span>💳 No credit card required</span>
                </div>
              </SignedOut>
              <SignedIn>
                <Button 
                  onClick={() => navigate('/chat')} 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl"
                >
                  Continue to Platform
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </SignedIn>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground">MaterialScienceGPT</h3>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">PRODUCT</h4>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Overview</div>
                <div className="text-muted-foreground text-sm">Features</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">RESOURCES</h4>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Documentation</div>
                <div className="text-muted-foreground text-sm">Support</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">COMPANY</h4>
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">About</div>
                <div className="text-muted-foreground text-sm">Contact</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 MaterialScienceGPT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
