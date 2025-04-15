import { useEffect } from 'react';

export default function CodeBlock({ children }) {
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
    }
  }, []);

  return <div className="code-block-wrapper">{children}</div>;
} 