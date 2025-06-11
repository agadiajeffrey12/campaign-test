import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TemplateCardItemProps {
  title: string;
  content: string;
  timestamp: string;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onShare?: () => void;
  menuItems?: Array<{
    label: string;
    onClick: () => void;
    destructive?: boolean;
  }>;
}

export function TemplateCarditem({
  title,
  content,
  timestamp,
  className,
  onEdit,
  onDelete,
  onDuplicate,
  onShare,
  menuItems,
}: TemplateCardItemProps ) {
  // Default menu items if none provided
  const defaultMenuItems = [
    ...(onEdit ? [{ label: 'Edit', onClick: onEdit }] : []),
    ...(onDuplicate ? [{ label: 'Duplicate', onClick: onDuplicate }] : []),
    ...(onShare ? [{ label: 'Share', onClick: onShare }] : []),
    ...(onDelete ? [{ label: 'Delete', onClick: onDelete, destructive: true }] : []),
  ];

  const items = menuItems || defaultMenuItems;

  return (
    <Card className={cn('w-full bg-white shadow-sm border border-gray-200', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between ">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
          
          {items.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {items.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={item.onClick}
                    className={cn(
                      'cursor-pointer',
                      item.destructive && 'text-red-600 focus:text-red-600 focus:bg-red-50'
                    )}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <p className="text-gray-700 text-base leading-relaxed mb-4 line-clamp-3">
          {content}
        </p>
        
        <div className="flex items-center justify-between">
          <time className="text-sm text-gray-500" dateTime={timestamp}>
            Created {formatTimestamp(timestamp)}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to format timestamp
function formatTimestamp(timestamp: string): string {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
  } catch (error) {
    return timestamp;
  }
}