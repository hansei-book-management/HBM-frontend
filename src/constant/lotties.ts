import { CheckLottie, FailLottie, LoadingLottie, NoDataLottie, NonePageLottie } from '@/lotties';

const statusOptions = {
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
  },
};

export const checkLottieOptions = {
  animationData: CheckLottie,
  ...statusOptions,
};

export const failLottieOptions = {
  animationData: FailLottie,
  ...statusOptions,
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
  },
};

export const loadingLottieOptions = {
  animationData: LoadingLottie,
  ...defaultOptions,
};

export const notFoundPageLottieOptions = {
  animationData: NonePageLottie,
  ...defaultOptions,
};

export const noDataLottieOptions = {
  animationData: NoDataLottie,
  ...defaultOptions,
};
