'use client';

import React from 'react';
import { LogOut, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Perform logout logic here (e.g. clear cookies/storage)
    // Then redirect to home
    router.push('/');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden"
          >
            <div className="flex flex-col items-center p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <LogOut size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">লগ আউট করতে চান?</h3>
              <p className="text-gray-500 text-sm mb-6">
                আপনি কি নিশ্চিত যে আপনি আপনার অ্যাকাউন্ট থেকে লগ আউট করতে চান? আপনাকে পুনরায় লগ ইন করতে হবে।
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  বাতিল
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition shadow-md shadow-red-600/20"
                >
                  লগ আউট
                </button>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 rounded-full p-1"
            >
              <X size={20} />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
