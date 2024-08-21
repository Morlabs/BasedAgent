import countries from 'i18n-iso-countries';
import * as flags from 'country-flag-icons/react/3x2';

// Initialize the countries data (optional, for localization)
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const CountryFlag = ({ countryName }) => {
  const countryCode = countries.getAlpha2Code(countryName, 'en');

  if (!countryCode) {
    return '';
  }

  const FlagComponent = flags[countryCode];

  if (!FlagComponent) {
    return '';
  }

  return (
    <div>
      <FlagComponent title={countryName} className="flag" />
    </div>
  );
};

export default CountryFlag;
