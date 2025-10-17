import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Menu, Moon, Sun, Rocket, Sparkles, Check } from "lucide-react";

// 단일 파일 데모: shadcn/ui + Tailwind + Framer Motion

export default function ShadcnSimpleSite() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-100">
        <SiteNav dark={dark} onToggle={() => setDark((d) => !d)} />

        <main className="container mx-auto px-4">
          <Hero />
          <Features />
          <TabsDemo />
          <Contact />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}

function SiteNav({ dark, onToggle }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="flex items-center gap-2">
          <Menu className="size-5 text-neutral-500 sm:hidden" />
          <span className="text-lg font-semibold tracking-tight">
            shadcn Demo
          </span>
          <Badge variant="secondary" className="ml-2">
            v1
          </Badge>
        </div>

        <nav className="mx-auto hidden gap-6 sm:flex">
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            href="#features"
          >
            Features
          </a>
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={onToggle}
            className="rounded-2xl"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Button className="rounded-2xl">Get Started</Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            <Sparkles className="size-4" /> No CSS headache — just components
          </span>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Build fast with{" "}
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              shadcn/ui
            </span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            A minimal landing template using React 18, Tailwind, and shadcn/ui.
            Copy, tweak, and ship.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-2xl">
              <Rocket className="mr-2 size-4" /> Start Free
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl">
              Live Demo
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4 text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <Check className="size-4" />
              No vendor lock-in
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4" />
              Accessible components
            </div>
            <div className="flex items-center gap-2">
              <Check className="size-4" />
              Dark mode
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Instant Preview</CardTitle>
              <CardDescription>
                Cards, buttons, inputs — all cohesive.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input placeholder="Your email" />
              <div className="flex gap-2">
                <Button className="rounded-2xl">Subscribe</Button>
                <Button variant="outline" className="rounded-2xl">
                  Later
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-3 gap-2">
                {["Primary", "Secondary", "Outline"].map((label, i) => (
                  <Button
                    key={label}
                    variant={
                      i === 0 ? "default" : i === 1 ? "secondary" : "outline"
                    }
                    className="rounded-xl"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: <Sparkles className="size-5" />,
      title: "Composable",
      desc: "Headless & flexible primitives you can style your way.",
    },
    {
      icon: <Rocket className="size-5" />,
      title: "Fast",
      desc: "Ship quickly with copy‑pasteable patterns and great DX.",
    },
    {
      icon: <Check className="size-5" />,
      title: "Accessible",
      desc: "WAI‑ARIA friendly components out of the box.",
    },
  ];
  return (
    <section id="features" className="py-8 sm:py-12">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Features</h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          A tiny tour of what you get.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((f) => (
          <Card key={f.title} className="rounded-2xl">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="rounded-xl bg-neutral-100 p-2 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                {f.icon}
              </div>
              <div>
                <CardTitle className="text-lg">{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Use it as-is or remix endlessly. It’s your UI.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TabsDemo() {
  return (
    <section id="pricing" className="py-8 sm:py-12">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Explore</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Overview, Pricing, and FAQ
            </p>
          </div>
          <TabsList className="rounded-2xl">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Why this template?</CardTitle>
              <CardDescription>
                Reasonable defaults and zero fluff.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>Copy-paste components and move on.</li>
              <li>Use Tailwind to adjust spacing, colors, and layout.</li>
              <li>Composable, headless primitives from shadcn/ui.</li>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                name: "Hobby",
                price: "$0",
                features: ["1 project", "Community support"],
              },
              {
                name: "Pro",
                price: "$12",
                features: ["Unlimited projects", "Email support"],
              },
              {
                name: "Team",
                price: "$29",
                features: ["Team seats", "Priority support"],
              },
            ].map((p) => (
              <Card key={p.name} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span>{p.name}</span>
                    <span className="text-2xl font-extrabold">{p.price}</span>
                  </CardTitle>
                  <CardDescription>Billed monthly</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Check className="size-4 text-green-600" />
                      <span>{f}</span>
                    </div>
                  ))}
                  <Button className="mt-2 w-full rounded-2xl">
                    Choose {p.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faq" className="mt-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Quick answers to common questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <div>
                <p className="font-medium">Can I use this in production?</p>
                <p>Yes. Replace content and wire it to your API.</p>
              </div>
              <div>
                <p className="font-medium">Do I need Next.js?</p>
                <p>
                  No. Works in any React 18 app with Tailwind and shadcn/ui set
                  up.
                </p>
              </div>
              <div>
                <p className="font-medium">Is dark mode supported?</p>
                <p>Yep — try the sun/moon button in the navbar.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks! We'll be in touch.");
  };

  return (
    <section id="contact" className="py-10 sm:py-16">
      <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Get in touch</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Have questions or feedback? Send us a message.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-600" /> 24h response time
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-600" /> Privacy-friendly
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-green-600" /> Built with shadcn/ui
            </li>
          </ul>
        </div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Contact form</CardTitle>
            <CardDescription>We’ll reply via email.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <Input placeholder="Name" required />
              <Input type="email" placeholder="Email" required />
              <Textarea placeholder="Message" rows={4} required />
              <Button type="submit" className="rounded-2xl">
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-neutral-200 py-10 dark:border-neutral-800">
      <div className="container mx-auto px-4 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} shadcn Demo. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a className="hover:underline" href="#">
              Terms
            </a>
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <a className="hover:underline" href="#">
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
