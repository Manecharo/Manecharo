import React from 'react';

interface FormattedTextProps {
  text: string;
  className?: string;
}

/**
 * Component that renders text with **bold** markdown syntax
 * Example: "This is **important** text" → This is <strong>important</strong> text
 */
export default function FormattedText({ text, className = '' }: FormattedTextProps) {
  // Split text by **bold** markers and render with <strong> tags
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part is wrapped in **
        if (part.startsWith('**') && part.endsWith('**')) {
          // Remove the ** markers and wrap in <strong>
          const boldText = part.slice(2, -2);
          return <strong key={index}>{boldText}</strong>;
        }
        // Regular text
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
