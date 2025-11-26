

import kbank from './kbank.svg';
import kakaobank from './kakaobank.svg';
import tossbank from './tossbank.svg';
import sinhanbank from './sinhanbank.svg';
import menu from './menu.svg';


export const paymentIcons = {
  kbank,
  kakaobank,
  tossbank,
  sinhanbank,
  menu,
} as const;

export type PaymentIconName = keyof typeof paymentIcons;