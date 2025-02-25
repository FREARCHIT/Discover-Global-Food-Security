# Discover-Global-Food-Security
Global Food Security Index 2022 Visualization

This project is an interactive data visualization tool that presents the Global Food Security Index 2022. It provides insights into four key dimensions:

Affordability: Consumers’ ability to purchase food, vulnerability to price shocks, and support mechanisms during crises.
Availability: Agricultural production, on-farm capabilities, risks of supply disruption, and the national capacity to boost production.
Quality & Safety: The variety and nutritional quality of diets, alongside food safety standards.
Sustainability & Adaptation: A country’s exposure to climate change, natural resource risks, and how it adapts to these challenges.
The visualization is designed with university students and researchers in mind. It features a dynamic world map, interactive tooltips, a concise country data panel, and a detailed radar chart that updates as users interact with the map. Additionally, an explanatory section clarifies the significance of each dimension.

Demo
Introduction Page: The landing page (intro.html) features a real food image as background with a semi-transparent overlay that explains the project in an engaging manner.
Main Visualization Page: The main page (main.html) displays an interactive map (left) and a dynamically updating radar chart (right), along with a compact country data panel and an explanation section for each dimension.
Technologies Used
HTML5 & CSS3: For structure and styling.
JavaScript: Core logic and interactivity.
D3.js: Rendering the interactive world map.
Chart.js: Generating the radar chart visualization.
CSV & GeoJSON: Data formats for the Global Food Security Index dataset and geographical data

File Structure
graphql

project/
├── README.md                # This file
├── intro.html               # Introduction page with background image and project overview
├── main.html                # Main visualization page with map, country data panel, radar chart, and explanations
├── main.js                  # JavaScript code for D3 and Chart.js functionality
├── food.jpg                 # Background image for the intro page
└── data/
    ├── countries.geojson    # GeoJSON file containing country shapes
    └── Global-Food-Security-Index2022.csv  # CSV file with the Global Food Security Index data
How to Run
Clone the Repository:

bash
git clone <repository_url>
cd project
Open the Introduction Page:

Open intro.html in your web browser (e.g., by double-clicking the file or serving via a local web server).

Navigate Through the Site:

On the intro page, read the project overview and click the "Explore the Data" button to proceed.
On the main page, interact with the map by hovering and clicking on countries. The country data panel and radar chart will update accordingly.
Scroll down to the explanation section to read more about what each dimension measures.
Team Contributions
Yeqian He

Current Contributions:

Developed the core interactive map using D3.js.
Implemented data loading from GeoJSON and CSV files.
Created initial features such as tooltips and click events to update the country data panel.
Planned Contributions:

Enhance map interactivity with filtering and drill-down options.
Integrate additional datasets for a more comprehensive analysis.
Collaborate on additional visualization components to complement the map.

Jin Yang

Current Contributions:

Led iterative UI/UX improvements for the website.
Integrated and refined multiple visualization components including a dynamic radar chart (using Chart.js).
Redesigned the introduction page with a real food image background and a semi-transparent overlay.
Reorganized the country data panel for a more concise display (with icons) and restructured the main visualization layout.
Planned Contributions:

Further optimize UI/UX for better readability and engagement.
Explore and integrate alternative visualization techniques (e.g., violin charts) to enrich data presentation.
Develop an in-depth explanatory section for each of the four dimensions.
Continue refining the site’s interactivity and aesthetics based on user feedback.
Future Plans
UI/UX Enhancements:
Continue improving the overall design and interactivity. This includes further adjustments to the radar chart, additional animations, and more responsive layout tweaks.

Data Integration:
Incorporate additional datasets and possibly more granular data to enhance the analysis of global food security trends.

Additional Visualizations:
Explore other chart types (such as violin charts) to complement the radar chart and provide a multifaceted view of the data.

User Guidance:
Expand the explanatory section to offer a deeper understanding of each GFSI dimension and its relevance, ensuring the visualization not only displays data but also tells the underlying story.
