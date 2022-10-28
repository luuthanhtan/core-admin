import { enLanguage } from './en';
import { viLanguage } from './vi';

const changeLanguage = (language) => {
    switch (language) {
        case "en":
            return enLanguage;
        case "vi":
            return viLanguage;

        default:
            return enLanguage;
    }
}
export default changeLanguage