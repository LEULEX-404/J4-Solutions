# J4 image replacement

This records the original 22-section image-pack installation. Subsequent header artwork, copy improvements and error handling are described in `website-quality-improvements.md`.

All 22 content image sections use the supplied J4_Website_Image_Pack.zip WebP assets. These are AI-generated illustrative scenes, not photographs of actual J4 staff, premises, clients, or delivered projects. The existing illustrative-project disclaimer remains on the Work page.

Layout, page copy, navigation, logo, hero video, contact details, and interactions are preserved. Every image is 1536 x 1024, rendered with object-fit: cover and centered framing. Below-the-fold images lazy load; all replacement images decode asynchronously.

Scene descriptions follow the supplied alt text. The About introduction changes "Authentic" to "Illustrative" to avoid presenting the generated office as verified premises.

Validation: production build, ESLint, and diff whitespace checks pass. All 22 unique mappings and alt texts were checked against the pack; public and built image hashes match the originals. All 22 assets return HTTP 200 with image/webp content type, and all five page routes return HTTP 200. No missing or ambiguous section was found. Desktop/mobile visual inspection remains unverified because no browser connection is available in this session.

| Page | Section | Source component | Image URL |
| --- | --- | --- | --- |
| home | Intent / Start with the real business problem | src/pages/HomePage.jsx | /images/j4/home/01-intent-discovery-workshop.webp |
| home | Craft / Design and engineering move together | src/pages/HomePage.jsx | /images/j4/home/02-craft-design-engineering.webp |
| home | Scale / Launch clean, then grow with control | src/pages/HomePage.jsx | /images/j4/home/03-scale-cloud-delivery.webp |
| home | Intelligence / Use AI where it earns its place | src/pages/HomePage.jsx | /images/j4/home/04-intelligence-ai-automation.webp |
| services | Web Development | src/pages/ServicesPage.jsx | /images/j4/services/01-web-development.webp |
| services | Mobile App Development | src/pages/ServicesPage.jsx | /images/j4/services/02-mobile-app-development.webp |
| services | Database Solutions | src/pages/ServicesPage.jsx | /images/j4/services/03-database-solutions.webp |
| services | Cloud Services | src/pages/ServicesPage.jsx | /images/j4/services/04-cloud-services.webp |
| services | UI/UX Design | src/pages/ServicesPage.jsx | /images/j4/services/05-ui-ux-design.webp |
| services | Security Solutions | src/pages/ServicesPage.jsx | /images/j4/services/06-security-solutions.webp |
| services | AI & Machine Learning | src/pages/ServicesPage.jsx | /images/j4/services/07-ai-machine-learning.webp |
| services | Digital Transformation | src/pages/ServicesPage.jsx | /images/j4/services/08-digital-transformation.webp |
| work | Commerce that feels effortless | src/pages/PortfolioPage.jsx | /images/j4/work/01-ecommerce-store.webp |
| work | Useful services in your pocket | src/pages/PortfolioPage.jsx | /images/j4/work/02-mobile-service-app.webp |
| work | A clearer view of your business | src/pages/PortfolioPage.jsx | /images/j4/work/03-business-dashboard.webp |
| work | Digital experiences with character | src/pages/PortfolioPage.jsx | /images/j4/work/04-brand-interface-design.webp |
| work | Smarter day-to-day workflows | src/pages/PortfolioPage.jsx | /images/j4/work/05-workflow-automation.webp |
| work | A stronger online presence | src/pages/PortfolioPage.jsx | /images/j4/work/06-responsive-business-website.webp |
| about | Studio introduction / skyline image | src/pages/AboutPage.jsx | /images/j4/about/01-studio-exterior.webp |
| about | The story / Collaborative planning session | src/pages/AboutPage.jsx | /images/j4/about/02-planning-together.webp |
| about | The story / People working together at computers | src/pages/AboutPage.jsx | /images/j4/about/03-engineering-team.webp |
| contact | Contact introduction / skyline image | src/pages/ContactPage.jsx | /images/j4/contact/01-welcoming-workspace.webp |
