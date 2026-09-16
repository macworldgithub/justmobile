This folder contains all legal and compliance documents for Just Mobile.

## Structure

legal/
├── cis/                          ← Critical Information Summaries (one PDF per plan)
│   ├── 3gb-plan.pdf
│   ├── 10gb-plan.pdf
│   ├── 20gb-plan.pdf
│   └── 40gb-plan.pdf             (add more as needed)
├── privacy-policy.pdf
├── standard-form-of-agreement.pdf
├── financial-hardship-policy.pdf
└── terms-and-conditions.pdf

## Instructions

Drop the real PDF files into this folder using the exact filenames above.
The website will automatically serve them at /legal/<filename>.

CIS filenames are auto-generated from plan names by:
  1. Lowercasing the plan name
  2. Replacing spaces with hyphens
  3. Removing special characters
  e.g. "Just Mobile 10GB" → "just-mobile-10gb.pdf"
