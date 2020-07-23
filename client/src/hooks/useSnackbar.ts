import { useCallback } from 'react';
import { useSnackbar, OptionsObject } from 'notistack';

const defaultOptions = {
  variant: 'error',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
} as OptionsObject;

const useSnackBar = (cb: Function) => {
  const snackbar = useSnackbar();
  return useCallback(async () => {
    try {
      await cb(snackbar);
    } catch (e) {
      snackbar.enqueueSnackbar(e.message, defaultOptions);
    }
  }, [cb, snackbar]);
};

export default useSnackBar;
