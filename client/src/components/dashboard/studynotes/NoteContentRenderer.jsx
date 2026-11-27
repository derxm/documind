import React from 'react';

/**
 * Renders an array of structured content blocks without dangerouslySetInnerHTML.
 * Block types: heading | paragraph | bullet-list | numbered-list
 *
 * @param {Object} props
 * @param {Array}  props.sections
 */
export function NoteContentRenderer({ sections }) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-4">
      {sections.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3
                key={i}
                className="text-base font-bold text-primary tracking-tight mt-5 first:mt-0"
              >
                {block.text}
              </h3>
            );

          case 'paragraph':
            return (
              <p key={i} className="text-sm text-text-primary leading-relaxed">
                {block.text}
              </p>
            );

          case 'bullet-list':
            return (
              <ul key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'numbered-list':
            return (
              <ol key={i} className="space-y-2 pl-1">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-text-primary leading-relaxed"
                  >
                    <span className="shrink-0 h-5 w-5 rounded-full bg-accent-secondary text-accent text-[10px] font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default NoteContentRenderer;
