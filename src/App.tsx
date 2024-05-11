import React, { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  inline: boolean;
  className?: string;
  children: React.ReactNode;
}

const Code: React.FC<CodeProps> = ({ inline, className, children }) => {
  if (!inline) {
    return (
      <SyntaxHighlighter
        style={materialLight}
        PreTag='div'
        language='javascript'
        children={String(children).replace(/\n$/, "")}
      />
    );
  }
  return <code className={className}>{children}</code>;
};

const App: React.FC = () => {
  const [markdownText, setMarkdownText] = useState<string>(
    `\n Welcome to Shafiq's React Markdown Previewer! \n ### And here's some other cool stuff:\n // this is multi-line code: \n // this is multi-line code: \n function anotherExample(firstLine, lastLine){\n if (firstLine == '' && lastLine == '') {\n return multiLineCode;\n } \n}\n`
  );

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setMarkdownText((prevText) => `\n` + prevText + `\n`);
    }
  };
  const components: Record<string, React.ElementType> = { code: Code };

  return (
    <div className='h-screen bg-gray-100 flex flex-col justify-center items-center w-screen space-y-4'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-[80%] h-[95%] flex flex-col justify-center items-center'>
        <div className='bg-red font-bold text-2xl w-[70%]'>Editor</div>
        <textarea
          className='w-[70%] h-[60%] p-4 rounded-md border border-gray-300 mb-4 resize-none'
          value={markdownText}
          onChange={handleMarkdownChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className=' w-[70%] font-bold text-2xl '>Previewer</div>
        <div className='markdown-preview w-[70%] overflow-y-scroll'>
          <Markdown
            components={components}
          >{`\n\`\`\`${markdownText}\`\`\`\n`}</Markdown>
        </div>
      </div>
      <footer className='font-medium flex flex-row space-x-4 p-4'>
        <a
          href='https://github.com/Shafiquedev256/reactPreviewer'
          className='underline'
        >
          View code
        </a>
        <span>Designed and Created by Musinguzi Shafiq @2024</span>
      </footer>
    </div>
  );
};

export default App;
