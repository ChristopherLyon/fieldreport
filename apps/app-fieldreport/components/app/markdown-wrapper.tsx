import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownWrapper({ markdown }: { markdown: string }) {
    return (
        <div className="prose dark:prose-invert md:p-4 lg:p-6 rounded-lg max-w-screen-md mx-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </ReactMarkdown>
        </div>
    );
};
