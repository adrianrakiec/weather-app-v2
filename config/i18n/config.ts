import pl from './resources/pl.json';

export default defineI18nConfig(() => ({
  legacy: false,
  globalInjection: true,
  locale: 'pl',
  messages: {
    pl,
  },
}));
