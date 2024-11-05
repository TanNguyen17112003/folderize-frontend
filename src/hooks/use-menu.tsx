import { useCallback, useState, MouseEvent } from 'react';

interface MenuController<T> {
  data?: T;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleOpen: (event: MouseEvent<HTMLElement>, data?: T) => void;
  open: boolean;
}

export function useMenu<T = unknown>(): MenuController<T> {
  const [state, setState] = useState<{ open: boolean; data?: T; anchorEl: HTMLElement | null }>({
    open: false,
    data: undefined,
    anchorEl: null
  });

  const handleOpen = useCallback((event: MouseEvent<HTMLElement>, data?: T): void => {
    setState({
      open: true,
      data,
      anchorEl: event.currentTarget
    });
  }, []);

  const handleClose = useCallback((): void => {
    setState({
      open: false,
      data: undefined,
      anchorEl: null
    });
  }, []);

  return {
    data: state.data,
    anchorEl: state.anchorEl,
    handleClose,
    handleOpen,
    open: state.open
  };
}
