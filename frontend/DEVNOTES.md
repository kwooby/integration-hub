# DEVELOPER NOTES FOR INTEGRATION HUB API FRONTEND

----------

## 09/12/2026

COMPLETED:

    - FIXED FIND ORDER BUG!
        - Forgot to setOrder and setOrderItems properly oops
    - Add update shipment
        - Test OK
    - Add delete shipment
        - Test OK
    - Took off 'shipped at' for functionality purposes
        - Delivered at date is very long, putting both dates makes the frontend too long
    - Stylized shipments page

NEXT:

    MAJOR:
        - Begin CRUD for notifications page
    MINOR:
        - Add pagination for all resources features
        - Restylize Dashboard to align better with rest of pages

NOTES:
    - Should have done a couple separate commits between finishing the CRUD functionality on the shipments page and restyling the rest of the pages
    - Hesitant to do multiple commits per CRUD feature added, feels excessive with how quickly the features are typically implemented

## 09/10/2026

COMPLETED:
    - Add find shipment by ID
        - Tested OK
    - Add create shipment
        - Tested OK
    - Add find order to facilitate create shipment for order
        - Tested FAIL
        - Debugging:
            - Submit button not working
            - Terminal appears to get the data from the backend but does not apply it to the frontend
            - Likely something in the shipments jsx file (I'm thinking its the submit handle code)
            - Fever omg gotta go

NEXT:
    - Fix find order bug
    - Continue implementing CRUD functionality features to shipments page
    - Continue adapting similar structure and style to future pages
    - Add pagination to all [resources] features
        - Show most recent [resources], then add navigation and pagination for rest

NEXT:

## 09/08/2026

COMPLETED:

    -UPDATE PAYMENT BUG IS FIXED!
        - Issue was the set total amount for payment, which we changed to allow partial payments last work session
        - Syntax error in update payments SQL from working
    - Standardize style between orders and payments page

NEXT:

    - Begin CRUD for Shipments page
    - Add pagination to all [resource] sections on all pages
    - 

## 09/03/2026

COMPLETED:

    - CREATE PAYMENT BUG IS FIXED!!!
        - Transaction ID is now generated rather than manually added
        - Create payment only asks for amount, order ID and status for clarity
    - Add find order box to the create payments section to facilitate finding the order information (ID, amount)
    - Full Test Delete payment, working
    - Add PATCH/UPDATE in payments page
        - DOES NOT WORK, NEEDS DEBUG
        - 404, thinking its something to do with the payment ID not going through

NEXT:

    - FIX UPDATE PAYMENT BUG
    - Continue standardizing style across API
    - Commit frontend Payments CRUD features
    - Start CRUD features for Shipments
    - Add more pages for accessibility:
        - Users
        - Products (jsx is added for this one but there is nothing in it, just the ability to click on a blank screen)

## 09/01/2026

COMPLETED:

    - DELETE ORDER BUG IS FIXED!
        - It WAS the associated items!
        - Add delete order items to Delete Order, so associated records will delete with order on submit as long as the order status is 'Cancelled' or 'Completed'
    -  Add some CRUD features to Payments page
        - Get payment by ID WORKS
        - Delete payment WORKS
        - Create payment DOES NOT WORK

NEXT:

    - Fix update payment bug (debug notes in notebook)
    - Finish typing Devnotes
    - Standardize style between pages
    - Begin add CRUD for shipments page
    

## 08/31/2026

COMPLETED:

    - Add CRUD functionality and features to frontend Orders page
        - Get existing order by ID
        - Create new order
        - Edit/Update existing order
        - Delete existing order
    - DELETE refusing deletion on account of associated items (order items) attached to it
        -Will debug next session
    - Basic stylization of Orders page
        - Sections are okay, more readable
        - Not done with this but leaving for later with focus on implementing CRUD in rest of pages before fully committing to a style

NEXT:

    - DEBUG DELETE FEATURE ON ORDERS PAGE!!!!!
        - It is most certainly the associated items (order items) still being attached to the order itself
        - Speculating on the 'deletable status' function also stopping the order from being able to delete
        - Surface level tests still point to the associated items problem
    - Add CRUD functionality features to Payments page
        - GET<id>
        - POST
        - PATCH
        - DELETE
    - Continued advancement of frontend stylization

NOTES:
    - Eventually, we will want to make the 'all [resource]' sections to show chunks at a time rather than every [resource] possible
        - Perhaps 10 per page, with next and previous buttons as well as page numbers to facilitate navigation
    - Creating a payment is not streamlined, even despite it not fully working right now
        - Putting a 'find order' section near the create payments might help for clarity
        - Right now it's difficult to create a payment because switching back and forth throws the flow and accessibility off greatly
        - Even if it's just for reference to the order, I should have something tangible that can be interacted with and looked at while creating a payment for a specific order
    - We still need to fix the css for the Orders page, its all one column, probably not good

## 08/27/2026

COMPLETED:
    - Added React routes for Notifications page
        - Connected sidebar navigation
        - Styling from other pages is maintained
    - Added order lookup with order items to Orders page with GET/'id'
        - This is not stylized yet, but should maintain style consistency with rest of pages and especially the Orders page
        - Search by order number
        - Order lookup shows both order details and details of the item(s) ordered
        - If order does not exist, order error appears
        - If items exist in order, details of items will appear as well, otherwise item order error appears
    - Added bare basics of the Products page (just to make the Hub work for debug)

NEXT:
    - Add 'Create Order' with POST (Orders)
    - Add 'Edit Order' with PATCH (Orders)
    - Stylize find order table
    - Finish Products page skeleton

## 08/25/2026

COMPLETED:
    - Added React routes for Shipments and Payments pages
    - Connected sidebar navigation for both pages using Link
    - Kept consistent styling between all hub pages

NEXT:
    - Add Notifications page skeleton
        - Connect sidebar navigation
    - Add basic footer component
    - Connect /PATCH and /DELETE routes to Orders page
    - Continued styling of all pages

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
