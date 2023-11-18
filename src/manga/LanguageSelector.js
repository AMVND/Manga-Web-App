import React from 'react';

const LanguageSelector = ({ languages, selectedLanguage, onSelectLanguage }) => {
  return (
    <div>
      <label htmlFor="language">Select Language: </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onSelectLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
