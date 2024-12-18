"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Background from "@/assets/background.png";
import Amazon from "@/assets/amazon.jpg";
import wind from "@/assets/wind-farm.jpg";
import refore from "@/assets/refore.jpeg";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  ArrowRight,
  BarChart3,
  Globe,
  Leaf,
  Users,
  CheckCircle,
  TreeDeciduous,
  Menu,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed w-full px-4 lg:px-6 h-16 flex items-center transition-all duration-300 z-50 
          ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}
      >
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-6 w-6 text-green-600" />
          <span
            className={`ml-2 text-2xl font-bold text-white ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            CarbonCred
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className={`text-sm font-semibold text-white hover:text-green-200  transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            href="#how-it-works"
          >
            How It Works
          </Link>
          <Link
            className={`text-sm font-semibold text-white hover:text-green-200  transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            href="#projects"
          >
            Projects
          </Link>
          <Link
            className={`text-sm font-semibold text-white hover:text-green-200  transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            href="#about"
          >
            About Us
          </Link>
          <Link
            className={`text-sm font-semibold text-white hover:text-green-200  transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
            href="#about"
          >
            Dashboard
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className={`font-semibold ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>{" "}
          <SignedIn>
            <SignOutButton>
              <Button
                variant="ghost"
                className={`font-semibold ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                Sign Out
              </Button>
            </SignOutButton>{" "}
            <UserButton />
          </SignedIn>
        </div>
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              <Link
                className="text-sm font-medium hover:text-green-600 transition-colors"
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-600 transition-colors"
                href="#projects"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-600 transition-colors"
                href="#about"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                className="text-sm font-medium hover:text-green-600 transition-colors"
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="relative w-full min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <Image
              src={Background}
              alt="Forest background"
              className="w-full h-full object-cover"
              priority // This ensures the image loads first
              quality={100} // You can adjust quality as needed
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container px-4 md:px-6 relative z-20 text-center text-white"
          >
            <motion.div
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Offset Your Carbon Footprint
                </h1>
                <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-gray-200">
                  Join the global effort to combat climate change. Purchase
                  carbon credits and support sustainable projects worldwide.
                </p>
              </div>
              <motion.div
                className="space-x-4 mt-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
                  onClick={() => router.push("/agreements")}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="text-lg px-8 py-6 text-black hover:text-white border-white hover:bg-white/20"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <a href="#how-it-works" className="text-white">
              <motion.div className="w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
                <motion.div
                  className="w-1 h-3 bg-white rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </a>
          </motion.div>
        </section>
        <section id="how-it-works" className="w-full py-24 md:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: BarChart3,
                  title: "Calculate",
                  description:
                    "Measure your carbon footprint using our advanced calculator.",
                },
                {
                  icon: Globe,
                  title: "Choose",
                  description:
                    "Select from a variety of verified carbon offset projects.",
                },
                {
                  icon: CheckCircle,
                  title: "Offset",
                  description:
                    "Purchase credits to neutralize your carbon impact.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-green-100 p-5 rounded-full mb-6"
                  >
                    <item.icon className="h-10 w-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-lg">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Choose Carbon Credits?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="transform transition-transform hover:scale-105">
                <CardHeader>
                  <Globe className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Global Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Support projects that reduce greenhouse gas emissions
                    worldwide.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="transform transition-transform hover:scale-105">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Measurable Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track your contribution and see the tangible impact of your
                    investment.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="transform transition-transform hover:scale-105">
                <CardHeader>
                  <Users className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>Community Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Join a community of environmentally conscious individuals
                    and businesses.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Amazon Rainforest Conservation</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={Amazon}
                    alt="Amazon Rainforest"
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <CardDescription>
                    Protect vital ecosystems and support indigenous communities
                    in the Amazon.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Wind Farm Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={wind}
                    alt="Wind Farm"
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <CardDescription>
                    Invest in clean energy production through wind farm projects
                    in developing countries.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Reforestation Initiative</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={refore}
                    alt="Reforestation"
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <CardDescription>
                    Support large-scale tree planting efforts to restore
                    degraded landscapes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 bg-green-100"
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
                  About CarbonCred
                </h2>
                <p className="text-gray-500 md:text-lg mb-4">
                  CarbonCred is dedicated to making carbon offsetting
                  accessible, transparent, and impactful. Our mission is to
                  empower individuals and businesses to take meaningful action
                  against climate change.
                </p>
                <p className="text-gray-500 md:text-lg mb-4">
                  With a team of environmental experts and technology
                  innovators, we ensure that every carbon credit purchased
                  through our platform contributes to verified, high-quality
                  projects that make a real difference.
                </p>
                <Button variant="outline">Learn More About Us</Button>
              </div>
              <div className="flex justify-center">
                <TreeDeciduous className="h-64 w-64 text-green-600" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Make a Difference?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Start offsetting your carbon footprint today and contribute to
                  a sustainable future.
                </p>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Calculate Your Footprint
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="bg-gray-100">
        <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About CarbonCred</h3>
              <p className="text-sm text-gray-500">
                Empowering individuals and businesses to take action against
                climate change through carbon offsetting.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  <Link
                    href="#how-it-works"
                    className="hover:text-green-600 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#projects"
                    className="hover:text-green-600 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="hover:text-green-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-green-600 transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>Email: info@carboncred.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Green Street, Eco City, EC 12345</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition-colors"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 CarbonCred. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
