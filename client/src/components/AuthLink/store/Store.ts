export function createStore() {
  return {
    openLoginDialog: false,
    openRegisterDialog: false,
    openForgotPasswordDialog: false,
    setOpenLoginDialog(open: boolean) {
      this.openLoginDialog = open;
    },
    setOpenRegisterDialog(open: boolean) {
      this.openRegisterDialog = open;
    },
    setOpenForgotPasswordDialog(open: boolean) {
      this.openForgotPasswordDialog = open;
    },
  };
}
