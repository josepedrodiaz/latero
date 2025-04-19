import * as Localization from 'expo-localization';

const lang = Localization.locale.startsWith('es') ? 'es' : 'en';

const strings = {
  es: {
    splashTitle: "Latero",
    splashSubtitle: "Recordatorios en el momento justo.",
    getStarted: "Empezar",
    myReminders: "Mis Recordatorios",
    newReminder: "Nuevo Recordatorio",
  },
  en: {
    splashTitle: "Latero",
    splashSubtitle: "Reminders right on time.",
    getStarted: "Get Started",
    myReminders: "My Reminders",
    newReminder: "New Reminder",
  }
};

export default strings[lang];
