'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import DataFlowVisualization from './components/DataFlowVisualization';
import InteractiveGrid from './components/InteractiveGrid';
import FloatingParticles from './components/FloatingParticles';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 mesh-gradient" />
      <FloatingParticles />
      <InteractiveGrid mousePosition={mousePosition} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
      >
        <div className="text-2xl font-bold gradient-text">Neural Flow</div>
        <div className="flex gap-8 items-center">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Product</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Solutions</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
          <button className="px-6 py-2 gradient-border rounded-full text-white hover:glow transition-all">
            Get Started
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-4 py-2 rounded-full gradient-border text-sm mb-6">
                <span className="gradient-text font-semibold">Powered by Multimodal AI</span>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Transform
                <br />
                <span className="gradient-text">Enterprise Data</span>
                <br />
                Into AI Workflows
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Convert unstructured proprietary data into intelligent workflow systems.
                Empower your AI agents with contextual understanding from your enterprise knowledge base.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105">
                Start Building
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 gradient-border rounded-full text-white hover:glow transition-all">
                View Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold gradient-text">10B+</div>
                <div className="text-sm text-gray-500">Data Points Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-gray-500">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text">50ms</div>
                <div className="text-sm text-gray-500">Avg Response Time</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Interactive Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <DataFlowVisualization />
          </motion.div>
        </div>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-8 pb-32"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Unstructured Data Ingestion',
              description: 'Parse PDFs, documents, emails, and proprietary formats into structured intelligence',
              icon: '📄'
            },
            {
              title: 'Workflow Mapping',
              description: 'Automatically identify and map business processes from historical data patterns',
              icon: '🔄'
            },
            {
              title: 'AI Agent Integration',
              description: 'Deploy intelligent agents that understand your enterprise context and workflows',
              icon: '🤖'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="p-8 gradient-border rounded-2xl backdrop-blur-sm hover:glow transition-all cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trusted By Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-8 pb-32"
      >
        <p className="text-center text-gray-500 mb-12">Trusted by forward-thinking enterprises</p>
        <div className="flex justify-center items-center gap-16 flex-wrap opacity-50">
          {['Enterprise A', 'Tech Corp', 'Global Industries', 'Innovation Labs', 'Future Systems'].map((company, i) => (
            <div key={i} className="text-2xl font-bold text-gray-700">{company}</div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="relative z-10 border-t border-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-gray-600 text-sm">
          <div>© 2024 Neural Flow. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </main>
  );
}
