'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, AudioLines, ChevronDown, X } from 'lucide-react';

export default function AIChatbot({
  mode,
  setMode,
}: {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [chats, setChats] = useState<{ type: string; message: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [minimizedChat, setMinimizedChat] = useState(false);
  const [currentAIResponse, setCurrentAIResponse] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newChats = [...chats, { type: 'user', message: inputValue }];
      setChats(newChats);
      setInputValue('');

      const eventSource = new EventSource(
        `/api/ai-stream?message=${encodeURIComponent(inputValue)}`,
      );

      let aiResponse = '';

      eventSource.onmessage = (event) => {
        aiResponse += event.data;
        setCurrentAIResponse(aiResponse);
      };

      eventSource.onerror = (err) => {
        console.error('EventSource failed:', err);
        eventSource.close();
        setChats((prevChats) => [
          ...prevChats,
          { type: 'ai', message: aiResponse },
        ]);
        setCurrentAIResponse('');
      };
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, currentAIResponse]);

  // Set minimizedChat state based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMinimizedChat(true);
      } else {
        setMinimizedChat(false);
      }
    };

    // Set the initial state based on the current window size
    handleResize();

    // Add event listener to handle resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return !minimizedChat ? (
    <Card className="fixed bottom-5 right-5 max-w-[330px] z-50 md:block">
      <ChevronDown
        className={`absolute top-2 right-2 w-4 h-4 hover:cursor-pointer
            ${mode === 'personal' ? '' : ' text-black '}
            `}
        onClick={() => setMinimizedChat(true)} // Corrected the toggle logic
      />
      <div
        className={`p-2 w-full flex justify-center items-center hover:bg-muted/20 hover:cursor-pointer
          ${
            mode === 'personal'
              ? ''
              : 'bg-yellow-500 text-black hover:bg-yellow-400'
          }
            `}
        onClick={() => setMode(mode === 'personal' ? 'enterprise' : 'personal')}
      >
        <span className="text-center font-mono text-xs">{mode}</span>
      </div>
      <CardHeader className="flex flex-row items-center border-t border-dashed">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>
              <AudioLines />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">FieldReport AI</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'personal'
                ? 'How can I assist you today?'
                : 'How can I help your business?'}
            </p>
          </div>
        </div>
      </CardHeader>

      {chats.length > 0 && (
        <CardContent className="flex flex-col-reverse pb-0 border-t border-dashed">
          <div className="max-h-[500px] overflow-y-auto py-4">
            <div className="space-y-4">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                      chat.type === 'user'
                        ? 'ml-auto bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50'
                        : 'mr-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900'
                    }`}
                  >
                    <p>{chat.message}</p>
                  </div>
                </div>
              ))}
              {currentAIResponse && (
                <div className="flex justify-start">
                  <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mr-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    <p>{currentAIResponse}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </CardContent>
      )}
      <CardFooter className="pt-5 border-t border-dashed">
        <form
          className="flex w-full items-center space-x-2"
          onSubmit={handleFormSubmit}
        >
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 bg-transparent pr-12 focus:outline-none"
          />
          <Button variant="outline" size="icon" type="submit">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  ) : (
    <Button
      className="fixed bottom-5 right-5 z-50 h-32 w-10"
      variant={'outline'}
      onClick={() => setMinimizedChat(false)} // Corrected the toggle logic
    >
      <span className="-rotate-90 flex flex-row gap-2 items-center ">
        <AudioLines /> FieldReport
      </span>
    </Button>
  );
}
