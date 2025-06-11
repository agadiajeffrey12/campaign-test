import React, { useState, useRef } from 'react';
import { 
  ChevronDown, 
  Bold, 
  Italic, 
  Underline, 
  List,
  ListOrdered,
  Link,
  Type
} from 'lucide-react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil, convertToRaw, convertFromRaw, Modifier, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { PrimaryButton, TertiaryButton } from '@/components/reuseables/buttons';
import { Template } from '../Campaigns/EmailComposer';


const CreateTemplate = () => {
   const [selectedTemplate, setSelectedTemplate] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
    const editorRef = useRef<Editor>(null);
  
    const templates: Template[] = [
      { 
        id: '1', 
        name: 'Welcome Email', 
        content: 'Welcome to our platform! We\'re excited to have you on board, (First Name)!\n\nHere\'s what you can expect:\n• Access to all premium features\n• 24/7 customer support\n• Regular updates and improvements\n\nIf you have any questions, don\'t hesitate to reach out.\n\nBest regards,\nThe Team' 
      },
      { 
        id: '2', 
        name: 'Follow-up Email', 
        content: 'Hi (First Name),\n\nThank you for your interest in our services. We wanted to follow up on our previous conversation and see if you have any questions.\n\nWe\'re here to help you get started and would love to schedule a quick call to discuss your needs.\n\nLooking forward to hearing from you!\n\nBest,\nSales Team' 
      },
      { 
        id: '3', 
        name: 'Newsletter Template', 
        content: 'Weekly Newsletter\n\nHi (First Name),\n\nHere\'s what\'s new this week:\n\nProduct Updates:\n• New dashboard design\n• Improved performance\n• Bug fixes and stability improvements\n\nLatest Blog Posts:\n• How to maximize your productivity\n• Best practices for team collaboration\n\nThanks for being part of our community!' 
      },
      { 
        id: '4', 
        name: 'Event Invitation', 
        content: 'You\'re Invited!\n\nHi (First Name),\n\nWe\'re excited to invite you to our upcoming event. Join us for an evening of networking, learning, and great conversations.\n\nEvent Details:\n• Date: [Event Date]\n• Time: [Event Time]\n• Location: [Event Location]\n\nPlease RSVP by [RSVP Date].\n\nWe can\'t wait to see you there!\n\nBest regards,\nEvent Team' 
      },
      { 
        id: '5', 
        name: 'Thank You Email', 
        content: 'Thank You!\n\nHi (First Name),\n\nThank you for your business. We appreciate your support and trust in our services.\n\nYour satisfaction is our top priority, and we\'re committed to providing you with the best experience possible.\n\nIf you have any feedback or questions, please don\'t hesitate to reach out.\n\nWith gratitude,\nCustomer Success Team' 
      }
    ];
  
    const handleTemplateSelect = (template: Template) => {
      setSelectedTemplate(template.name);
    //   handleSelectChange('template')(template.name);
      const contentState = ContentState.createFromText(template.content);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
      setShowTemplateDropdown(false);
    };
  
  interface HandleKeyCommandProps {
      command: string;
      editorState: EditorState;
  }
  
  const handleKeyCommand = (
      command: HandleKeyCommandProps['command'],
      editorState: HandleKeyCommandProps['editorState']
  ): 'handled' | 'not-handled' => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
          setEditorState(newState);
          return 'handled';
      }
      return 'not-handled';
  };
  
  interface MapKeyToEditorCommandEvent extends React.KeyboardEvent<HTMLDivElement> {}
  
  const mapKeyToEditorCommand = (e: MapKeyToEditorCommandEvent): string | null => {
      if (e.keyCode === 9 /* TAB */) {
          const newEditorState = RichUtils.onTab(
              e,
              editorState,
              4, /* maxDepth */
          );
          if (newEditorState !== editorState) {
              setEditorState(newEditorState);
          }
          return null;
      }
      return getDefaultKeyBinding(e);
  };
  
  interface ToggleBlockTypeProps {
      blockType: string;
  }
  
  const toggleBlockType = (blockType: ToggleBlockTypeProps['blockType']): void => {
      setEditorState(
          RichUtils.toggleBlockType(editorState, blockType)
      );
  };
  
  interface ToggleInlineStyleProps {
      inlineStyle: string;
  }
  
  const toggleInlineStyle = (inlineStyle: ToggleInlineStyleProps['inlineStyle']): void => {
      setEditorState(
          RichUtils.toggleInlineStyle(editorState, inlineStyle)
      );
  };
  
    const insertLink = () => {
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
        const url = prompt('Enter URL:');
        if (url) {
          const contentState = editorState.getCurrentContent();
          const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url }
          );
          const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
          setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
          ));
        }
      } else {
        alert('Please select some text to add a link.');
      }
    };
  
    // Get the current block type
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
  
    // Get current inline styles
    const currentStyle = editorState.getCurrentInlineStyle();
  
    const BlockStyleControls = () => {
      const BLOCK_TYPES = [
        { label: 'Normal', style: 'unstyled' },
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'Quote', style: 'blockquote' },
      ];
  
      return (
        <div className="flex items-center space-x-1">
          <select
            value={blockType}
            onChange={(e) => toggleBlockType(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm bg-white"
          >
            {BLOCK_TYPES.map((type) => (
              <option key={type.style} value={type.style}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      );
    };
  
    const InlineStyleControls = () => {
      const INLINE_STYLES = [
        { label: <Bold className="w-4 h-4" />, style: 'BOLD', title: 'Bold' },
        { label: <Italic className="w-4 h-4" />, style: 'ITALIC', title: 'Italic' },
        { label: <Underline className="w-4 h-4" />, style: 'UNDERLINE', title: 'Underline' },
        { label: <Type className="w-4 h-4" />, style: 'CODE', title: 'Code' },
      ];
  
      return (
        <div className="flex items-center space-x-1">
          {INLINE_STYLES.map((type) => (
            <button
              key={type.style}
              onClick={() => toggleInlineStyle(type.style)}
              className={`p-1 hover:bg-gray-200 rounded ${
                currentStyle.has(type.style) ? 'bg-gray-300' : ''
              }`}
              title={type.title}
            >
              {type.label}
            </button>
          ))}
        </div>
      );
    };
  
    const BlockTypeControls = () => {
      const BLOCK_TYPES = [
        { label: <List className="w-4 h-4" />, style: 'unordered-list-item', title: 'Bullet List' },
        { label: <ListOrdered className="w-4 h-4" />, style: 'ordered-list-item', title: 'Numbered List' },
      ];
  
      return (
        <div className="flex items-center space-x-1">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type.style}
              onClick={() => toggleBlockType(type.style)}
              className={`p-1 hover:bg-gray-200 rounded ${
                blockType === type.style ? 'bg-gray-300' : ''
              }`}
              title={type.title}
            >
              {type.label}
            </button>
          ))}
        </div>
      );
    };
  
    return (
      <div className="w-[677px] h-[549px] mb-6">
        {/* Template Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Template name
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
            <div className="flex flex-wrap items-center gap-2">
              <BlockStyleControls />
              
              <div className="w-px h-6 bg-gray-300" />
              
              <InlineStyleControls />
              
              <div className="w-px h-6 bg-gray-300" />
              
              <BlockTypeControls />
              
              <div className="w-px h-6 bg-gray-300" />
              
              <button
                onClick={insertLink}
                className="p-1 hover:bg-gray-200 rounded"
                title="Insert Link"
              >
                <Link className="w-4 h-4" />
              </button>
            </div>
          </div>
  
          {/* Editor */}
          <div className="border-l border-r border-b border-gray-300 rounded-b-md">
            <div 
              className="min-h-[200px] max-h-[400px] overflow-y-auto p-3 cursor-text"
              onClick={() => editorRef.current?.focus()}
            >
              <Editor
                ref={editorRef}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                onChange={setEditorState}
                placeholder="What's in your message?"
                spellCheck={true}
              />
            </div>
          </div>
        </div>
  
        {/* Tip */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Tip: (First Name) will personalize the email with each attendee's first name.
          </p>
        </div>
  
        {/* Action Buttons */}
        <div className="space-y-3">
          <PrimaryButton fullWidth  >
            Save and continue
          </PrimaryButton >
          <TertiaryButton fullWidth className="w-full text-gray-600 py-2 px-4 hover:text-gray-800 transition-colors">
            Cancel
          </TertiaryButton >
        </div>
      </div>
    );
}

export default CreateTemplate