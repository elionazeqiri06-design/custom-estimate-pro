# Estimate Hub

Build a personalized estimate request demo page for a home remodeling lead-response system. Here's what I need:
Core functionality: A form where a visitor requests a project estimate — fields are: full name, email, project type (dropdown: Kitchen Remodel, Bathroom Remodel, Full Home Renovation, Addition/ADU, Other), and a text description of their project. On submit, send the data as JSON to this webhook: https://n8n.piplineloop.com/webhook/demo-estimate with fields company_name, name, email, project_type, description. Show a loading state while submitting, then a success screen confirming the request was received and that an automated AI-generated reply is on its way.
Personalization — this is the important part. The page needs to work three different ways depending on what's in the URL, since I send this link to leads at different stages of outreach:
Full known lead: URL like /acme-co?name=John+Smith&email=john@acme.com — decode "acme-co" into "Acme Co" and show it as the company name (e.g. in a headline like "See how Acme Co could respond to every lead instantly"). Since I already have their name and email, hide those two input fields entirely and just use the URL values silently when submitting. Visitor only sees project type + description + submit.
Company only known: URL like /acme-co (no name/email params) — show "Acme Co" as the company name, but show all form fields (name, email, project type, description) since I don't have their contact info yet.
Nothing known: URL like / (root, no slug) — show a generic "Your Company" placeholder instead of a real name, and show all form fields.
Also support an optional ?company=Some+Name query parameter on the root page as an alternate way to set the company name without a dedicated slug.
Please design the page however you think looks best — clean and professional, suited for a lead-generation/sales tool. Build this as a complete working page.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://custom-estimate-pro.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/47a103d1-5d99-47d7-8f8d-fe852d9452d6).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
