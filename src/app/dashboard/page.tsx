"use client";

import { useAuth } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  User, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Package, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Link from "next/link";

type Tab = "overview" | "orders" | "profile";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch Orders
        const ordersRes = await fetch(`/api/orders/user/${user.id}`);
        const ordersData = await ordersRes.json();
        if (ordersData.success) {
          setOrders(ordersData.data);
        }

        // Fetch Detailed Profile
        const profileRes = await fetch(`/api/user/${user.id}`);
        const profileData = await profileRes.json();
        if (profileData.success) {
          setProfileData(profileData.data);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, router]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      billing: {
        phone: formData.get("phone"),
      }
    };

    try {
      const res = await fetch(`/api/user/${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Profile updated successfully");
        setProfileData(result.data);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-100 pt-12 pb-16">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                <span className="w-8 h-[2px] bg-primary"></span>
                User Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900">
                Welcome back, <span className="text-primary italic">{user.name.split(" ")[0]}</span>!
              </h1>
              <p className="text-slate-500 font-medium max-w-lg">
                Manage your orders, update your profile, and track your Southern Spices journey all in one place.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="btn-base btn-outline !rounded-2xl !py-4 px-8 flex items-center gap-2 font-bold text-slate-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-72 space-y-4">
            <nav className="bg-white p-3 rounded-4xl border border-slate-100 shadow-sm space-y-1">
              <NavButton 
                active={activeTab === "overview"} 
                onClick={() => setActiveTab("overview")}
                icon={<User size={20} />}
                label="Overview"
              />
              <NavButton 
                active={activeTab === "orders"} 
                onClick={() => setActiveTab("orders")}
                icon={<ShoppingBag size={20} />}
                label="Order History"
                badge={orders.length > 0 ? orders.length : undefined}
              />
              <NavButton 
                active={activeTab === "profile"} 
                onClick={() => setActiveTab("profile")}
                icon={<Settings size={20} />}
                label="Account Settings"
              />
            </nav>

            <div className="bg-primary/5 rounded-4xl p-8 border border-primary/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />
              <h4 className="font-heading font-black text-slate-900 mb-2 relative z-10">Need Help?</h4>
              <p className="text-xs text-slate-500 font-medium mb-4 relative z-10">Our support team is available 24/7 for our community.</p>
              <Link href="/contact" className="text-xs font-black text-primary underline relative z-10">Contact Support</Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard 
                      icon={<Package className="text-blue-500" />} 
                      label="Total Orders" 
                      value={orders.length.toString()} 
                      color="bg-blue-50"
                    />
                    <StatCard 
                      icon={<Clock className="text-amber-500" />} 
                      label="Points Earned" 
                      value="450" 
                      color="bg-amber-50"
                    />
                    <StatCard 
                      icon={<CheckCircle2 className="text-success" />} 
                      label="Account Status" 
                      value="Active" 
                      color="bg-success/10"
                    />
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                      <h3 className="text-xl font-heading font-black text-slate-900">Recent Activity</h3>
                      <button 
                        onClick={() => setActiveTab("orders")}
                        className="text-xs font-black text-primary uppercase tracking-widest hover:underline"
                      >
                        View All
                      </button>
                    </div>
                    <div className="p-2">
                       {isLoading ? (
                         <div className="p-12 text-center text-slate-400 font-medium">Loading activity...</div>
                       ) : orders.length > 0 ? (
                         <div className="space-y-1">
                           {orders.slice(0, 3).map((order) => (
                             <div key={order.id} className="p-6 hover:bg-slate-50 rounded-4xl transition-colors flex items-center justify-between group">
                               <div className="flex items-center gap-6">
                                 <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white transition-colors">
                                   <ShoppingBag size={24} />
                                 </div>
                                 <div>
                                   <div className="font-heading font-black text-slate-900 text-lg">Order #{order.id}</div>
                                   <div className="text-sm text-slate-500 font-medium">
                                     {new Date(order.date_created).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                   </div>
                                 </div>
                               </div>
                               <div className="flex items-center gap-8">
                                 <div className="text-right hidden sm:block">
                                   <div className="font-heading font-black text-primary italic">£{parseFloat(order.total).toFixed(2)}</div>
                                   <div className={`text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                     {order.status}
                                   </div>
                                 </div>
                                 <ChevronRight className="text-slate-300 group-hover:text-primary transition-colors" />
                               </div>
                             </div>
                           ))}
                         </div>
                       ) : (
                         <div className="p-12 text-center space-y-4">
                           <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                             <AlertCircle size={32} />
                           </div>
                           <p className="text-slate-500 font-medium">No orders found yet. Start your journey!</p>
                           <Link href="/" className="btn-base btn-primary inline-block">Shop Now</Link>
                         </div>
                       )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                      <h3 className="text-xl font-heading font-black text-slate-900">Your Orders</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">Track and manage all your past purchases.</p>
                    </div>
                    
                    <div className="p-4">
                      {isLoading ? (
                        <div className="p-20 text-center text-slate-400 font-bold">Loading your orders...</div>
                      ) : orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="border border-slate-100 rounded-4xl p-8 hover:border-primary/20 transition-all hover:shadow-premium group">
                              <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-4">
                                    <span className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                      #{order.id}
                                    </span>
                                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${getStatusBg(order.status)}`}>
                                      {order.status}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-8 text-slate-500">
                                    <div className="flex items-center gap-2">
                                      <Clock size={16} />
                                      <span className="text-sm font-bold">{new Date(order.date_created).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Package size={16} />
                                      <span className="text-sm font-bold">{order.line_items.length} Items</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-row md:flex-col justify-between md:items-end gap-2">
                                  <div className="text-3xl font-heading font-black text-primary italic">£{parseFloat(order.total).toFixed(2)}</div>
                                  <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2 mt-2">
                                    View Details <ChevronRight size={14} />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-4 sm:grid-cols-6 gap-4 overflow-x-auto pb-2">
                                {order.line_items.slice(0, 4).map((item: any, idx: number) => (
                                  <div key={idx} className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 p-2 group-hover:bg-white transition-colors relative">
                                    <img 
                                      src={item.image?.src || "/placeholder.png"} 
                                      alt={item.name}
                                      className="w-full h-full object-contain"
                                    />
                                    {item.quantity > 1 && (
                                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-glow">
                                        {item.quantity}
                                      </span>
                                    )}
                                  </div>
                                ))}
                                {order.line_items.length > 4 && (
                                  <div className="aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                    +{order.line_items.length - 4} MORE
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-20 text-center">
                          <ShoppingBag size={48} className="text-slate-200 mx-auto mb-6" />
                          <h4 className="text-xl font-heading font-black text-slate-900 mb-2">No Orders Yet</h4>
                          <p className="text-slate-500 mb-8 max-w-xs mx-auto">Your order history is currently empty. Start shopping for authentic spices!</p>
                          <Link href="/" className="btn-base btn-primary">Start Shopping</Link>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-5xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                      <h3 className="text-xl font-heading font-black text-slate-900">Account Settings</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">Manage your personal information and contact details.</p>
                    </div>
                    
                    <form onSubmit={handleUpdateProfile} className="p-8 space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">First Name</label>
                          <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input 
                              name="first_name"
                              type="text" 
                              defaultValue={profileData?.first_name || user.name.split(" ")[0]} 
                              className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Last Name</label>
                          <div className="relative">
                             <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input 
                              name="last_name"
                              type="text" 
                              defaultValue={profileData?.last_name || user.name.split(" ").slice(1).join(" ")} 
                              className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address (Primary)</label>
                          <div className="relative">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input 
                              type="email" 
                              disabled 
                              value={user.email} 
                              className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-100 text-slate-400 cursor-not-allowed outline-none font-bold"
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-medium italic ml-4 mt-1">* Email changes require support verification for security.</p>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Phone Number</label>
                          <div className="relative">
                            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            <input 
                              name="phone"
                              type="tel" 
                              defaultValue={profileData?.billing?.phone || ""} 
                              placeholder="+44 XXXX XXXXXX"
                              className="w-full pl-16 pr-8 py-5 rounded-3xl border-2 border-slate-50 bg-slate-50 focus:bg-white focus:border-primary transition-all outline-none font-bold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-slate-50 flex justify-end">
                        <button type="submit" className="btn-base btn-primary px-12 !py-4 shadow-glow">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Delivery Address Preview */}
                  <div className="bg-slate-900 rounded-5xl p-10 text-white relative overflow-hidden group shadow-2xl">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                     <div className="relative z-10 flex justify-between items-start">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest">
                              <MapPin size={14} /> Default Shipping Address
                           </div>
                           {profileData?.shipping?.address_1 ? (
                              <div className="space-y-1">
                                 <div className="text-2xl font-heading font-black">{profileData.shipping.first_name} {profileData.shipping.last_name}</div>
                                 <div className="text-slate-400 font-medium">{profileData.shipping.address_1}</div>
                                 <div className="text-slate-400 font-medium">{profileData.shipping.city}, {profileData.shipping.postcode}</div>
                                 <div className="text-slate-400 font-medium">{profileData.shipping.country}</div>
                              </div>
                           ) : (
                              <p className="text-slate-400 font-medium">No shipping address saved yet. You can add one during checkout.</p>
                           )}
                        </div>
                        <Link href="/checkout" className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                           <ChevronRight size={20} />
                        </Link>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function NavButton({ active, onClick, icon, label, badge }: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all group ${
        active 
          ? "bg-primary text-white shadow-glow translate-x-2" 
          : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest">
        <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-primary"} transition-colors`}>
          {icon}
        </span>
        {label}
      </div>
      {badge !== undefined && (
        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-white p-8 rounded-5xl border border-slate-100 shadow-sm flex items-center gap-6">
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</div>
        <div className="text-3xl font-heading font-black text-slate-900 leading-none">{value}</div>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'completed': return 'text-success';
    case 'processing': return 'text-blue-500';
    case 'pending': return 'text-amber-500';
    case 'cancelled': return 'text-red-500';
    default: return 'text-slate-400';
  }
}

function getStatusBg(status: string) {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-success/10 text-success';
    case 'processing': return 'bg-blue-50 text-blue-500';
    case 'pending': return 'bg-amber-50 text-amber-500';
    case 'cancelled': return 'bg-red-50 text-red-500';
    default: return 'bg-slate-50 text-slate-400';
  }
}
