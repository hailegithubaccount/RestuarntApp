//// ALL AUTH ENDPOINTS

import { ENDPOINTS } from '../../api/config/endPoint';

export const authApi = {
  login: ENDPOINTS.auth.login,
  register: ENDPOINTS.auth.register,
  deviceLookup: ENDPOINTS.auth.device_lookup,
  preLogin: ENDPOINTS.auth.preLogin,
  verifyOtp: ENDPOINTS.auth.verify_otp,
  setPin: ENDPOINTS.auth.set_pin,
  forgetPin: ENDPOINTS.auth.forget_pin,
  forgetPinVerifyOtp: ENDPOINTS.auth.forget_pin_verify_otp,
  forgetPinReset: ENDPOINTS.auth.forget_pin_reset,
  changePin: ENDPOINTS.auth.change_pin,
  resendOtp: ENDPOINTS.auth.resend_otp,
  // check_pin_strength: ENDPOINTS.auth.check_pin_strength,
  // old_pin_checker: ENDPOINTS.auth.old_pin_checker,
  // accountLookup: ENDPOINTS.auth.account_lookup,
  // sessionTokenizer: ENDPOINTS.auth.session_tokenizer,
  // verify_pin: ENDPOINTS.auth.verify_pin,
  // activate_account: ENDPOINTS.auth.activate_account,
  // change_main_account: ENDPOINTS.auth.change_main_account,
  // get_push_token: ENDPOINTS.auth.get_push_token,
};
