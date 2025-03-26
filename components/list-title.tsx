import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEditableTitleProps {
	title: string;
	onTitleChange: (newTitle: string) => void;
	defaultTitle?: string;
}

const TypewriterEditableTitle = ({ 
	title, 
	onTitleChange, 
	defaultTitle = 'Untitled List' 
}: TypewriterEditableTitleProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [animatedText, setAnimatedText] = useState('');
	const [hasBeenEdited, setHasBeenEdited] = useState(false);
	const [localTitle, setLocalTitle] = useState('');
	
	// Initialize states after component mounts to avoid hydration mismatch
	useEffect(() => {
		setIsAnimating(!title);
		setHasBeenEdited(!!title);
		setLocalTitle(title || '');
	}, [title]);
	
	// Ref for the input element
	const inputRef = useRef<HTMLInputElement>(null);
	
	// Typewriter animation effect
	useEffect(() => {
		// Only animate if no title is provided
		if (isAnimating) {
			let currentIndex = 0;
			const interval = setInterval(() => {
				if (currentIndex <= defaultTitle.length) {
					setAnimatedText(defaultTitle.substring(0, currentIndex));
					currentIndex++;
				} else {
					clearInterval(interval);
					setLocalTitle(defaultTitle);
					setIsAnimating(false);
				}
			}, 100);
			
			return () => clearInterval(interval);
		}
	}, [isAnimating, defaultTitle]);
	
	// Focus the input when entering edit mode
	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isEditing]);
	
	const handleTitleClick = () => {
		if (!isAnimating && !isEditing) {
			setIsEditing(true);
		}
	};
	
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalTitle(e.target.value);
	};
	
	// Handle saving the title (on blur or Enter key)
	const handleSave = () => {
		const trimmedTitle = localTitle.trim();
		if (trimmedTitle === '') {
			// If title is empty, reset to default
			setLocalTitle(defaultTitle);
			onTitleChange(defaultTitle);
		} else {
			onTitleChange(trimmedTitle);
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
		<div className="flex flex-col items-center justify-center mb-2">
			<div className="w-full max-w-md">
				{isAnimating ? (
					// During animation, show the animated text
					<h1 className="text-2xl font-bold text-dark-blue-ink border-b-2 border-transparent py-0.5 cursor-default">
						{animatedText}<span className="animate-pulse">|</span>
					</h1>
				) : isEditing ? (
					// When editing, show the input field
					<input
						ref={inputRef}
						type="text"
						value={localTitle}
						onChange={handleInputChange}
						onBlur={handleSave}
						onKeyDown={handleKeyDown}
						className="text-2xl font-bold bg-linen text-dark-blue-ink w-full py-1 px-1 border-b-2 border-spring-moss focus:outline-none bg-transparent"
						placeholder={defaultTitle}
					/>
				) : (
					// After animation and not editing, show the title as text
					<h1 
						onClick={handleTitleClick}
						className="text-2xl font-bold text-dark-blue-ink border-b-2 border-transparent hover:border-neutral-300 py-1 cursor-pointer transition-all duration-200"
					>
						{localTitle}
					</h1>
				)}
				
				{!isAnimating && !isEditing && !hasBeenEdited && (
					<p className="text-sm text-dusty-purple">
						Click the title to edit
					</p>
				)}
			</div>
		</div>
	);
};

export default TypewriterEditableTitle;