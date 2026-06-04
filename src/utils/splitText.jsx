/**
 * Custom text splitting utility
 * Splits text content into individually wrapped characters, words, or lines
 * for GSAP animation purposes.
 */

/**
 * Splits a text string into an array of character spans
 * @param {string} text - The text to split
 * @param {string} className - CSS class for each character wrapper
 * @returns {Array<JSX.Element>} Array of span elements
 */
export function splitIntoChars(text, className = 'char') {
  return text.split('').map((char, i) => (
    char === ' ' ? (
      <span key={i} className={className} style={{ display: 'inline-block', width: '0.3em' }}>
        &nbsp;
      </span>
    ) : (
      <span key={i} className={className} style={{ display: 'inline-block' }}>
        {char}
      </span>
    )
  ));
}

/**
 * Splits text into word spans, each containing character spans
 * @param {string} text - The text to split
 * @returns {Array<JSX.Element>} Array of word wrapper elements
 */
export function splitIntoWords(text) {
  return text.split(' ').map((word, wordIndex) => (
    <span key={wordIndex} className="word" style={{ display: 'inline-block', marginRight: '0.3em' }}>
      {word.split('').map((char, charIndex) => (
        <span key={charIndex} className="char" style={{ display: 'inline-block' }}>
          {char}
        </span>
      ))}
    </span>
  ));
}

/**
 * Splits text into lines (for paragraph text with mask reveal)
 * @param {string} text - The text to split
 * @param {number} wordsPerLine - Approximate words per line
 * @returns {Array<{text: string, index: number}>} Array of line objects
 */
export function splitIntoLines(text, wordsPerLine = 8) {
  const words = text.split(' ');
  const lines = [];
  
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push({
      text: words.slice(i, i + wordsPerLine).join(' '),
      index: lines.length,
    });
  }
  
  return lines;
}
