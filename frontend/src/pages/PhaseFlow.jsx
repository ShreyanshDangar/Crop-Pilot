import { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Send, AlertCircle, X } from "lucide-react";
import Header from "../components/layout/Header.jsx";
import StepIndicator from "../components/layout/StepIndicator.jsx";
import QuestionCard from "../components/questions/QuestionCard.jsx";
import PhotoGrid from "../components/upload/PhotoGrid.jsx";
import DocumentUpload from "../components/upload/DocumentUpload.jsx";
import { usePhaseFlow } from "../hooks/usePhaseFlow.js";
import { useImageUpload } from "../hooks/useImageUpload.js";
import { PHOTO_SLOTS } from "../utils/constants.js";
import { gpuStyles, buttonTap } from "../utils/animations.js";
import { clearError } from "../store/slices/uiSlice.js";

function PhaseFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phaseKey = `phase${id}`;
  const error = useSelector((s) => s.ui.error);
  const {
    phaseConfig,
    inputs,
    cards,
    isSubmitting,
    questionStep,
    direction,
    totalSteps,
    isPhotoStep,
    currentQuestion,
    isLastStep,
    questions,
    formError,
    validationErrors,
    handleChange,
    goNext,
    goBack,
    handleSubmit,
  } = usePhaseFlow(id);
  const {
    images,
    soilReport,
    addImage,
    addMultipleImages,
    removeImage,
    addSoilReport,
    clearSoilReport,
  } = useImageUpload(phaseKey);

  useEffect(() => {
    if (cards.length > 0) {
      navigate(`/dashboard/phase/${id}/results`, { replace: true });
    }
  }, [cards.length, id, navigate]);

  useEffect(() => {
    if (!phaseConfig) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, phaseConfig]);

  const stepLabels = useMemo(() => {
    if (!phaseConfig) return [];
    const labels = questions.map((question) => question.title);
    return phaseConfig.hasPhotos ? ["Upload evidence", ...labels] : labels;
  }, [phaseConfig, questions]);

  if (!phaseConfig) return null;

  const slots = PHOTO_SLOTS[phaseKey] || [];

  function onSubmitClick() {
    handleSubmit();
  }

  return (
    <div className="cp-page-shell min-h-dvh bg-brand-50">
      <Header showBack backTo="/dashboard" title={`Phase ${phaseConfig.id}: ${phaseConfig.title}`} />

      <main className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10 xl:px-16 xl:py-12 2xl:px-24">
        <section>
          <p className="cp-section-label">Phase {phaseConfig.id}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:mt-4 lg:text-5xl">
            {phaseConfig.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-text-muted lg:mt-5 lg:text-xl lg:leading-9">{phaseConfig.description}</p>
        </section>

        <section className="mt-10 lg:mt-12">
          <StepIndicator current={questionStep} total={totalSteps} labels={stepLabels} />
        </section>

        <AnimatePresence>
          {formError ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" strokeWidth={2} />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Complete this step</p>
                  <p className="mt-1 text-sm text-amber-700">{formError}</p>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-6 rounded-[18px] border border-red-200 bg-red-50 px-4 py-3"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" strokeWidth={2} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-red-700">Analysis failed</p>
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(clearError())}
                  className="shrink-0 rounded-lg p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="mt-8 min-h-[320px] lg:mt-10">
          {isPhotoStep ? (
            <div>
              <PhotoGrid
                slots={slots}
                images={images}
                onAddImage={addImage}
                onAddMultiple={addMultipleImages}
                onRemoveImage={removeImage}
              />
              {phaseConfig.hasSoilReport ? (
                <DocumentUpload
                  file={soilReport}
                  onAdd={addSoilReport}
                  onRemove={clearSoilReport}
                />
              ) : null}
            </div>
          ) : currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              values={inputs}
              errors={validationErrors}
              onChange={handleChange}
              direction={direction}
              stepKey={`${phaseKey}-${questionStep}`}
            />
          ) : null}
        </section>

        <div className="sticky bottom-4 z-20 mt-8 lg:mt-10">
          <div className="cp-action-dock flex flex-col gap-3 px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-4">
            <motion.button
              type="button"
              onClick={questionStep === 0 ? () => navigate("/dashboard") : goBack}
              {...buttonTap}
              style={gpuStyles}
              className="cp-btn cp-btn-secondary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </motion.button>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
              <p className="text-sm text-text-muted">
                {isPhotoStep
                  ? "Uploads are optional, but more evidence can improve the recommendation."
                  : currentQuestion?.skippable
                  ? "This step can be skipped if it is not relevant."
                  : "Complete the visible required fields to continue."}
              </p>

              <div className="flex items-center justify-end gap-3">
                {currentQuestion?.skippable ? (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    {...buttonTap}
                    style={gpuStyles}
                    className="cp-btn cp-btn-ghost text-sm"
                  >
                    Skip
                  </motion.button>
                ) : null}

                {isLastStep ? (
                  <motion.button
                    type="button"
                    onClick={onSubmitClick}
                    disabled={isSubmitting}
                    {...buttonTap}
                    style={gpuStyles}
                    className="cp-btn cp-btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Get Recommendations
                      </>
                    )}
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={goNext}
                    {...buttonTap}
                    style={gpuStyles}
                    className="cp-btn cp-btn-primary"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PhaseFlow;
