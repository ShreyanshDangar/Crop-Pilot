import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../components/layout/Header.jsx";
import PhaseCard from "../components/layout/PhaseCard.jsx";
import { PHASES } from "../utils/constants.js";
import { gpuStyles, fadeInUp, staggerContainer } from "../utils/animations.js";

const OVERVIEW_META = [
  "4 guided workflows",
  "28+ decision cards",
  "3 photo-aware phases",
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="cp-page-shell min-h-dvh bg-brand-50">
      <Header />

      <main className="px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16 xl:py-16 2xl:px-24">
        <motion.section {...fadeInUp} style={gpuStyles}>
          <p className="cp-section-label">Crop Pilot</p>
          <h2 className="cp-display mt-4 text-4xl leading-[1.08] text-text-primary sm:text-5xl lg:mt-5 lg:text-6xl xl:text-7xl xl:leading-[1.05]">
            Choose the right phase for the next farm decision.
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-text-muted lg:mt-6 lg:text-xl lg:leading-9 xl:max-w-5xl">
            Crop Pilot turns planning, crop care, harvest timing, and selling into guided workflows with clear steps and action-ready outputs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 lg:mt-10 lg:gap-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard/phase/1")}
              className="cp-btn cp-btn-primary"
            >
              Start with crop selection
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/phase/4")}
              className="cp-btn cp-btn-secondary"
            >
              Explore selling workflow
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted lg:mt-8">
            {OVERVIEW_META.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </motion.section>

        <section className="mt-16 lg:mt-20 xl:mt-24">
          <div>
            <p className="cp-section-label">Guided Workflows</p>
            <h3 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl lg:mt-4">
              Production-ready workflows
            </h3>
            <p className="mt-3 text-base leading-7 text-text-muted lg:mt-4 lg:text-lg lg:leading-8">
              Move directly into the phase that matches the decision you need to make now.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:gap-5 xl:grid-cols-4 xl:gap-6"
          >
            {PHASES.map((phase, index) => (
              <PhaseCard key={phase.id} phase={phase} index={index} />
            ))}
          </motion.div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
