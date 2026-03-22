import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Home, AlertCircle, X, Sparkles, CheckCircle2, Layers3 } from "lucide-react";
import Header from "../components/layout/Header.jsx";
import CardGrid from "../components/results/CardGrid.jsx";
import QuickActions from "../components/results/QuickActions.jsx";
import LoadingState from "../components/results/LoadingState.jsx";
import TopCropPicks from "../components/cards/phase1/TopCropPicks.jsx";
import Profitability from "../components/cards/phase1/Profitability.jsx";
import Resources from "../components/cards/phase1/Resources.jsx";
import WeatherTiming from "../components/cards/phase1/WeatherTiming.jsx";
import RiskLevel from "../components/cards/phase1/RiskLevel.jsx";
import ThirtyDayPlan from "../components/cards/phase1/ThirtyDayPlan.jsx";
import FertilizerGuidance from "../components/cards/phase2/FertilizerGuidance.jsx";
import PestPrevention from "../components/cards/phase2/PestPrevention.jsx";
import WeatherForecast from "../components/cards/phase2/WeatherForecast.jsx";
import SoilSustainability from "../components/cards/phase2/SoilSustainability.jsx";
import WaterPlanning from "../components/cards/phase2/WaterPlanning.jsx";
import MaintenancePlan from "../components/cards/phase2/MaintenancePlan.jsx";
import HarvestReadiness from "../components/cards/phase3/HarvestReadiness.jsx";
import BestWindow from "../components/cards/phase3/BestWindow.jsx";
import WeatherRisk from "../components/cards/phase3/WeatherRisk.jsx";
import LabourEstimate from "../components/cards/phase3/LabourEstimate.jsx";
import CostView from "../components/cards/phase3/CostView.jsx";
import PostHarvestCare from "../components/cards/phase3/PostHarvestCare.jsx";
import HarvestActionPlan from "../components/cards/phase3/HarvestActionPlan.jsx";
import SaleReadiness from "../components/cards/phase4/SaleReadiness.jsx";
import QualitySnapshot from "../components/cards/phase4/QualitySnapshot.jsx";
import PriceRange from "../components/cards/phase4/PriceRange.jsx";
import HistoricalPrice from "../components/cards/phase4/HistoricalPrice.jsx";
import CostMargin from "../components/cards/phase4/CostMargin.jsx";
import SellVsStore from "../components/cards/phase4/SellVsStore.jsx";
import StoragePartners from "../components/cards/phase4/StoragePartners.jsx";
import TransportOptions from "../components/cards/phase4/TransportOptions.jsx";
import BuyerVisibility from "../components/cards/phase4/BuyerVisibility.jsx";
import { resetPhase, setPhaseSubmitting, setPhaseCards } from "../store/slices/phaseSlice.js";
import { setError, clearError } from "../store/slices/uiSlice.js";
import { PHASES, QUICK_ACTIONS } from "../utils/constants.js";
import { analyzePhase } from "../services/phaseApi.js";
import { gpuStyles, buttonTap, fadeInUp } from "../utils/animations.js";
const CARD_RENDERERS = {
  topCropPicks: TopCropPicks,
  profitability: Profitability,
  resources: Resources,
  weatherTiming: WeatherTiming,
  riskLevel: RiskLevel,
  thirtyDayPlan: ThirtyDayPlan,
  fertilizerGuidance: FertilizerGuidance,
  pestPrevention: PestPrevention,
  weatherForecast: WeatherForecast,
  soilSustainability: SoilSustainability,
  waterPlanning: WaterPlanning,
  maintenancePlan: MaintenancePlan,
  harvestReadiness: HarvestReadiness,
  bestWindow: BestWindow,
  weatherRisk: WeatherRisk,
  labourEstimate: LabourEstimate,
  costView: CostView,
  postHarvestCare: PostHarvestCare,
  harvestActionPlan: HarvestActionPlan,
  saleReadiness: SaleReadiness,
  qualitySnapshot: QualitySnapshot,
  priceRange: PriceRange,
  historicalPrice: HistoricalPrice,
  costMargin: CostMargin,
  sellVsStore: SellVsStore,
  storagePartners: StoragePartners,
  transportOptions: TransportOptions,
  buyerVisibility: BuyerVisibility,
};
function PhaseResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const numericId = Number(id);
  const phaseKey = `phase${numericId}`;
  const phaseConfig = PHASES.find((p) => p.id === numericId);
  const phaseState = useSelector((s) => s.phase[phaseKey]);
  const error = useSelector((s) => s.ui.error);
  const { cards, inputs, images, soilReport, isSubmitting } = phaseState || {};
  const quickActions = QUICK_ACTIONS[numericId] || [];

  useEffect(() => {
    if ((!cards || cards.length === 0) && !isSubmitting) {
      navigate(`/dashboard/phase/${id}`, { replace: true });
    }
  }, [cards, id, isSubmitting, navigate]);

  async function handleQuickAction(action) {
    dispatch(setPhaseSubmitting({ phase: phaseKey, value: true }));
    dispatch(setError(null));
    try {
      const submitFn = analyzePhase[numericId];
      const payload = numericId === 1
        ? { inputs, modifier: action.modifier }
        : { inputs, images, soilReport, modifier: action.modifier };
      const res = await submitFn(payload);
      dispatch(setPhaseCards({ phase: phaseKey, cards: res.data.cards }));
    } catch (err) {
      dispatch(setError(err.message || "Re-analysis failed"));
    } finally {
      dispatch(setPhaseSubmitting({ phase: phaseKey, value: false }));
    }
  }
  function handleStartNew() {
    dispatch(resetPhase({ phase: phaseKey }));
    navigate("/dashboard");
  }

  if ((!cards || cards.length === 0) && !isSubmitting) {
    return null;
  }

  return (
    <div className="min-h-dvh bg-brand-50">
      <Header
        showBack
        backTo="/dashboard"
        title={`Phase ${numericId}: ${phaseConfig?.title || ""}`}
      />
      <main className="px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 xl:px-16 2xl:px-24">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 flex items-start gap-3 rounded-[24px] border border-red-200 bg-red-50 px-5 py-4"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" strokeWidth={2} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-red-700">Something went wrong</p>
                <p className="mt-0.5 text-sm text-red-600">{error}</p>
              </div>
              <button
                type="button"
                onClick={() => dispatch(clearError())}
                className="shrink-0 rounded-lg p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div {...fadeInUp} style={gpuStyles} className="mb-6 rounded-[32px] border border-border-light bg-[radial-gradient(circle_at_top_left,_rgba(207,225,187,0.42),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(244,250,240,0.9))] p-6 shadow-[0_28px_60px_rgba(114,129,86,0.1)] sm:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface/80 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                Analysis ready
              </div>
              <h2 className="mt-4 text-3xl font-bold text-text-primary sm:text-4xl">
                Your {phaseConfig?.title} results
              </h2>
              <p className="mt-3 text-base leading-8 text-text-muted">
                {cards?.length || 0} {phaseConfig?.outputLabel || "cards"} generated from the current inputs and evidence.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:w-[460px] 2xl:w-[520px]">
              <div className="rounded-[24px] border border-border-light bg-surface/80 px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-dim">Cards</p>
                <p className="mt-2 text-2xl font-extrabold text-text-primary">{cards?.length || 0}</p>
              </div>
              <div className="rounded-[24px] border border-border-light bg-surface/80 px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-dim">Inputs</p>
                <p className="mt-2 text-2xl font-extrabold text-text-primary">{Object.keys(inputs || {}).length}</p>
              </div>
              <div className="rounded-[24px] border border-brand-200 bg-brand-100/80 px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Evidence</p>
                <p className="mt-2 text-2xl font-extrabold text-brand-700">
                  {(images || []).filter(Boolean).length + (soilReport ? 1 : 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={handleStartNew}
              {...buttonTap}
              style={gpuStyles}
              className="cp-btn cp-btn-secondary text-sm"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                dispatch(resetPhase({ phase: phaseKey }));
                navigate(`/dashboard/phase/${id}`);
              }}
              {...buttonTap}
              style={gpuStyles}
              className="cp-btn cp-btn-secondary text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              Start over
            </motion.button>
          </div>
        </motion.div>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_440px]">
          <div>
            {isSubmitting ? (
              <LoadingState count={phaseConfig?.outputCount || 6} />
            ) : (
              <CardGrid>
                {(cards || []).map((card, i) => {
                  const Renderer = CARD_RENDERERS[card?.type];
                  if (!Renderer) return null;
                  return <Renderer key={`${card.type}-${i}`} data={card} />;
                })}
              </CardGrid>
            )}
          </div>

          <aside className="space-y-4 xl:sticky xl:top-[124px] xl:self-start">
            <div className="rounded-[28px] border border-border-light bg-surface p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-200">
                  <Layers3 className="h-5 w-5 text-brand-700" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">Result status</p>
                  <h3 className="mt-1 text-lg font-bold text-text-primary">Use or refine</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-text-muted">
                Review the recommendation cards on the left or trigger a focused follow-up run with one of the quick actions below.
              </p>
            </div>

            <QuickActions
              actions={quickActions}
              onAction={handleQuickAction}
              disabled={isSubmitting}
            />
          </aside>
        </section>
      </main>
    </div>
  );
}
export default PhaseResults;
