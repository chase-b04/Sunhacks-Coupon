# ThriftyBite
#Inspiration

As college students on a tight budget, managing personal finances can be a constant struggle. Many of us face food insecurity, having to choose between buying groceries and saving money. Time constraints often lead to wasted food, and the biggest question is always: What should I cook today? In our research, we found that while 87.2% of U.S. households were food secure in 2022, millions still face food insecurity. That’s why we built ThriftyBite—a solution designed to make meal planning smarter, affordable, and waste-free.

#What It Does
ThriftyBite helps users maximize savings while ensuring they stay nourished. The app:

Suggests recipes based on items users already have in their pantry, reducing waste. Optimizes grocery shopping by analyzing local retailer sales and promotions to offer the best deals in real-time. Allows users to filter recipes based on dietary preferences (vegetarian, vegan, gluten-free, etc.). Helps users generate shopping lists tailored to their household size, buying only what’s necessary.

#How We Built It
We developed ThriftyBite using a combination of:

HTML, CSS, and JavaScript for the frontend to create a responsive and user-friendly interface. Python and Flask for the backend, handling logic and API integrations. MySQL for managing and storing user data, recipes, and pantry information. Safeway API for real-time access to grocery deals and promotions. OpenAI API for recipe suggestions and smart meal planning based on user input and pantry data. RESTful APIs to communicate between frontend and backend services seamlessly.

#Challenges We Ran Into
Building ThriftyBite was a rewarding challenge. We faced:

Difficulties integrating multiple components—ranging from APIs to database management. The challenge of shortlisting essential features while keeping the app lightweight yet impactful. Understanding user needs and ensuring the app provides genuine solutions to issues like food insecurity and waste.

#Accomplishments That We're Proud Of
We are particularly proud of:

Successfully integrating several APIs, especially Safeway’s and OpenAI’s, to create a seamless experience. Creating a solution that can genuinely help people save money, reduce waste, and plan meals more effectively. Building a platform that addresses a real-world problem—food insecurity—and can scale to impact more people.

#What We Learned
Throughout the project, we learned:

That the market for a tool like ThriftyBite exists, as millions of people face food insecurity. The importance of efficient time management and prioritization when working on a project under time constraints. How powerful it can be to combine technology with real-world issues to create meaningful solutions.

#What's Next for ThriftyBite
Our vision for ThriftyBite includes:

Computer Vision integration to automatically track pantry items and expiry dates via barcode scanning or image recognition. Expanding inventory management features to include expiry tracking and smart restocking suggestions. Direct ordering from retailers within the app and scheduling deliveries for added convenience. Tracking nutritional information for each recipe, helping users maintain a balanced diet while saving money.


INSTALLATION
Clone the repository:


git clone https://github.com/chase-b04/Sunhacks-Coupon.git

Install dependencies:
pip install -r requirements.txt

Set up the MySQL database:
Create the database as per the schema provided in the backend.

Run the Flask backend:
python backend/app.py

Run the frontend:
Open index.html in a browser.
