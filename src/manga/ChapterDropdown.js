import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChapterDropdown = ({ chapterList, mangaId }) => {
  const [selectedChapter, setSelectedChapter] = useState('');

  const history = useHistory();

  const handleChapterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedChapter(selectedValue);

    // Redirect to the ReadManga page with the selected chapter
    history.push(`/read/${mangaId}/${selectedValue}`);
  };

  return (
    <div className="w-full">
      <label htmlFor="chapter" className="font-semibold block py-2 sr-only items-center">Chương:</label>
      <select id="chapter"
        className="block px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        value={selectedChapter}
        onChange={handleChapterChange}>
        {chapterList.map((chapter) => (
          <option className="cursor-pointer" key={chapter.id} value={chapter.id}>
            {chapter.attributes.chapter} - {chapter.attributes.title}
          </option>
        ))}
      </select>
    </div>

  );
};

export default ChapterDropdown;