export const breakpoints = {
  mobile: 767,
  tablet: 1183,
};

export const TabName = {
  home: 'home',
  createTrip: 'createTrip',
  notifications: 'notifications',
};

export const MINIMUM_PASSWORD_LENGTH = 8;

export const AuthErrors: { [errorCode: string]: string } = {
  'auth/email-already-exists': 'Email này đã được sử dụng',
  'auth/email-already-in-use': 'Email này đã được sử dụng',
};

export const AppName = 'Sherdtrip';

export const tripTravelType: { [id: string]: string } = {
  'xe-may': '🛵 Xe máy',
  'xe-dap': '🚲 Xe đạp',
  'xe-o-to': '🚗 Xe ô tô',
  'xe-bus': '🚌 Xe bus',
  'xe-khach': '🚎 Xe khách',
  'may-bay': '✈️ Máy bay',
  'tau-thuy': '🚢 Tàu thủy',
};

export const DATE_FORMAT = 'DD/MM/YYYY';

export const ImageRatio = {
  landingSection1: 800 / 530,
  landingSection2: 982 / 710,
  landingSection3: 982 / 685,
};
