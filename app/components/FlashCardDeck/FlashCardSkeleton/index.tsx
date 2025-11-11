'use client';

import { motion } from 'framer-motion';

export const FlashCardSkeleton = () => {
  return (
    <div className="w-full bg-bg-secondary flex items-center justify-center">
      <div className="w-full max-w-[800px] md:h-[587px] h-[521px] relative">
        {/* 一整块的骨架屏 - 带流光动画 */}
        <div className="w-full h-full bg-utility-scrollbar/30 rounded-2xl shadow-lg overflow-hidden relative">
          {/* 流光扫过动画 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};
