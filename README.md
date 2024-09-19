# Global Social Platform

---

## Vision
A free, globally accessible platform connecting people based on shared interests. No ads, paywalls, or commercial incentives. Focus on authentic connections through passions, skills, and hobbies, not superficial metrics (age, income, location). Encourage meaningful, cross-border relationships.

---

## Pages

### 1. Landing Page
- **Header**: Platform vision, emphasis on global connections via interests.
- **Call to Action**: Sign-up button, explore platform's vision.
- **Visuals**: Minimalistic, light-themed, global imagery (map, community focus).
- **Optional section**: Explanation of features and mission for exploration.

### 2. Profile Page (Creation/Edit)
- **Nickname input**: Primary name for identification.
- **Keyword input**: Interests (e.g., music, sports) with descriptions (e.g., "Guitarist for 5 years").
- **Top 5 Interests**: Users rank their top 5 interests by importance (1-5). Used for more weighted matching in search results.
- **Optional inputs**: Location, age, gender, language, etc.
- **Privacy toggles**: Control visibility of each field (interests & personal data).
- **Design**: Simple, clean, form-based. Auto-save feature.

### 3. Search/Keyword Matching Page
- **Search bar**: Keyword-based search for profiles.
- **Profile cards**: Display name, primary interests (up to 3), location toggle if set.
- **Filters**: By location (optional), languages, etc.
- **Top Interests Matching**: Profiles with interests ranked higher by users (e.g., "Music" as #1) show up earlier in search results.
- **Match criteria**: Sort profiles by highest matching keywords, weighted by top interests.
- **UI**: Grid view, simple, clean profile snippets.

### 4. Viewing Other Profiles
- **Display**: Nickname, top keywords + descriptions, optional personal info (

(location, languages).
- **Interaction options**: Friend request button, option to add keywords from viewed profile.
- **Custom message**: Include when sending a friend request.
- **Design**: Focus on clarity, space for descriptions, clean layout.

### 5. Messaging Page (Post-Connection)
- **Simple chat UI**: Text-based conversation (no rich media yet).
- **Unmatch button**: End conversations anytime.
- **UI Design**: Minimalist, focus on text; eventual migration expected to other platforms (Discord, WhatsApp).

### 6. **Account Creation & Onboarding**
- **Guided Tour**: During the account creation process, users will be guided through key features, such as profile creation, keyword matching, and how to make connections. 
- **Progress Indicators**: Steps in the account creation process (e.g., Nickname, Keywords, Top 5 Interests) will be clearly labeled so users can track their progress.
- **Optional Tour**: After sign-up, users can take an optional platform tour, highlighting areas like searching for profiles, messaging, and privacy settings.

### 7. **User Account Settings**
- **Profile Management**: Edit profile information, including keywords, privacy settings, and personal data.
- **Notification Preferences**: Users can control how they receive notifications (e.g., friend requests, messages, connection activity). Notifications will be sent via email or in-platform alerts.
- **Account Privacy**: Additional privacy options for users to control visibility on searches and profile information.
- **Data Management**: Allow users to download or delete their data, deactivate their accounts, and manage privacy policies in line with GDPR compliance.

---

## Algorithms & Technical Considerations

### 1. Matching Algorithm
- **Interest Matching**: Compare user interests using keywords. Profiles with more matching keywords are prioritized.
- **Weighted Matching**: Incorporate Top 5 Interests ranking. Profiles where a user's top-ranked interest (e.g., "Music" ranked #1) matches another user's top-ranked interest are given more weight.
- **Filters**: Allow filters like location and language, but maintain global focus by default.

### 2. Search Algorithm
- **Keyword-Based Search**: Users search profiles by entering keywords. Profiles with more frequent or higher-ranked matches appear first.
- **Interest Rank**: Top interests (1-5) increase the profile's visibility in search results for that specific keyword.

### 3. Content Moderation
- **Blacklist Algorithm**: Develop a filtering system to detect and block inappropriate keywords (racist, sexual, etc.) in user-entered interests and descriptions.
  - **Keyword Matching**: Maintain a blacklist of inappropriate words and phrases to prevent profile creation with harmful content.
  - **Pattern Detection**: Utilize regex or AI-based content filtering to detect variations of inappropriate language.
  - **User Reporting**: Allow users to report profiles with offensive content for manual review.

---

## Technical Stack
- **Frontend**: Next.js
- **Database**: Prisma ORM (Postgres)
- **Deployment**: VPS with Coolify; Cloudflare Tunnels for security.

---

## Open Questions
- How to scale appropriately

## Prompts

mock:
create a file under src/app/(mock)/,,, that is used to test a specific concept i will describe at the end. i want to test this concept on that route and if i like parts of it i will add it into the real app. thats how i can get inspiration by ai but dont just copy paste everything which might break my app. create that page.tsx for that folder with this concept:

use a web design that ...

on the page i want to see...



## Todo
- [ ] add ko fi link
- [ ] premium badge
- [ ] settings basic setup
- [ ] profile basic setup
- [ ] requests basic setup
- [ ] chats basic setup
- [ ] chat realtime?
- [ ] define components
