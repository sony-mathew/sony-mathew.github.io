import { useEffect, useState } from 'react';

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Import Prism only on the client side
    if (typeof window !== 'undefined') {
      const Prism = require('prismjs');
      
      // Core languages
      require('prismjs/components/prism-javascript');
      require('prismjs/components/prism-jsx');
      require('prismjs/components/prism-typescript');
      require('prismjs/components/prism-tsx');
      require('prismjs/components/prism-css');
      require('prismjs/components/prism-scss');
      require('prismjs/components/prism-bash');
      require('prismjs/components/prism-json');
      require('prismjs/components/prism-markdown');
      require('prismjs/components/prism-python');
      require('prismjs/components/prism-ruby');
      require('prismjs/components/prism-yaml');
      require('prismjs/components/prism-sql');
      
      // Plugins
      require('prismjs/plugins/line-numbers/prism-line-numbers');
      require('prismjs/plugins/show-language/prism-show-language');
      
      // Highlight all code blocks
      Prism.highlightAll();
      
      // Add copy buttons to all code blocks
      addCopyButtonsToCodeBlocks();
    }
  }, []);

  // Function to add copy buttons to all code blocks
  const addCopyButtonsToCodeBlocks = () => {
    // Find all pre elements that contain code blocks
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach((preElement) => {
      // Skip if this pre already has a copy button
      if (preElement.querySelector('.copy-button')) return;
      
      // Create copy button
      const copyButton = document.createElement('button');
      copyButton.className = 'copy-button';
      copyButton.textContent = 'Copy';
      copyButton.setAttribute('aria-label', 'Copy code');
      
      // Add click event
      copyButton.addEventListener('click', () => {
        const codeElement = preElement.querySelector('code');
        if (codeElement) {
          const textToCopy = codeElement.textContent;
          navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          });
        }
      });
      
      // Add button to pre element
      preElement.style.position = 'relative';
      preElement.appendChild(copyButton);
    });
  };

  return (
    <>
      {children}
      <style jsx global>{`
        pre {
          position: relative;
        }
        .copy-button {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: #fff;
          font-size: 12px;
          padding: 4px 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .copy-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
} 