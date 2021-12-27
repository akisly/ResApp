import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ua from "./ua.json";
import ru from "./ru.json";

i18next
	.use(initReactI18next)
	.init({
		lng: 'en',
		compatibilityJSON: 'v3',
		resources: {
			en,
			ua,
			ru,
		},
		react: {
			useSuspense: false,
		},
	});

export default i18next;
