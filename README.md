# Latero 📣

**Latero** is a mobile app developed using **React Native** + **Expo**,  
designed to record voice messages and schedule them as notifications to remind you at just the right time.

---

## 🚀 Features

- 🎹 Record voice messages directly from your device.
- ⏰ Schedule voice reminders for any future date and time.
- 📲 Receive local push notifications with a custom icon.
- 📋 View a list of all scheduled reminders.
- 🗑️ (Coming Soon) Delete or reschedule existing reminders.
- 🌎 Automatic multi-language support based on device language.

---

## 📂 Project Structure

```bash
/app
  ├── index.tsx             # Home screen
  ├── create.tsx            # Create and schedule a new reminder
  ├── notifications.tsx     # List scheduled reminders
/assets
  ├── images/               # App icons, splash screens
  ├── notification-icon.png # Custom notification icon
/components
  ├── (coming soon reusable components)
/utils
  ├── strings.ts            # Multi-language strings
```

---

## 📲 Local Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/latero.git
cd latero
```

2. Install dependencies:

```bash
npm install
```

3. Install native modules:

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install expo-notifications expo-av expo-localization expo-secure-store
```

4. Start the development server:

```bash
npx expo start --dev-client
```

(You must use a **Development Client** build to run the app.)

---

## 🛠️ Building the Development Client

Whenever you add new native dependencies, rebuild the development client:

```bash
eas build -p android --profile development
```

(Or for iOS:)

```bash
eas build -p ios --profile development
```

---

## ⚙️ Special Configuration

- Notifications use a custom icon: `assets/notification-icon.png`
- Notification accent color: Latero Blue (`#1E40AF`)
- Custom splash screen integrated.

**Note:** Changes to icons, splash screen, or notification settings require a new `eas build`.

---

## 📋 Reminder Management

When you schedule a reminder:

1. It is saved locally using `AsyncStorage` under the key `reminders`.
2. A local notification is scheduled for the selected date and time.
3. You can view all reminders in the `/notifications` screen.

---

## 🧹 Tech Stack

- **Expo Router** (v4)
- **React Native 0.76**
- **TypeScript**
- **Expo Notifications**
- **Expo AV** (for audio recording)
- **Expo Secure Store**
- **AsyncStorage**

---

## 🌟 Roadmap (Upcoming Features)

- 🗑️ Delete saved reminders.
- 📝 Edit scheduled reminders.
- 🔁 Recurring reminders (optional).
- ☁️ Cloud sync (optional).

---

## 👨‍💻 Developer

- **Pedro Díaz**
- [LinkedIn](https://www.linkedin.com/in/josepedrodiaz/) | [GitHub](https://github.com/josepedrodiaz/)

---

## 📌 License

Latero is an open-source project.
