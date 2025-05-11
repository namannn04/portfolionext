import { Github, Linkedin, MessageSquare, User, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/component/Navbar"

export default function ContactPage() {
  return (
    <div className="sm:block sm:py-20 bg-black">
      <div className="sm:max-w-[50%] mx-auto">
        <Navbar />
      </div>
      <div className="relative overflow-hidden min-h-screen sm:max-w-[50%] mx-auto sm:border sm:border-teal-500 rounded-xl p-6">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-teal-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-cyan-400/10 blur-xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-teal-400/10 blur-xl animate-float-delayed"></div>

        {/* Animated gradient lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse-slow"></div>
        <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-teal-500/50 to-transparent animate-pulse-slow"></div>
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse-slow"></div>

        <div className="backdrop-blur-sm bg-black/40 p-8 rounded-2xl border border-teal-500/20 shadow-xl shadow-teal-500/5 relative z-10 transition-all duration-500 hover:shadow-teal-400/20">
          <div className="absolute -top-3 left-10 h-1 w-20 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full"></div>
          <div className="absolute -bottom-3 right-10 h-1 w-20 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>

          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text animate-gradient">
            Get in Touch
          </h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            I'm always open to exploring new collaborations and exciting opportunities. Whether it's a project idea, a
            job opportunity, or simply a chance to connect, feel free to reach out!
          </p>

          <div className="flex gap-6 mb-8 justify-center">
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <path
                  d="M8.5 13.5L11 16.5L15.5 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 5.5C21 7.433 16.97 9 12 9C7.03 9 3 7.433 3 5.5C3 3.567 7.03 2 12 2C16.97 2 21 3.567 21 5.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 5.5V18.5C3 20.433 7.03 22 12 22C16.97 22 21 20.433 21 18.5V5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M22 4L12 14L2 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 4H22V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 12L20.5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 19L11.5 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-cyan-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <form className="space-y-5">
            <div className="transform transition-all duration-500 hover:translate-x-1">
              <label htmlFor="name" className="block mb-2 text-cyan-300 font-medium">
                Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 bg-black/50 border-teal-500/30 text-white h-12 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="transform transition-all duration-500 hover:translate-x-1">
              <label htmlFor="email" className="block mb-2 text-cyan-300 font-medium">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10 bg-black/50 border-teal-500/30 text-white h-12 rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <div className="transform transition-all duration-500 hover:translate-x-1">
              <label htmlFor="message" className="block mb-2 text-cyan-300 font-medium">
                Message
              </label>
              <div className="relative group">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  className="pl-10 bg-black/50 border-teal-500/30 text-white min-h-[150px] rounded-xl focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>

            <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white rounded-xl transition-all duration-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:translate-y-[-2px] hover:scale-[1.01]">
              Send Message <Send className="ml-2 h-4 w-4 animate-pulse-slow" />
            </Button>
          </form>

          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-900/20 to-teal-900/20 border border-teal-500/20 text-center transform transition-all duration-500 hover:border-teal-500/40 hover:shadow-inner hover:shadow-teal-500/5">
            <p className="text-gray-400">
              or mail me at{" "}
              <span className="text-cyan-400 hover:text-teal-300 transition-colors duration-300 relative group">
                namandadhich15592@gmail.com
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-teal-400 group-hover:w-full transition-all duration-300"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
