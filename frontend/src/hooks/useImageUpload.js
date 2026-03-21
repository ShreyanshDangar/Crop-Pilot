import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhaseImage, removePhaseImage, setSoilReport, removeSoilReport } from "../store/slices/phaseSlice.js";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_DOC_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_FILE_SIZE = 15 * 1024 * 1024;
function validateFile(file, allowedTypes) {
  if (!allowedTypes.includes(file.type)) {
    return `${file.name}: File type not supported`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `${file.name}: File too large (max 15MB)`;
  }
  return null;
}
function createImageData(file) {
  return {
    file,
    name: file.name,
    size: file.size,
    type: file.type,
    preview: URL.createObjectURL(file),
  };
}
export function useImageUpload(phaseKey) {
  const dispatch = useDispatch();
  const images = useSelector((s) => s.phase[phaseKey]?.images) || [null, null, null, null];
  const soilReport = useSelector((s) => s.phase[phaseKey]?.soilReport) || null;
  const addImage = useCallback((index, file) => {
    const error = validateFile(file, ALLOWED_IMAGE_TYPES);
    if (error) return error;
    const imageData = createImageData(file);
    dispatch(setPhaseImage({ phase: phaseKey, index, image: imageData }));
    return null;
  }, [dispatch, phaseKey]);
  const addMultipleImages = useCallback((files) => {
    const errors = [];
    const validFiles = [];
    for (const file of files) {
      const error = validateFile(file, ALLOWED_IMAGE_TYPES);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    }
    let slotIndex = 0;
    for (const file of validFiles) {
      while (slotIndex < 4 && images[slotIndex] !== null) {
        slotIndex++;
      }
      if (slotIndex >= 4) break;
      const imageData = createImageData(file);
      dispatch(setPhaseImage({ phase: phaseKey, index: slotIndex, image: imageData }));
      slotIndex++;
    }
    return errors;
  }, [dispatch, phaseKey, images]);
  const removeImage = useCallback((index) => {
    if (images[index]?.preview) {
      URL.revokeObjectURL(images[index].preview);
    }
    dispatch(removePhaseImage({ phase: phaseKey, index }));
  }, [dispatch, phaseKey, images]);
  const addSoilReport = useCallback((file) => {
    const error = validateFile(file, ALLOWED_DOC_TYPES);
    if (error) return error;
    const fileData = createImageData(file);
    dispatch(setSoilReport({ phase: phaseKey, file: fileData }));
    return null;
  }, [dispatch, phaseKey]);
  const clearSoilReport = useCallback(() => {
    if (soilReport?.preview) {
      URL.revokeObjectURL(soilReport.preview);
    }
    dispatch(removeSoilReport({ phase: phaseKey }));
  }, [dispatch, phaseKey, soilReport]);
  return {
    images,
    soilReport,
    addImage,
    addMultipleImages,
    removeImage,
    addSoilReport,
    clearSoilReport,
  };
}
