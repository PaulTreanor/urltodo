import React, { useState, useEffect, useRef } from 'react';

const TypewriterEditableTitle = () => {
  // Default placeholder text
  const defaultTitle = 'Untitled List';
  
  // State for the current title and editing mode
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animatedText, setAnimatedText] = useState('');
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  
  // Ref for the input element
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Typewriter animation effect
  useEffect(() => {
    // Force a microtask to ensure consistent timing
    Promise.resolve().then(() => {
      if (isAnimating) {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= defaultTitle.length) {
            setAnimatedText(defaultTitle.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setTitle(defaultTitle);
            setIsAnimating(false);
          }
        }, 100);
        
        return () => clearInterval(interval);
      }
    });
  }, [isAnimating]);
  
  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  // Handle click on the title to enable editing
  const handleTitleClick = () => {
    if (!isAnimating && !isEditing) {
      setIsEditing(true);
    }
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  
  // Handle saving the title (on blur or Enter key)
  const handleSave = () => {
    if (title.trim() === '') {
      // If title is empty, reset to default
      setTitle(defaultTitle);
    }
    setIsEditing(false);
    setHasBeenEdited(true);
  };
  
  // Handle key press events (for Enter key)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center bg-neutral-50 mb-4">
      <div className="w-full max-w-md">
        {isAnimating ? (
          // During animation, show the animated text
          <h1 className="text-2xl font-bold text-neutral-800 border-b-2 border-transparent py-2 cursor-default">
            {animatedText}<span className="animate-pulse">|</span>
          </h1>
        ) : isEditing ? (
          // When editing, show the input field
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={handleInputChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold text-neutral-800 w-full py-2 px-1 border-b-2 border-amber-500 focus:outline-none bg-transparent"
            placeholder={defaultTitle}
          />
        ) : (
          // After animation and not editing, show the title as text
          <h1 
            onClick={handleTitleClick}
            className="text-2xl font-bold text-neutral-800 border-b-2 border-transparent hover:border-neutral-300 py-2 cursor-pointer transition-all duration-200"
          >
            {title}
          </h1>
        )}
        
        {!isAnimating && !isEditing && !hasBeenEdited && (
          <p className="text-sm text-neutral-500">
            Click the title to edit
          </p>
        )}
      </div>
    </div>
  );
};

export default TypewriterEditableTitle;