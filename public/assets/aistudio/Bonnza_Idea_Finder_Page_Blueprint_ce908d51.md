# Bonnza Ecommerce Business Idea Finder

Prepared 18 November 2026.

## Product decision

Create a dedicated business-discovery page at `/business-ideas`. Give visitors two equally visible routes: answer a short questionnaire or browse a filterable catalogue. Both routes use the same underlying records and lead into practical validation and Bonnza's existing learning journey.

The first content release contains 15 departments, 100 selling categories, 500 example product subcategories and 100 starter business ideas. This is Bonnza's editorial structure, informed by the supplied retail outline. It is not an imported official or exhaustive taxonomy from Amazon, Flipkart or Meesho.

The page should help a person choose an idea to investigate. A category is a product family. A business idea adds a customer, offer angle and delivery model. For example, “stationery” becomes “undated study-planner sets for college students, sold through a focused online catalogue.”

## Positioning and opening copy

Page name: Ecommerce Business Idea Finder.

Headline: Find an ecommerce idea that fits your starting point.

Supporting copy: Explore 100 selling categories or answer a few questions about your interests, resources and preferred way of working. Build a shortlist, then decide what to test first.

Primary action: Find my ideas.

Secondary action: Explore all categories.

Below the actions: 100 categories. 500 product directions. Practical first steps.

Present the feature as a free discovery tool. Show the shortlist before requesting contact details. Offer an optional way to save or receive it once the visitor has seen useful results.

## Information architecture

Use this hierarchy consistently:

1. Department, such as Kitchen and Dining.
2. Selling category, such as Kitchen Storage and Organisation.
3. Product subcategory, such as Spice Jars.
4. Business idea, such as Compact-Kitchen Organisation Kits.
5. Specific offer or variant, such as a three-container kit with a measured-fit guide.

Keep one canonical owner for a product subcategory. Use tags for cross-cutting themes such as gifting, personalisation, home use, office use, seasonal occasions and maker-led products. Do not create a duplicate category whenever a product gains another use case.

The initial allocation is:

| Department | Selling categories |
|---|---:|
| Electronics and Gadgets | 10 |
| TV and Appliances | 6 |
| Fashion and Accessories for Women | 8 |
| Fashion and Accessories for Men | 6 |
| Baby Kids and Nursery | 7 |
| Beauty Health and Personal Care | 9 |
| Furniture and Home Furnishing | 6 |
| Kitchen and Dining | 6 |
| Decor Crafts and Spiritual Products | 6 |
| Home Care Garden and DIY | 6 |
| Grocery Food and Beverages | 6 |
| Pet Supplies | 4 |
| Sports Fitness and Outdoors | 5 |
| Automotive and Mobility | 5 |
| Books Stationery Toys Music and Digital | 10 |
| Total | 100 |

Fashion merchandising categories remain available to all visitors. The questionnaire and Bonnza positioning remain focused on a first-time entrepreneur's resources and preferences.

## Guided discovery route

Use eight questions with visible progress, Back, Continue and a way to restart. Retain answers during the current visit. Let visitors skip interest or channel preferences by selecting “I need help choosing” or “No preference.” Keep the questions readable on mobile and use suitable radio buttons or checkboxes.

### Question one

How much can you set aside for an initial product test?

- Under INR 10000.
- INR 10000 to 25000.
- INR 25000 to 50000.
- Above INR 50000.
- I need help working this out.

Explain that this concerns the product experiment, separate from course fees and household emergency funds. These are visitor-input bands. They are not verified minimum startup prices for the categories. The initial dataset uses qualitative capital orientation. Actual category spending needs quotes, sample quantities and a chosen operating model before it can be estimated credibly.

### Question two

Which product areas would you like to explore?

Offer the 15 departments, allow up to three selections and provide No preference. Use readable labels rather than a screen filled with 100 options.

### Question three

How would you prefer to create your offer?

- Source products and sell through my own seller account.
- Make my own products.
- Personalise products to order.
- Create original digital products.
- I am open to options.

Keep sourcing-and-selling distinct from affiliate links or income from recruiting others. Bonnza's resale route uses the learner's own seller account and customer responsibilities.

### Question four

Which strengths or access can you use?

Allow multiple choices: sourcing and negotiation, making and crafting, design and styling, technical product knowledge, food preparation, product care and customer support, or starting from the basics. These answers indicate what teaching and validation may be useful. They do not establish professional qualifications.

### Question five

What stock and packing space can you use?

- I need a route without physical stock.
- A shelf or cupboard.
- A small dedicated room.
- A larger storage or work area.

If the visitor needs no physical stock, do not present ordinary stock reselling as automatically inventory-free. Use a suitable original digital-product idea or explain what additional fulfilment arrangement would need investigation. A personalised physical product still needs materials, packing and dispatch.

### Question six

How much time can you give the business each week?

- Under 5 hours.
- 5 to 10 hours.
- 10 to 20 hours.
- More than 20 hours.

Show operating trade-offs. A short availability answer should favour simpler experiments and manageable fulfilment rather than imply that a low-time business runs itself.

### Question seven

Which operating demands would you prefer to avoid?

Allow multiple choices: fragile goods, large or heavy parcels, size and fit variants, expiry and controlled storage, electrical and battery products, specialist product checks, or none of these. Treat explicit exclusions as constraints when selecting results. Where a category contains very different variants, inspect the relevant subcategory instead of assuming that every example has identical needs.

### Question eight

Where would you prefer to explore selling?

- Amazon India, Flipkart or Meesho.
- Instagram or WhatsApp.
- My own online store.
- Handmade or creative international selling.
- I need help choosing.

Use this as a research preference. It must not imply that every product is eligible on the chosen destination. Display product-specific channel guidance only after the relevant rules, seller location and operating requirements have been checked.

## Recommendation logic

Use an inspectable matching system based on stored attributes and the visitor's selected answers. The page can run using the catalogue and a deterministic rules engine.

Proposed internal weights are capital orientation 25, department interest 20, business model 15, strengths 10, storage 10, weekly time 10 and channel preference 10. Explicit avoidances apply before ranking. The weights total 100 and are editorial priorities, not probabilities of sales or profit.

Remove skipped factors from the active denominator. Never invent an interest or skill for someone who selected No preference. Use capital orientation as a soft comparison until product-specific cost research exists. Do not turn an estimated budget label into an unsupported exact eligibility cutoff.

Apply clear incompatibilities before scoring: a digital-only preference cannot match an offer requiring stock; a visitor avoiding heavy parcels should not be recommended furniture or equipment requiring them; an avoided specialist requirement should not be silently ignored.

Use three to five results. Where possible, include no more than two from the same department, while preserving the constraints. Resolve ties consistently using stable category IDs. For each result, identify two or three actual matches, one relevant operating consideration and the first validation task.

Public labels can be “Strong alignment,” “Worth exploring” and “Needs more preparation.” Avoid “98 percent success,” “guaranteed profit,” “most profitable” or fabricated market-demand labels. If showing a fit percentage later, explain its computation and make clear what it measures. The first release should use text labels.

When nothing fits, show the constraints that removed ideas and offer to change them or browse the full catalogue. Never weaken a visitor's exclusions just to return a full results grid.

The present taxonomy supplies the content and provisional classification schema. Before publishing the quiz, normalise the strengths and department enums, validate all matching branches, and calibrate the capital, time and complexity classifications against the exact starter offers. The current JSON is a structured seed catalogue, not an implemented recommendation engine.

## Browse and filter route

Give the directory a search field matching category names, product subcategories, idea titles and synonyms. Display the number of matching categories and the active filters.

Use these initial filters:

| Filter | Visitor choice |
|---|---|
| Department | Any of the 15 departments |
| Product subcategory | Options within the selected category |
| Capital orientation | Lower, moderate, higher, or all |
| Way of working | Source and sell, make, personalise, original digital |
| Operating complexity | Simpler, guided, specialist, or all |
| Storage | No physical stock, small dedicated storage, larger space |
| Operating considerations | Avoid fragility, heavy parcels, sizing, expiry or electrical variants |
| Interests | Maker-led, office use, home use, gifting and other validated tags |
| Channel to research | Domestic marketplaces, direct social or store, creative international |

Cross-cutting theme tags such as gifting and office use need their own editorial tagging pass before the corresponding filter is enabled. Never show a filter that does not have populated attributes behind it.

Combine different filter groups using AND. Combine selected values inside a multi-select filter using OR unless the label explicitly promises “must support all.” Give avoidances their own exclusion logic. Offer Clear all. Changing a parent department must reset incompatible subcategory selections.

On mobile, use a filter sheet with an Apply filters action and a visible result count. Keep search above it. Preserve state when the visitor opens an idea and returns. Save shareable filter state in a readable URL query, while keeping personal answers and contact details out of the URL.

Useful sort choices are relevance, simpler operations and alphabetical. Do not introduce demand, sales, profitability or margin sorting without actual researched data and a defined methodology.

## Result cards and idea details

Each card should contain:

- A concrete business-idea title.
- Parent category and a few product directions.
- An intended customer and offer angle.
- Qualitative test-capital orientation and operating complexity.
- The relevant source, make or personalise route.
- One first validation action.
- Save, Compare and Explore actions.

For example:

Business idea: Compact-kitchen organisation kits.

Product directions: Spice jars, drawer organisers, storage containers and pantry labels.

Potential customer: Households with a small kitchen.

Offer angle: A measured-fit starter kit with clear dimensions and a simple setup guide.

First test: Obtain sample and packaging costs for one kit, check the fit in two small kitchens and gather feedback from five intended buyers.

Create a detail view with the offer, product examples, customer, model choices, likely operating work, what to verify and a short validation checklist. Let a visitor save up to three ideas for comparison. Compare capital orientation, physical space, product complexity, relevant skills and the next test. These should be stored facts or clearly labelled editorial assessments.

Avoid invented sales volumes, profit percentages, supplier vetting claims or automatic current marketplace approval badges. A mixed category such as jewellery needs a distinction between costume accessories and precious-metal products rather than one blanket capital and handling assessment.

## Conversion into Bonnza

Make the catalogue and results usable without registration. After the visitor saves or compares ideas, offer a relevant next step:

- Learn how to evaluate this idea.
- Build a launch plan.
- Explore the relevant recorded course.
- Join an upcoming beginner webinar.
- Get help reviewing the idea.

Reuse current website event and pricing configuration. Do not hardcode historical course prices, webinar dates or support terms into this page.

The optional shortlist form can collect name, email, preferred contact channel, selected ideas and language. Promotional consent is optional and distinct from delivery of a requested shortlist. The selected category, idea IDs, source and relevant answers can accompany an enquiry only when the visitor submits it.

A shortlist request must actually create or deliver the promised result before displaying confirmation. If delivery is unavailable, offer a browser download or copy action that works. A working local save or export is useful even before account integration.

## Content and administration

Keep departments, categories, product subcategories and ideas as separate records linked by stable IDs. The included JSON uses D01 to D15, C001 to C100 and I001 to I100. Subcategory IDs include their parent category.

The editor should be able to change titles, descriptions, tags, classifications, examples, validation steps and CTA targets. Use Draft, Review and Published content states. Keep an editor, review date and change reason for classification and channel guidance changes.

Production may require several ideas under a category. The current seed provides one per category so every directory branch has a concrete business angle. Additional ideas should vary by customer or offer rather than merely renaming the same category.

The initial dataset is English. Enable an English and Hindi interface after the Hindi labels, question wording and idea descriptions have been reviewed. Do not infer that a Hindi course recording automatically supplies a translated product catalogue.

## Search and indexing

Index the main overview and only those category pages that contain useful original information. Do not publish 500 thin pages just because 500 example subcategories exist. Filter combinations, saved quiz states and internal searches should not generate large numbers of indexable duplicates.

For a category page, provide its product directions, a concrete business example, likely customer, operational work, first test and the relevant learning link. Use ordinary language such as “ecommerce business ideas,” “online business ideas for beginners,” and “products to explore selling online” where relevant. The supplied keyword phrases are editorial suggestions without measured search volume.

## Measurement

Track the following event names with only useful non-sensitive properties: idea_finder_viewed, quiz_started, quiz_step_completed, quiz_completed, results_viewed, category_opened, filter_applied, idea_saved, comparison_opened, shortlist_requested and learning_cta_clicked.

Evaluate completion, result usefulness, repeated filter changes, zero-result frequency, saved ideas and relevant learning enquiries. A completed quiz alone is not a qualified sale. Avoid interpreting frequently viewed categories as proven profitable markets.

## Acceptance checks before integration

The content release must contain exactly 100 unique category IDs, 500 linked product-subcategory IDs and 100 linked starter ideas. Check the department totals, category references, search labels and empty fields.

The quiz must respect explicit avoidances, handle skipped interests, preserve answers when moving back, produce stable ties and explain zero matches. A digital-only visitor should not receive a physical-stock offer. A large-space category should not be labelled suitable for a shelf solely because an interest score is high.

Directory filters must use populated data, reset incompatible child selections and work with search. Save and compare should survive normal navigation. Keyboard and mobile users must be able to complete the questionnaire, edit an answer, clear filters and open the result details.

The final website check covers working CTA destinations, current event configuration, actual form submission, optional consent and real result delivery. This package defines content and behaviour. It has not modified or published the live Bonnza website.

## Official policy references

Reviewed 18 November 2026.

- Amazon India listing and approval guidance: https://sell.amazon.in/sell-online/list-your-products?lang=en-IN
- Amazon India category and product restrictions: https://sellercentral.amazon.in/gp/help/external/G200333160
- Etsy Creativity Standards: https://www.etsy.com/legal/creativity/
- Etsy Seller Policy: https://www.etsy.com/legal/sellers/
- Flipkart seller category context: https://seller.flipkart.com/sell-online

These references support the need for product-specific channel review. They do not independently validate every starter idea, capital orientation or operating classification in the catalogue.
