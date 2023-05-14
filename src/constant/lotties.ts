import { CheckLottie, FailLottie, LoadingLottie, NoDataLottie, NonePageLottie } from '@/lotties';

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
  },
};

export const checkLottieOptions = {
  animationData: CheckLottie,
  ...defaultOptions,
};

export const loadingLottieOptions = {
  animationData: LoadingLottie,
  ...defaultOptions,
};

export const NotFoundLottieOptions = {
  animationData: NonePageLottie,
  ...defaultOptions,
};

export const NoDataLottieOptions = {
  animationData: NoDataLottie,
  ...defaultOptions,
};

export const FailLottieOptions = {
  animationData: FailLottie,
  ...defaultOptions,
};
