import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Component that renders text with **bold** markdown syntax
 * Example: "This is **important** text" → This is <strong>important</strong> text
 * Also handles newlines correctly
 */
export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // Split by newlines first
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, lineIndex) => {
        // Split each line by **bold** markers
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) => {
              // Check if this part is wrapped in **
              if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the ** markers and wrap in <strong>
                const boldText = part.slice(2, -2);
                return <strong key={`${lineIndex}-${partIndex}`} className="font-semibold">{boldText}</strong>;
              }
              // Regular text
              return <React.Fragment key={`${lineIndex}-${partIndex}`}>{part}</React.Fragment>;
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}
