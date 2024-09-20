import { z } from "zod";

export const KeywordSchema = z.object({
    word: z.string().min(1, "Keyword is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
});

export const TopKeywordSchema = KeywordSchema.nullable();

export const ProfileSchema = z.object({
    nickname: z.string().min(1, "Nickname is required"),
    age: z.number().int().positive("Age must be a positive number"),
    gender: z.string().min(1, "Gender is required"),
    location: z.string().min(1, "Location is required"),
    showAge: z.boolean(),
    showGender: z.boolean(),
    showLocation: z.boolean(),
    keywords: z.array(KeywordSchema).max(10, "Maximum 10 keywords allowed"),
    topKeywords: z.array(TopKeywordSchema).length(5, "Exactly 5 top keywords required (can be empty)"),
    icebreakers: z.array(z.string().min(1, "Icebreaker question is required")).max(5, "Maximum 5 icebreakers allowed"),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type Keyword = z.infer<typeof KeywordSchema>;
export type TopKeyword = z.infer<typeof TopKeywordSchema>;
