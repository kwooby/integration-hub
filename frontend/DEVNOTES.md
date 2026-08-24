# DEVELOPER NOTES FOR INTEGRATION HUB API FRONTEND

----------

## 08/24/2026

COMPLETED:

    REACT ROUTER AND PAGES:

    - Added React Router to handle navigation between application pages
    - Added routes for the Dashboard and Orders pages
    - Connected Sidebar navigation to routes using `Link`
    - Kept shared layout components such as Header and Sidebar outside the routed pages
    - Removed the need for `MainContent` to directly render the Dashboard

    ORDERS PAGE:

    - Created the Orders page and connected it to the Flask `/orders` endpoint
    - Added loading and error state handling
    - Displayed orders in a table
    - Added an empty-state message when no orders are available
    - Used a copied array (`[...orders]`) before reversing orders to avoid mutating React state

TROUBLESHOOTING:

    - Fixed React Router import/path issues
    - Fixed Python backend startup by running the Flask application as a module
    - Practiced reading Vite and browser console errors to identify import and runtime issues
    - Deleted 'MainContent.jsx' and 'MainContent.css' in preference of importing Dashboard directly
        - MainContent was basically just a container for the dashboard, creating multiple dashboards
        - This was confusing and MainContent did not have anything that Dashboard didn't already have
        - Therefore, deleting felt warranted

NEXT:
    - Add the skeletons: Payments and Shipments page
        - Connect sideBar navigation to pages
    - Add basic footer component to balance page
    - Connect /PATCH and /DELETE routes to Orders page
    - Continued styling of all pages

## 08/18/2026

COMPLETED:
    -Continued development of the Integration Hub React frontend.
    -Connected the Dashboard to the Flask backend API.
        -Fetches Orders, Payments, Shipments, and Notifications data.
        -Consolidated dashboard requests into a single useEffect.
        -Used Promise.all() to handle multiple API requests concurrently.
    -Added basic dashboard loading and error handling.
        -Added loading state while API requests are in progress.
        -Added error state for failed requests.
        -Added HTTP response validation using response.ok.
        -Added console error logging for debugging.
    -Added Recent Orders dashboard section.
        -Displays the 5 most recent orders.
        -Reverses the returned data so the newest records appear first.
        -Dynamically renders order rows using .map().
        -Added a "No recent orders" empty state.
    -Added Recent Notifications dashboard section.
        -Displays the 5 most recent notifications.
        -Dynamically renders notification rows using .map().
        -Displays N/A when a notification does not have a sent_at value.
        -Added a "No recent notifications" empty state.
    -Improved dashboard table styling.
        -Prevented table content from wrapping unnecessarily.
        -Reworked table spacing and sizing for better readability.
        -Centered empty-state messages using colSpan.
    -Reviewed React concepts including:
        -Array .map()
        -React key props
        -Conditional rendering
        -Ternary operators
        -async / await
        -Promise.all()
        -Response JSON parsing
    -Tested the Dashboard with live backend data and verified basic loading/error behavior.

NEXT:
    -Continue building out the remaining Integration Hub frontend resource pages.
    -Further refine dashboard styling based on real data.
    -Test dashboard behavior with different API/data states.

## 08/17/2026

----------

COMPLETED:
    -Finalized the basic stylized layout for the Integration Hub frontend.
        -Settled on green as the overall application color theme.
        -Completed the initial dashboard styling and visual structure.
    -Began connecting the React frontend to the Flask backend API.
        -Configured CORS to allow the React development server to communicate with the Flask API.
        -Connected the Dashboard to the /orders endpoint using JavaScript fetch().
        -Successfully retrieved seeded PostgreSQL order data through the Flask API.
    -Added React state management for API data.
        -Used useState() to store orders, payments, shipments, and notifications.
        -Used useEffect() to perform API requests when the Dashboard loads.
    -Connected backend data to the Dashboard stat cards.
        -Calculated resource totals using JavaScript .length.
        -Replaced static values with dynamically retrieved API data.
        -Verified that the stat cards display the actual data stored in PostgreSQL.
    -Improved understanding of the React data flow:
        -PostgreSQL → Flask API → fetch() → React state → JavaScript calculations → JSX/UI.
    -Reviewed React component organization and began establishing a consistent structure for -state, effects, calculations, and UI logic.

NEXT:
    -Connect the remaining Dashboard data to their respective API endpoints.
    -Begin displaying individual order information in the Dashboard.
    -Continue replacing static/placeholder Dashboard content with live API data.

## 08/14/2026

----------

COMPLETED:
    -Fixed layout being scrollable.
        -App.css now has body ruleset for overflow: hidden.
    -Continued making the dashboard layout cohesive.
        -This would be the landing page, people would open it to this exact page.
        -Color change.
            -Trying browns and yellows in combination. Going to sit on it and look tomorrow to see if I still like it.
            -Honestly I already like the green better but we can still sit on it and see.
            -Looks like coffee right now. Looks okay.
        -Since the overflow:hidden now prevents overflow to become scrollable, height on both sidebar and dashboard components is now 100vh.
        -Dashboard fits very nicely on the screen.
    -Sidebar navigation buttons are now clickable.
        -They are mapped with temporary names same as their own.

NEXT:
    -Finish dashboard styling.
        -Polish dashboard tables.
        -Follow similar style to rest of application.
        -Prepare for the stat cards to take backend data.
    -Finish preparing Dashboard for backend connection.
    -Configure open local host frontend to F6.
        -Much later, since we're working in the directory we need, this isn't as necessary as the backend configuration.
        -This would moreso be for other developers, and giving them the option to open the localhost for both ends easily.

## 08/13/2026

----------

COMPLETED:
    -Continued development of the Integration Hub React frontend.
    -Reviewed React component structure and responsibilities.
    -Continued building the application layout using Navbar, Sidebar, MainContent, and Dashboard.
    -Added and organized CSS for the Dashboard and Sidebar.
    -Built initial Dashboard layout.
        -Added Dashboard header and overview text.
        -Added placeholder sections for recent orders and notifications.
        -Added tables for displaying order and notification information.
    -Added four planned Dashboard stat cards:
        -Orders
        -Payments
        -Shipments
        -Notifications.
    -Styled the Sidebar navigation and removed default list indentation.
    -Troubleshot Dashboard and Sidebar sizing and layout behavior.
    -Confirmed the global index.css includes universal box-sizing and body reset styles.
    -Began refining the Dashboard toward a responsive application layout rather than relying entirely on fixed dimensions.
    -Created new full-stack README file.
        -Moved backend README into backend folder so it's still accessible.

NEXT:
    -Finish Dashboard and Sidebar styling.
    -Continue refining responsive layout and spacing.
        -app.jsx/css is somehow making app wider vertically.
        -Probably shouldn't be scrollable at this stage?
    -Polish stat cards and Dashboard tables.
    -Establish a consistent visual style across the frontend.
        -So far looking good, green as a motif feels fine.
        -Don't overcomplicate it, it should feel and look easy to use.
    -Begin preparing the Dashboard for Integration Hub API data once the frontend styling is finalized.
    -Configure frontend open local host to F6.

## 08/11/2026

----------

COMPLETED:
    -Initialized the React frontend using Vite.
    -Configured the project with JavaScript and ESLint.
    -Confirmed the React development server runs successfully with npm run dev.
    -Removed the default Vite starter/demo code and assets.
    -Cleaned the global index.css and established a basic CSS foundation.
    -Created the initial React component structure:
        -Navbar.jsx
        -Sidebar.jsx
        -MainContent.jsx
    -Created the initial pages/ directory.
    -Created Dashboard.jsx as the first application page.
    -Connected Dashboard → MainContent → App.
    -Established the initial component hierarchy for the Integration Hub.

NEXT:
    -Build the overall Navbar/Sidebar/MainContent layout with CSS.
    -Improve the visual styling of the application shell.
    -Introduce routing for Dashboard, Users, Orders, Payments, Shipments, and Notifications.
    -Begin connecting React components to the existing Flask API.
