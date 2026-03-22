import { useCallback, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPhaseInput,
  setPhaseInputs,
  setQuestionStep,
  setPhaseSubmitting,
  setPhaseCards,
} from "../store/slices/phaseSlice.js";
import { setError } from "../store/slices/uiSlice.js";
import { PHASES, PHASE_QUESTIONS } from "../utils/constants.js";
import { analyzePhase } from "../services/phaseApi.js";
import { resolveInputs, validateQuestion } from "../utils/form.js";

export function usePhaseFlow(phaseId) {
  const dispatch = useDispatch();
  const numericId = Number(phaseId);
  const phaseKey = `phase${numericId}`;
  const phaseConfig = useMemo(() => PHASES.find((p) => p.id === numericId), [numericId]);
  const questions = useMemo(() => PHASE_QUESTIONS[numericId] || [], [numericId]);
  const phaseState = useSelector((s) => s.phase[phaseKey]);
  const { inputs, images, soilReport, cards, isSubmitting, questionStep } = phaseState || {};
  const [direction, setDirection] = useState(1);
  const [formError, setFormError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const totalSteps = phaseConfig?.hasPhotos ? questions.length + 1 : questions.length;
  const isPhotoStep = phaseConfig?.hasPhotos && questionStep === 0;
  const questionIndex = phaseConfig?.hasPhotos ? questionStep - 1 : questionStep;
  const currentQuestion = isPhotoStep ? null : questions[questionIndex];
  const isLastStep = questionStep === totalSteps - 1;
  const resolvedInputs = useMemo(
    () => resolveInputs(questions, inputs || {}),
    [questions, inputs]
  );

  const handleChange = useCallback((field, value) => {
    dispatch(setPhaseInput({ phase: phaseKey, field, value }));
    setValidationErrors((prev) => {
      if (!prev[field]) return prev;
      const nextErrors = { ...prev };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormError("");
  }, [dispatch, phaseKey]);

  const goNext = useCallback(() => {
    if (currentQuestion) {
      const nextErrors = validateQuestion(currentQuestion, resolvedInputs);
      if (Object.keys(nextErrors).length > 0) {
        setValidationErrors(nextErrors);
        setFormError("Complete the required fields to continue.");
        return;
      }
    }

    setValidationErrors({});
    setFormError("");
    if (questionStep < totalSteps - 1) {
      setDirection(1);
      dispatch(setQuestionStep({ phase: phaseKey, step: questionStep + 1 }));
    }
  }, [currentQuestion, dispatch, phaseKey, questionStep, resolvedInputs, totalSteps]);

  const goBack = useCallback(() => {
    setValidationErrors({});
    setFormError("");
    if (questionStep > 0) {
      setDirection(-1);
      dispatch(setQuestionStep({ phase: phaseKey, step: questionStep - 1 }));
    }
  }, [dispatch, phaseKey, questionStep]);

  const handleSubmit = useCallback(async (modifier) => {
    const firstInvalidQuestion = questions.findIndex((question) => {
      const nextErrors = validateQuestion(question, resolvedInputs);
      return Object.keys(nextErrors).length > 0;
    });

    if (firstInvalidQuestion !== -1) {
      const invalidQuestion = questions[firstInvalidQuestion];
      const nextErrors = validateQuestion(invalidQuestion, resolvedInputs);
      const invalidStep = phaseConfig?.hasPhotos ? firstInvalidQuestion + 1 : firstInvalidQuestion;

      setValidationErrors(nextErrors);
      setFormError("Complete the required fields before requesting recommendations.");
      setDirection(invalidStep >= questionStep ? 1 : -1);
      dispatch(setQuestionStep({ phase: phaseKey, step: invalidStep }));
      return;
    }

    dispatch(setPhaseSubmitting({ phase: phaseKey, value: true }));
    dispatch(setError(null));
    dispatch(setPhaseInputs({ phase: phaseKey, inputs: resolvedInputs }));
    setValidationErrors({});
    setFormError("");
    try {
      const submitFn = analyzePhase[numericId];
      const payload = numericId === 1
        ? { inputs: resolvedInputs, modifier }
        : { inputs: resolvedInputs, images, soilReport, modifier };
      const res = await submitFn(payload);
      dispatch(setPhaseCards({ phase: phaseKey, cards: res.data.cards }));
    } catch (err) {
      dispatch(setError(err.message || "Analysis failed. Please try again."));
    } finally {
      dispatch(setPhaseSubmitting({ phase: phaseKey, value: false }));
    }
  }, [
    dispatch,
    phaseConfig?.hasPhotos,
    phaseKey,
    questionStep,
    numericId,
    questions,
    resolvedInputs,
    images,
    soilReport,
  ]);

  return {
    phaseConfig,
    questions,
    inputs: resolvedInputs,
    images: images || [null, null, null, null],
    soilReport,
    cards: cards || [],
    isSubmitting,
    questionStep,
    direction,
    totalSteps,
    isPhotoStep,
    currentQuestion,
    isLastStep,
    questionIndex,
    formError,
    validationErrors,
    handleChange,
    goNext,
    goBack,
    handleSubmit,
  };
}
