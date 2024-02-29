Wireframes for the project: https://excalidraw.com/#room=16f58c084befeedacb6d,A-zp_S0qvTg88uBkVowsjA


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started  -  GigNite Landing Page Documentation

Welcome to GigNite! This documentation will guide you through the usage of our landing page, designed to provide users with an engaging experience and easy access to our platform's features.
Prerequisites

    Ensure you have Node.js installed on your system.
    Familiarity with React.js and Next.js frameworks is recommended.

Getting Started

    Clone the repository containing the GigNite project to your local machine.
    Navigate to the project directory in your terminal.
    Install dependencies by running npm install.
    Start the development server with npm run dev.

First, run the development server:
```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


##Landing Page Components

Navigation Buttons:
- Home Button: Takes users back to the home page.
- Sign In Button: Initiates the login process.
- Login Popup: Upon clicking the "Sign In" button, a popup appears for users to log in.
               Users can input their credentials and authorize access to their account.
               Upon successful login, users are redirected to their profile page.

User Authentication

    Users can log in using their credentials via the login popup.
    Upon successful login, a token is generated and stored locally using localStorage.
    Logging out removes the token from storage, effectively logging the user out.


##User Profile
GigNite User Profile Documentation

 This section of the documentation will guide you through the usage of the User Profile feature, which allows you to manage your events and access personalized content.
Prerequisites

    Ensure you have logged into GigNite using your credentials.
    Familiarity with React.js and Next.js frameworks is recommended.

Accessing Your Profile

    After logging in, the app switches to the profile page view.

Profile Components

    User Information: Displays your username.
    Navigation: Allows you to switch between different sections of your profile.
        Your Gigs: View and manage the events you have added.
        Interested: View events you have shown interest in.
        Add Event Button: Opens a form to add a new event.
        Home Button: Returns you to the home page.
        Logout Button: Logs you out of your GigNite account.

Your Gigs

    View a list of events you have added to GigNite.
    Each event is displayed with details such as name, city, date, time, venue, and price.
    You can remove events from your list by clicking the "Delete" button on each event card.
    Clicking on an event card allows you to edit its details.

Interested

    View events you have shown interest in.
    Additional functionality related to interested events is not implemented in this version.

Adding Events

    Click the "Add Event" button to open a form where you can add a new event.
    Enter event details such as name, city, date, time, venue, and price.
    Save the event by clicking the "Create event" button.
    The event will be added to your list of gigs.

## Event Form Components

    Basic Information: Enter details such as event name, date, and time.
    Location: Specify the event`s city, venue, country code, and postcode.
    Tickets: Provide information about ticket currency, price, and ticket link.
    Photo Upload: Upload an image related to the event.
    Time: Enter the events start time in HH:MM format.
    Submit Button: Click "Create Event" to add a new event or "Update Event" to modify an existing event(you may need to upload an event photo again in the updating process to successfuly submit an updated event).

Form Validation

    The form validates for missing values in all fields.
    If any field is empty, a warning message will be displayed, and submission will be prevented.

Uploading Event Photo

    Click the "Upload an Image" button to upload an image related to the event.
    Once the upload is complete, the photo will be displayed in the form.

Adding or Updating Events

    Fill out the form with the event details.
    Click the "Create Event" button to add a new event or "Update Event" to modify an existing event.
    Upon successful submission, a success message will be displayed, and the form will be reset.


Logout

    Clicking the "Sign Out" button will log you out of your GigNite account and redirect you to the login page.


## GigNite Homepage Documentation

This documentation provides a detailed overview of the features and functionalities available on the homepage.

1. Search Bar

    The search bar allows users to find events based on city names or their current location.
    The button below the search bar with the GigNite logo, when clicked, populates the map with the users location details and displays nearby events on the map.
    Users can input a city name manually or use the geolocation feature to automatically detect their current location.
    Search results are dynamically updated based on the entered query, providing real-time event suggestions.

2. Profile Button

    The profile button provides quick access to user profile where user can view, add, update and delete their own events and view the events they are interested in.
  
3. Event Listings

    The homepage displays a curated list of recommended gigs and events based on the users location and search parameters.
    Event listings include details such as event name, date, venue, and ticket information.
    Users can scroll through the event listings to explore different options or filter events based on specific criteria.

4. Interactive Map

    The interactive map feature allows users to visually explore event locations and details.
    Each event is represented by a marker on the map, providing a spatial overview of event distribution.
    Users can click on map markers to view detailed event information, including venue address, date, and ticket links.

5. Date Range Selector

    The date range selector enables users to filter events based on their start dates.
    Users can choose a specific date range to narrow down event listings and focus on upcoming events within a preferred time frame.
    Date range filtering helps users find events that align with their schedule and availability.

Troubleshooting

    If users encounter any issues or have questions about using the homepage features, they can refer to the project's documentation or contact the support team for assistance.
    Common troubleshooting steps may include checking internet connectivity, browser compatibility, and verifying account credentials.

