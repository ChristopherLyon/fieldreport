import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownWrapper({ content }: { content: string }) {
    return (
        <div className="prose dark:prose-invert p-6 rounded-lg shadow-md max-w-screen-md mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
};
