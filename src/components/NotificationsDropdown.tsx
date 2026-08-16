'use client';

import React from 'react';
import { Bell, X, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  
  const notifications = [
    {
      id: 1,
      title: "ব্রেকিং নিউজ",
      message: "মালয়েশিয়ায় নতুন ভিসা চালু, বিস্তারিত জানতে ক্লিক করুন।",
      time: "১০ মিনিট আগে",
      icon: Info,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "আপনার প্রোফাইল সম্পূর্ণ করুন",
      message: "আপনার প্রোফাইলের তথ্য আপডেট করে রাখুন।",
      time: "১ ঘন্টা আগে",
      icon: AlertTriangle,
      color: "text-amber-500",
      bgColor: "bg-amber-50"
    },
    {
      id: 3,
      title: "পাসওয়ার্ড পরিবর্তন সফল",
      message: "আপনার অ্যাকাউন্টের পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।",
      time: "গতকাল",
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/10"
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-4 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-gray-100 z-[70] overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Bell size={18} className="text-gray-500" />
                নোটিফিকেশন
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 bg-white rounded-full p-1 shadow-sm">
                <X size={16} />
              </button>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer flex gap-3">
                    <div className={`mt-0.5 p-2 rounded-full h-fit ${notification.bgColor} ${notification.color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notification.message}</p>
                      <span className="text-[10px] text-gray-400 mt-2 block">{notification.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-3 bg-gray-50 text-center">
              <button className="text-sm text-blue-600 font-medium hover:underline">
                সব নোটিফিকেশন দেখুন
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
