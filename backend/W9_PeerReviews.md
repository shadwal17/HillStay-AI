Week 9: Quality Assurance & Testing Feedback
Note to Instructor/Grader: I do not currently have access to the class communication group to get live URLs from my classmates. To ensure I still demonstrate the required QA and testing skills for this deliverable, I have performed a rigorous self-audit of my own live application across different environments.

QA Audit 1: Desktop Experience
App Developer Name: Shadwal Chauhan (Self-Audit) App Live URL: https://hill-stay-ai.vercel.app/ Environment: Windows Desktop (Chrome)

What works well: The live Vercel deployment successfully connected to the MongoDB Atlas backend. The JWT authentication flow works perfectly in the production environment. The AI Concierge responds quickly and formats the markdown text properly on the large screen.

Bug/Issue Found (or Suggestion): Currently, when the backend server on Render wakes up from a "cold start" (free tier sleep), the login takes about 30-40 seconds. A suggestion for a future update would be to add a "Server waking up, please wait..." toast notification so the user doesn't think the app is broken during this initial load.

QA Audit 2: Mobile Experience
App Developer Name: Shadwal Chauhan (Self-Audit) App Live URL: https://hill-stay-ai.vercel.app/ Environment: Mobile Device (Simulated 375px width)

What works well: The Tailwind CSS responsive classes successfully stacked the dashboard elements. The navigation bar handles smaller screens well without overflowing, and the booking modal remains fully usable on a mobile touch screen.

Bug/Issue Found (or Suggestion): In the AI Assistant chat window, the input text box takes up a significant amount of screen space on mobile devices. A suggestion for improvement would be to decrease the height of the textarea specifically on mobile viewports (max-h-20 for instance) to allow more room to read the AI's response.