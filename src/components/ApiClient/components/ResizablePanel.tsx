import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResizablePanelProps {
  defaultWidth: number;
  minWidth: number;
  maxWidth: number;
  position: 'left' | 'right';
  name: string;
  fillSpace?: boolean;
  children: React.ReactNode;
}

export function ResizablePanel({
  defaultWidth,
  minWidth,
  maxWidth,
  position,
  name,
  fillSpace = false,
  children
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef<number>(0);
  const dragStartWidth = useRef<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartWidth.current = width;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const delta = position === 'left'
        ? e.clientX - dragStartX.current
        : dragStartX.current - e.clientX;
      
      const newWidth = Math.min(Math.max(dragStartWidth.current + delta, minWidth), maxWidth);
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, minWidth, maxWidth, position]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      ref={panelRef}
      className={`relative flex ${fillSpace && !isCollapsed ? 'flex-1' : ''}`}
      style={{ width: isCollapsed ? '40px' : `${width}px` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isCollapsed ? (
        <div className="flex-1 flex items-center justify-center">
          <div 
            className="transform -rotate-90 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
            style={{ transformOrigin: 'center' }}
          >
            {name}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      )}
      
      <div
        className={`absolute ${position === 'left' ? 'right-0' : 'left-0'} top-0 h-full transition-opacity duration-200 ${
          isHovered || isDragging ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`absolute ${position === 'left' ? '-right-1' : '-left-1'} top-0 h-full w-2 cursor-col-resize ${
            isDragging ? 'bg-blue-500/20' : ''
          }`}
          onMouseDown={handleMouseDown}
        />
        
        <button
          onClick={toggleCollapse}
          className={`absolute ${position === 'left' ? '-right-3' : '-left-3'} top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md z-10`}
        >
          {position === 'left' 
            ? (isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />)
            : (isCollapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />)
          }
        </button>
      </div>
    </div>
  );
}