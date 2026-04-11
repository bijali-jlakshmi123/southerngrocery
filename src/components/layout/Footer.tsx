"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Weekly Offers", href: "/offers" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Store Locations", href: "/store-address" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Rice & Grains", href: "/category/rice" },
        { name: "Spices & Masala", href: "/category/spices" },
        { name: "Oils & Ghee", href: "/category/oils" },
        { name: "Kerala Snacks", href: "/category/snacks" },
        { name: "Frozen Foods", href: "/category/frozen" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Delivery Info", href: "/shipping" },
        { name: "My Account", href: "/login" },
        { name: "Shopping Basket", href: "/cart" },
        { name: "Contact & Support", href: "/contact" },
        { name: "Store Locations", href: "/store-address" },
      ],
    },
  ];

  return (
    <>
      {/* NEWSLETTER FULL WIDTH */}
      <div className="bg-primary py-12 w-full">
        <div className="max-w-8xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/10 p-4 rounded-xl">
              <Send size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                Join Our Newsletter For £10 Off
              </h3>
              <p className="opacity-80 text-sm">
                Subscribe to get updates on new offers & products
              </p>
            </div>
          </div>

          <div className="w-full max-w-xl">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-6 py-4 rounded-xl bg-white outline-none text-secondary"
              />
              <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:scale-105 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <footer className="bg-white pt-24 pb-12 text-slate-600 relative border-t border-slate-100 w-full overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

        <div className="max-w-8xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-20 text-center md:text-left">
            {/* Logo */}
            <div className="lg:col-span-2 space-y-8">
              <Link href="/" className="flex items-center gap-2">
                <motion.div>
                  {/*whileHover={{ scale: 1.05 }}>*/}
                  <Image
                    src="/logo.png"
                    alt="Southern Spices"
                    width={220}
                    height={60}
                  />
                </motion.div>
              </Link>

              <p className="text-slate-500 max-w-sm mx-auto md:mx-0">
                UK's premier online destination for authentic Kerala groceries.
              </p>

              <div className="flex justify-center md:justify-start gap-4">
                {[Facebook, Instagram, Twitter, MessageCircle].map(
                  (Icon, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }}>
                      <Link
                        href="#"
                        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:shadow-lg border"
                      >
                        <Icon size={20} />
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>
            </div>

            {/* Links */}
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-slate-900 font-black uppercase tracking-widest">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={link.href}
                        className="hover:text-primary flex items-center gap-1 justify-center md:justify-start"
                      >
                        {link.name}
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover:opacity-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CONTACT STRIP */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-y mb-12 bg-slate-50 rounded-3xl px-8">
            <div className="flex gap-4 items-start">
              <Phone className="flex-shrink-0 text-primary mt-0.5" size={18} />
              <div>
                <a href="tel:+447352393384" className="font-semibold text-slate-700 hover:text-primary transition-colors">
                  +44 7352 393384
                </a>
                <div className="text-xs text-slate-400 mt-0.5">Mon–Sat 10–7 · Sun 10–4</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MessageCircle className="flex-shrink-0 text-primary mt-0.5" size={18} />
              <div>
                <a href="https://wa.me/+447352393384" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 hover:text-primary transition-colors">
                  WhatsApp Us
                </a>
                <div className="text-xs text-slate-400 mt-0.5">Instant Support</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <MapPin className="flex-shrink-0 text-primary mt-0.5" size={18} />
              <div>
                <a href="/store-address" className="font-semibold text-slate-700 hover:text-primary transition-colors">
                  3 Store Locations
                </a>
                <div className="text-xs text-slate-400 mt-0.5">Burton · Derby · Nottingham</div>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Mail className="flex-shrink-0 text-primary mt-0.5" size={18} />
              <div>
                <a href="mailto:support@southernspices.co.uk" className="font-semibold text-slate-700 hover:text-primary transition-colors">
                  support@southernspices.co.uk
                </a>
                <div className="text-xs text-slate-400 mt-0.5">Reply within 24h</div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-slate-400">
              © {currentYear} Southern Spices
            </p>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              {/* Visa */}
              <div
                className="h-8 px-2 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm"
                title="Visa"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 750 471"
                  width="46"
                  height="29"
                >
                  <rect width="750" height="471" rx="40" fill="#fff" />
                  <path
                    d="M278.2 334.5l33.5-195h53.6l-33.5 195h-53.6zm245.7-190.3c-10.6-3.9-27.3-8.1-48.1-8.1-53 0-90.3 26.5-90.6 64.5-.3 28.1 26.6 43.7 46.9 53.1 20.8 9.6 27.9 15.8 27.8 24.4-.1 13.2-16.7 19.2-32.1 19.2-21.4 0-32.8-2.9-50.4-10l-6.9-3.1-7.5 43.6c12.5 5.4 35.5 10.1 59.5 10.3 56.1 0 92.6-26.2 93-66.9.2-22.3-14.1-39.3-44.9-53.3-18.7-9.1-30.1-15.1-30-24.3 0-8.1 9.7-16.8 30.6-16.8 17.5-.3 30.1 3.5 40 7.4l4.8 2.2 7.4-43.2zM626.3 139.5h-41.4c-12.8 0-22.4 3.5-28 16.2l-79.5 179.8h56.2s9.2-24 11.3-29.3c6.2 0 61.1.1 68.9.1 1.6 6.8 6.5 29.2 6.5 29.2h49.6l-43.6-195.9zm-65.7 127.4c4.5-11.4 21.5-55 21.5-55s4.4-11.4 7.1-18.7l3.6 16.9s10.2 46.5 12.4 56.8h-44.6zm-330.2-127.4l-52.5 133.2-5.6-27c-9.7-31.2-40-65.3-73.8-82.3l48.1 169.6h56.6l84.2-193.5h-57z"
                    fill="#1A1F71"
                  />
                  <path
                    d="M152.5 139.5H63.3l-.7 4.1c70 16.9 116.4 57.6 135.6 106.6l-19.6-93.5c-3.4-12.8-13-16.7-25.8-17.2z"
                    fill="#F9A533"
                  />
                </svg>
              </div>

              {/* Mastercard */}
              <div
                className="h-8 px-2 bg-white border border-slate-200 rounded-md flex items-center justify-center shadow-sm"
                title="Mastercard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 750 471"
                  width="46"
                  height="29"
                >
                  <rect width="750" height="471" rx="40" fill="#fff" />
                  <circle cx="284" cy="235.5" r="141.5" fill="#EB001B" />
                  <circle cx="466" cy="235.5" r="141.5" fill="#F79E1B" />
                  <path
                    d="M375 118.5a141.4 141.4 0 0 1 0 234 141.4 141.4 0 0 1 0-234z"
                    fill="#FF5F00"
                  />
                </svg>
              </div>

              {/* American Express */}
              <div
                className="h-8 px-2 bg-[#2E77BC] border border-[#2E77BC] rounded-md flex items-center justify-center shadow-sm"
                title="American Express"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 750 471"
                  width="46"
                  height="29"
                >
                  <rect width="750" height="471" rx="40" fill="#2E77BC" />
                  <path
                    d="M0 331v-61l46-98h35l-27 59h28v-59h37v59h11v-59h36v98H0zm36-40h20v-19H36v19zm154 40v-61l-46-98h35l27 59h1l27-59h35l-46 98v61h-33zm254-98h-72v98h72v-27h-40v-14h38v-27h-38v-13h40v-17zm-231 0h34v71h42v27h-76v-98zm78 0h50c20 0 34 12 34 30 0 13-8 23-20 27l24 41h-36l-20-36h-14v36h-18v-98zm18 41h28c6 0 10-4 10-11s-4-11-10-11h-28v22zm125-41h34v71h42v27h-76v-98zm131 0h-57l-29 98h33l5-17h38l5 17h34l-29-98zm-24 53l11-37 11 37h-22zm125-53h-50c-16 0-28 10-28 25 0 12 7 20 18 23l-20 50h33l17-43h12v43h32v-98zm-50 37c5 0 9-3 9-9s-4-9-9-9h-18v18h18z"
                    fill="#fff"
                  />
                </svg>
              </div>

              {/* Apple Pay */}
              <div
                className="h-8 px-3 bg-black border border-black rounded-md flex items-center justify-center shadow-sm"
                title="Apple Pay"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 165.521 105.965"
                  width="52"
                  height="33"
                >
                  <path
                    d="M150.698 0H14.823C14.2.001 13.576.003 12.953.01 12.43.017 11.908.03 11.386.05 10.255.095 9.122.195 8.01.453 6.899.712 5.878 1.139 4.93 1.741c-.95.602-1.813 1.348-2.55 2.216-.737.869-1.319 1.848-1.725 2.901-.407 1.054-.614 2.165-.65 3.287-.017.5-.025 1.002-.025 1.502V94.31c0 .5.008 1.001.025 1.502.036 1.122.243 2.233.65 3.286.406 1.054.988 2.033 1.725 2.902.737.868 1.6 1.613 2.55 2.215.948.602 1.97 1.029 3.08 1.288 1.112.258 2.244.358 3.376.403.522.02 1.044.033 1.567.04.623.007 1.247.009 1.87.009h135.875c.623 0 1.247-.002 1.87-.009.523-.007 1.045-.02 1.568-.04 1.131-.045 2.264-.145 3.375-.403 1.11-.259 2.132-.686 3.08-1.288.95-.602 1.813-1.347 2.55-2.215.737-.869 1.319-1.848 1.725-2.902.407-1.053.614-2.164.65-3.286.018-.501.025-1.002.025-1.502V11.647c0-.5-.008-1.001-.025-1.502-.036-1.122-.243-2.233-.65-3.287-.406-1.053-.988-2.032-1.725-2.9-.737-.869-1.6-1.615-2.55-2.217-.948-.602-1.97-1.029-3.08-1.288C159.286.195 158.154.095 157.022.05c-.522-.021-1.044-.033-1.568-.04C154.831.002 154.207 0 153.584 0z"
                    fill="#fff"
                  />
                  <path
                    d="M150.698 3.532l2.619.004c.506.006 1.012.018 1.52.038 1.003.04 2.031.13 3.004.358.915.213 1.721.553 2.458 1.017.735.462 1.398 1.044 1.963 1.718.566.675 1.004 1.432 1.293 2.248.29.817.462 1.685.492 2.568.017.493.024.986.024 1.482V94.31c0 .496-.007.989-.024 1.48-.03.885-.202 1.753-.492 2.57-.29.816-.727 1.572-1.293 2.247-.565.674-1.228 1.256-1.963 1.718-.737.465-1.543.804-2.458 1.017-.973.228-2.001.318-2.998.358-.515.02-1.03.032-1.554.04-.617.006-1.234.008-1.85.008H14.823c-.618 0-1.237-.002-1.862-.009-.514-.007-1.028-.019-1.54-.039-1.002-.04-2.03-.13-3.01-.36-.91-.212-1.716-.55-2.451-1.014-.736-.463-1.4-1.045-1.965-1.72-.565-.674-1.003-1.43-1.292-2.246-.29-.817-.462-1.685-.492-2.568-.016-.49-.023-.984-.024-1.476V11.65c.001-.498.008-.992.024-1.484.03-.884.202-1.752.492-2.569.29-.816.727-1.573 1.292-2.247.565-.675 1.23-1.257 1.965-1.72.735-.462 1.54-.8 2.456-1.013.972-.228 2-.318 2.998-.358.508-.02 1.015-.032 1.527-.038l2.611-.004z"
                    fill="#000"
                  />
                  <path
                    d="M43.508 35.77c1.998-2.478 3.344-5.827 2.999-9.235-2.879.116-6.487 1.91-8.543 4.389-1.88 2.118-3.459 5.643-3.053 8.993 3.224.234 6.487-1.62 8.597-4.147m3.032 4.742c-4.74-.29-8.772 2.69-11.023 2.69-2.252 0-5.697-2.55-9.435-2.49-4.857.07-9.358 2.84-11.844 7.23-5.088 8.783-1.336 21.808 3.578 28.96 2.427 3.52 5.317 7.407 9.115 7.29 3.578-.116 4.973-2.318 9.29-2.318 4.32 0 5.58 2.318 9.435 2.26 3.926-.06 6.408-3.518 8.832-7.04 2.773-4.032 3.914-7.896 3.974-8.07-.086-.03-7.645-2.954-7.717-11.682-.06-7.26 5.932-10.78 6.202-10.956-3.404-5.007-8.72-5.585-10.407-5.674"
                    fill="#fff"
                  />
                  <path
                    d="M87.434 30.87c10.41 0 17.65 7.173 17.65 17.615 0 10.477-7.385 17.685-17.93 17.685H76.5V81.34h-8.21V30.87zm-10.934 28.12h8.937c7.244 0 11.367-3.90 11.367-10.47 0-6.57-4.123-10.43-11.332-10.43H76.5zm40.24 22.696c0-6.64 5.112-10.718 14.19-11.261l10.44-.617v-2.95c0-4.229-2.856-6.712-7.63-6.712-4.53 0-7.35 2.173-8.025 5.55h-7.525c.423-6.99 6.43-12.143 15.832-12.143 9.3 0 15.305 4.93 15.305 12.69V81.34h-7.596v-6.254h-.176c-2.24 4.254-7.138 6.956-12.215 6.956-7.56 0-12.6-4.71-12.6-11.356zm24.63-3.404v-3.008l-9.392.58c-4.67.303-7.314 2.338-7.314 5.621 0 3.354 2.75 5.48 6.943 5.48 5.465 0 9.763-3.767 9.763-8.673zm13.868 27.206v-6.535c.597.141 1.934.141 2.61.141 3.73 0 5.77-1.574 7.018-5.621l.748-2.387L141.187 54.28h8.527l9.998 32.34h.14l9.997-32.34h8.316L164.07 99.61c-2.996 8.45-6.446 11.153-13.693 11.153-.67 0-2.117-.07-2.714-.175z"
                    fill="#fff"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
