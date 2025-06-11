import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  content: string;
}

const EmailComposer = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [message, setMessage] = useState('');
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [fontSize, setFontSize] = useState('14px');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [heading, setHeading] = useState('Heading 1');
  const editorRef = useRef<HTMLDivElement>(null);

  const templates: Template[] = [
    { id: '1', name: 'Welcome Email', content: 'Welcome to our platform! We\'re excited to have you on board.' },
    { id: '2', name: 'Follow-up Email', content: 'Thank you for your interest. We wanted to follow up on our previous conversation.' },
    { id: '3', name: 'Newsletter Template', content: 'Here\'s what\'s new this week...' },
    { id: '4', name: 'Event Invitation', content: 'You\'re invited to our upcoming event!' },
    { id: '5', name: 'Thank You Email', content: 'Thank you for your business. We appreciate your support.' }
  ];

  const fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px'];
  const fontFamilies = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New'];
  const headings = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Normal'];

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template.name);
    setMessage(template.content);
    setShowTemplateDropdown(false);
  };

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      setMessage(editorRef.current.innerHTML);
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const applyHeading = (headingType: string) => {
    const tagMap: { [key: string]: string } = {
      'Heading 1': 'h1',
      'Heading 2': 'h2', 
      'Heading 3': 'h3',
      'Heading 4': 'h4',
      'Heading 5': 'h5',
      'Heading 6': 'h6',
      'Normal': 'p'
    };
    executeCommand('formatBlock', tagMap[headingType] || 'p');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      {/* Template Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template (optional)
        </label>
        <div className="relative">
          <button
            onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
          >
            <span className={selectedTemplate ? 'text-gray-900' : 'text-gray-500'}>
              {selectedTemplate || 'Select a template'}
            </span>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>
          
          {showTemplateDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="py-1">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        
        {/* Toolbar */}
        <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2">
          <div className="flex flex-wrap items-center gap-1">
            {/* Heading Dropdown */}
            <select
              value={heading}
              onChange={(e) => {
                setHeading(e.target.value);
                applyHeading(e.target.value);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
            >
              {headings.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>

            {/* Font Family Dropdown */}
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                executeCommand('fontName', e.target.value);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font}>{font}</option>
              ))}
            </select>

            {/* Font Size Dropdown */}
            <select
              value={fontSize}
              onChange={(e) => {
                setFontSize(e.target.value);
                executeCommand('fontSize', '3'); // HTML font size
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
            >
              {fontSizes.map(size => (
                <option key={size} value={size}>{size.replace('px', '')}</option>
              ))}
            </select>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Text Formatting */}
            <button
              onClick={() => executeCommand('bold')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('italic')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('underline')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Underline"
            >
              <Underline className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('strikeThrough')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Lists */}
            <button
              onClick={() => executeCommand('insertUnorderedList')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('insertOrderedList')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Alignment */}
            <button
              onClick={() => executeCommand('justifyLeft')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('justifyCenter')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => executeCommand('justifyRight')}
              className="p-1 hover:bg-gray-200 rounded"
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-300 mx-1" />

            {/* Insert Options */}
            <button
              onClick={insertLink}
              className="p-1 hover:bg-gray-200 rounded"
              title="Insert Link"
            >
              <Link className="w-4 h-4" />
            </button>
            <button
              onClick={insertImage}
              className="p-1 hover:bg-gray-200 rounded"
              title="Insert Image"
            >
              <Image className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditorChange}
          className="w-full min-h-[200px] p-3 border-l border-r border-b border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
          dangerouslySetInnerHTML={{ __html: message || "what's in your message?" }}
          suppressContentEditableWarning={true}
        />
      </div>

      {/* Tip */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Tip: (First Name) will personalize the email with each attendee's first name.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium">
          Save and continue
        </button>
        <button className="w-full text-gray-600 py-2 px-4 hover:text-gray-800 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EmailComposer;