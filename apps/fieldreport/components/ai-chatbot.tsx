"use client"

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, AudioLines, ChevronsRightLeft } from "lucide-react"

export default function AIChatbot({ mode, setMode }: { mode: string; setMode: React.Dispatch<React.SetStateAction<string>> }) {

    const [chats, setChats] = useState([]) as any

    const [inputValue, setInputValue] = useState("")
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        setInputValue('')
        e.preventDefault()
        // Add user message to chat
        setChats([...chats, { type: "user", message: inputValue }])
    }

    useEffect(() => {
        scrollToBottom()
    }, [chats])

    return (
        <Card className="fixed bottom-4 right-4 max-w-[90vw] z-50 overflow-hidden">
            <div className="p-2 w-full flex justify-center items-center border-b border-dashed hover:bg-muted/20 hover:cursor-pointer" onClick={() => setMode(mode === "personal" ? "enterprise" : "personal")}>
                <span className="text-center font-mono text-xs">
                    {mode}
                </span>
            </div>
            <CardHeader className="flex flex-row items-center">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback><AudioLines /></AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-none">FieldReport AI</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {mode === "personal" ? "How can I assist you today?" : "How can I help your business?"}
                        </p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col-reverse pb-0">
                <div className="max-h-[400px] overflow-y-auto pb-4" onScroll={scrollToBottom}>
                    <div className="space-y-4">
                        {chats.map((chat: { type: string; message: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined }, index: React.Key | null | undefined) => (
                            <div key={index} className={`flex ${chat.type === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${chat.type === "user" ? "ml-auto bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50" : "mr-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900"}`}>
                                    <p>{chat.message}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <form className="flex w-full items-center space-x-2" onSubmit={handleFormSubmit}>
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent pr-12 focus:outline-none"
                    />
                </form>
            </CardFooter>
        </Card>
    )
}
