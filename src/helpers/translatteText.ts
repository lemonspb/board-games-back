import translatte = require('translatte');

export interface ReturnTranslatte {
  text: string;
  raw: string;
  from: {
    language: { didYouMean: boolean; iso: string };
    text: { autoCorrected: boolean; value: string; didYouMean: boolean };
  };
  proxy: string;
  agent: string;
  service: { google_free: boolean };
}

export async function translatteText(text, from = 'en', to = 'ru') {
  if (!text) return '';
  else {
    let transletedText: ReturnTranslatte = await translatte(text, {
      from: from,
      to: to,
    });
    return transletedText.text;
  }
}
