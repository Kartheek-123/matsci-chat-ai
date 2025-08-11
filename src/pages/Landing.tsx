import React from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowRight, ChevronDown, Database, FileText, History, Lock, MessageCircle, Plus, Sparkles, Brain, Boxes, CreditCard } from 'lucide-react';
import HeroVideo from '@/components/HeroVideo';
import QAVideo from '@/components/QAVideo';
import GeneratedHeroText from '@/components/GeneratedHeroText';
import Testimonials from '@/components/Testimonials';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      {/* Screen 1 */}
      <HeroSection />

      {/* Screen 2 */}
      <SectionWrapper>
        <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-center">
          What MaterialScienceGPT Delivers
        </h2>
        <p className="mt-3 text-center text-muted-foreground max-w-2xl mx-auto">
          Ask, analyze, and accelerate your materials research with your AI assistant.
        </p>
        <div className="mt-10">
          <FeaturePanels />
        </div>
      </SectionWrapper>

      {/* Screen 3 */}
      <SecuritySection />

      {/* Screen 4 — Why people choose MSGPT (new, based on reference) */}
      <WhyPeopleChooseSection />

      {/* Existing benefits section continues below */}
      <Testimonials />
      <SiteFooter />

      {/* Floating chat bubble */}
      <SignedIn>
        <button
          onClick={() => navigate('/chat')}
          className="fixed bottom-6 right-6 h-12 w-12 grid place-items-center rounded-full bg-black text-white shadow-xl hover:bg-gray-800 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </SignedIn>
    </main>
  );
};

/* --------------------------- Header --------------------------- */
function Header() {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 h-16 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md border grid place-items-center font-bold">M</div>
          <div className="leading-tight">
            <span className="font-semibold">MaterialScienceGPT</span>
            <div className="text-xs text-muted-foreground">AI Assistant for Material Science</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button className="hover:text-gray-900 text-gray-700">
            Pricing
          </button>
          <button className="hover:text-gray-900 text-gray-700">
            Enterprise
          </button>
          <button className="hover:text-gray-900 text-gray-700">
            Security
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <span>Resources</span>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
              <DropdownMenuItem>Changelog</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-[#4476F2] text-white hover:bg-[#3d69da] rounded-full px-5">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button 
              onClick={() => navigate('/chat')} 
              className="bg-[#4476F2] text-white hover:bg-[#3d69da] rounded-full px-5"
            >
              Go to Chat
            </Button>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------- Screen 1 ---------------------------- */
function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="container mx-auto max-w-7xl px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center pt-6 md:pt-10">
        <div>
          <GeneratedHeroText />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1e54c7] text-white inline-flex items-center gap-2">
                  Try Chat Now <ArrowRight className="h-4 w-4" />
                </Button>
              </SignUpButton>
              <SignUpButton mode="modal">
                <Button variant="outline" className="h-12 px-6 rounded-xl">
                  Sign Up for Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="outline" className="h-12 px-6 rounded-xl border-dashed">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button 
                onClick={() => navigate('/chat')}
                className="h-12 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1e54c7] text-white inline-flex items-center gap-2"
              >
                Go to Chat <ArrowRight className="h-4 w-4" />
              </Button>
            </SignedIn>
          </div>
        </div>

        <div className="relative">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Screen 2 ---------------------------- */
function FeaturePanels() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Panel 1 — Instant Answers */}
      <GradientPanel gradient="from-[#9B5CFF] via-[#8E5DF2] to-[#B082FF]">
        <InnerCard>
          <QAVideo
            qa={[
              {
                q: "What is the band gap of monolayer MoS₂ and how does it compare to bulk?",
                a: "Monolayer MoS₂ has a direct band gap around 1.8 eV, whereas bulk MoS₂ is indirect at roughly 1.2 eV.",
              },
              {
                q: "What is a typical band gap for hybrid perovskites?",
                a: "Most hybrid perovskites range from ~1.3 to 1.7 eV, which is suitable for photovoltaic applications.",
              },
            ]}
          />
        </InnerCard>
        <StatusPill text="Instant Answers" />
      </GradientPanel>

      {/* Panel 2 — Experiment Copilot */}
      <GradientPanel gradient="from-[#FF715C] via-[#FF6B86] to-[#FFA06B]">
        <InnerCard>
          <QAVideo
            qa={[
              {
                q: "Design a safe annealing schedule for Al 2024.",
                a: "Solutionize 495–505°C, quench, then age at 160–180°C. For ductility, under‑age and include a brief 300–350°C stress‑relief.",
              },
              {
                q: "Recommend heat treatment to refine grains in stainless steel.",
                a: "Use controlled recrystallization at ~1000–1100°C for a short soak followed by a rapid quench to encourage fine grains.",
              },
            ]}
          />
        </InnerCard>
        <StatusPill text="Experiment Copilot" />
      </GradientPanel>

      {/* Panel 3 — Knowledge Memory */}
      <GradientPanel gradient="from-[#64E9FF] via-[#7AD9FF] to-[#00C2FF]">
        <InnerCard>
          <QAVideo
            qa={[
              {
                q: "Pick up where we left off on the perovskite study.",
                a: "Loaded your notes and results — here's the next experiment to validate the hypothesis and improve film stability.",
              },
              {
                q: "Remind me of yesterday's Ti‑6Al‑4V settings.",
                a: "You ran 940°C solution treat for 30 min, water quench, then age at 550°C for 2 hours — we can tune this for toughness.",
              },
            ]}
          />
        </InnerCard>
        <StatusPill text="Knowledge Memory" />
      </GradientPanel>
    </div>
  );
}

function GradientPanel({ children, gradient }: { children: React.ReactNode; gradient: string }) {
  return (
    <div className="relative rounded-[28px] p-6 min-h-[420px] shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="relative z-[1] flex flex-col items-center justify-start pt-8 pb-10">{children}</div>
    </div>
  );
}

function InnerCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-[86%] mx-auto rounded-[22px] bg-white border shadow-lg ${className}`}>{children}</div>;
}

function StatusPill({ text }: { text: string }) {
  return (
    <div className="mt-5 pointer-events-none">
      <div className="inline-flex items-center gap-3 bg-black text-white rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
        <div className="flex -space-x-2">
          <div className="h-6 w-6 rounded-full bg-white/10 grid place-items-center border border-white/20">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="h-6 w-6 rounded-full bg-white/10 grid place-items-center border border-white/20">
            <Brain className="h-3.5 w-3.5" />
          </div>
        </div>
        <span className="text-sm font-medium">{text}</span>
      </div>
    </div>
  );
}

/* ---------------------------- Screen 3 ---------------------------- */
function SecuritySection() {
  return (
    <section id="security" className="container mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10 items-start">
        {/* Left column */}
        <div>
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-pink-200 bg-pink-50 text-pink-700 text-sm">
              Security
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {"Enterprise‑grade"}
            <br />
            {"security & privacy"}
          </h2>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl">
            {
              "We take security and compliance seriously. MaterialScienceGPT is designed to keep your research data private and compliant so teams can build secure AI workflows with confidence."
            }
          </p>

          {/* Compliance badges */}
          <div className="mt-10 flex items-center gap-6">
            <div className="h-16 w-16 rounded-full border grid place-items-center bg-white shadow-sm text-[11px] font-medium text-gray-700">
              <div className="text-center leading-tight">
                <div>{"AICPA"}</div>
                <div className="text-xs font-semibold">SOC 2</div>
              </div>
            </div>
            <div className="h-16 w-16 rounded-full border grid place-items-center bg-white shadow-sm text-[11px] font-medium text-gray-700">
              <div className="text-center leading-tight">
                <div>{"EU"}</div>
                <div className="text-xs font-semibold">GDPR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="rounded-3xl border shadow-sm overflow-hidden bg-white">
            <div className="divide-y">
              <SecurityFeatureRow
                title="Your data stays yours"
                desc="Your data is only accessible to your AI agent and is never used to train models."
                Icon={Database}
                gradient="from-cyan-400 to-blue-500"
              />
              <SecurityFeatureRow
                title="Data encryption"
                desc="All data is encrypted at rest and in transit using industry‑standard algorithms."
                Icon={Lock}
                gradient="from-emerald-400 to-green-600"
              />
              <SecurityFeatureRow
                title="Secure integrations"
                desc="We use verified variables to ensure users can access only their own data in your systems."
                Icon={Boxes}
                gradient="from-orange-400 to-rose-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityFeatureRow({
  title,
  desc,
  Icon,
  gradient,
}: {
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}) {
  return (
    <div className="p-6 md:p-7 lg:p-8">
      <div className="grid grid-cols-[1fr_auto] items-center gap-6">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-gray-600">{desc}</p>
        </div>
        <div className="relative">
          <div className={`size-20 rounded-2xl bg-gradient-to-br ${gradient} opacity-20`} />
          <Icon className="absolute inset-0 m-auto size-10 text-gray-700/70" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Screen 4 (new) ---------------------------- */
function WhyPeopleChooseSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-24 bottom-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-fuchsia-500/40 to-pink-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-[-140px] h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-orange-500/40 to-rose-500/40 blur-3xl" />

      <div className="container mx-auto max-w-5xl px-6 md:px-8 py-20 md:py-24 text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Make materials R&amp;D your competitive edge
        </h2>
        <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
          Use MaterialScienceGPT to deliver exceptional research speed, accuracy, and support for your team — stand out with faster iterations and better decisions.
        </p>

        {/* CTA with gradient underline */}
        <div className="mt-8 inline-flex flex-col items-center">
          <SignedOut>
            <SignUpButton mode="modal">
              <Button className="h-12 px-6 rounded-xl bg-black text-white hover:bg-black/90">
                Build your materials agent
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button 
              onClick={() => navigate('/chat')}
              className="h-12 px-6 rounded-xl bg-black text-white hover:bg-black/90"
            >
              Start using your agent
            </Button>
          </SignedIn>
          <div className="mt-2 h-[3px] w-full rounded-full bg-gradient-to-r from-pink-500 via-orange-500 to-fuchsia-500" />
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Footer ------------------------------ */
function SiteFooter() {
  const navigate = useNavigate();
  
  return (
    <footer className="mt-16 bg-black text-white pt-10">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="pb-10">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md border border-white grid place-items-center font-bold">M</div>
            <span className="font-semibold">MaterialScienceGPT</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 text-sm">
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-white/80">
              <li>
                <button onClick={() => navigate('/chat')}>Chat</button>
              </li>
              <li>
                <button>Features</button>
              </li>
              <li>
                <button>Pricing</button>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Resources</div>
            <ul className="space-y-2 text-white/80">
              <li>
                <button>Docs</button>
              </li>
              <li>
                <button>Blog</button>
              </li>
              <li>
                <button>Changelog</button>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-white/80">
              <li>
                <button>About</button>
              </li>
              <li>
                <button>Careers</button>
              </li>
              <li>
                <button>Contact</button>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-white/80">
              <li>
                <button>Privacy</button>
              </li>
              <li>
                <button>Terms</button>
              </li>
              <li>
                <button>Security</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 md:px-8 py-6 text-sm text-white/60">
          © {new Date().getFullYear()} MaterialScienceGPT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Utility ------------------------------ */
function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`container mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

export default Landing;
