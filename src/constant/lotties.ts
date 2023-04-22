import { CheckLottie, LoadingLottie, NoDataLottie, NonePageLottie } from '@/lotties';

export const checkLottieOptions = {
  loop: false,
  autoplay: true,
  animationData: CheckLottie,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
    progressiveLoad: true,
  },
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
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
