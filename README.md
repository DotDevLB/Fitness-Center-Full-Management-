# Fitness Center Management System

## Overview

The Fitness Center Management System is an all-in-one solution designed to enhance the operational efficiency of fitness centers and sports facilities. This sophisticated application integrates multiple critical functions, including sales transactions at kiosks, managing pitch reservations, organizing sports leagues, overseeing gym memberships, and facilitating direct user interactions through a self-service portal. With role-based access control, the system ensures that super admins have overarching control for strategic management, while admins handle the day-to-day operations.

## Features

### Admin and Super Admin Dashboard

- **Super Admin Functions:**
  - **Pitch Management:** Super admins can add new sports pitches, edit existing pitch details, and remove pitches that are no longer in use. This ensures that the facility's offerings are always up-to-date.
  - **Admin Management:** Super admins have the authority to create new admin accounts, assign specific roles and permissions, and revoke access when necessary, ensuring secure and efficient management of the facility.
  - **Analytics and Reporting:** Access to comprehensive analytics tools allows super admins to monitor facility usage, financial performance, and other key metrics, aiding in informed decision-making.

- **Admin Functions:**
  - Admins, under the guidance of super admins, manage day-to-day activities such as updating pitch schedules, processing transactions, and interacting with customers to ensure smooth operations.

### Point of Sale (POS) System

- The POS system offers a user-friendly interface for processing transactions at kiosks within the fitness center. It supports sales of products and services, manages customer payments, and tracks inventory levels in real-time to prevent stockouts.
  
#### Screenshots
- POS Interface:  ![Screenshot 2024-02-23 234505](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/c726bb7e-b74b-4721-9398-617ef8dc02b3)

- Inventory Management: ![Screenshot 2024-02-23 234325](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/4947bffb-8b55-4c48-a170-92ae9c4c7483)


### Pitch Reservation System
- ** Self-Service Reservations:** Through an interactive map, customers can view available pitches, select their preferred time slots, and book directly, enhancing customer experience and autonomy.
- **Staff-Assisted Reservations:** Enables staff to book pitches on behalf of customers, streamlining the reservation process for events and casual play.
- 
#### Screenshots
![Screenshot 2024-02-23 234427](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/489f6d84-4ba5-4814-9034-8d8b401c982b)

![Screenshot 2024-02-23 234416](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/ffbabc56-a4dd-4467-80b3-6a11517d7207)


![User Reservation](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/b5189739-a3df-46c0-80ab-709cd26d35a1)






### Sports League Management

- This module simplifies the organization of sports leagues, handling team registrations, scheduling matches, tracking scores, and publicly announcing winners. It fosters community engagement and competitive spirit within the facility.
#### Screenshots
- League Management Interface: ![League Management Interface](URL_of_screenshot_here)
- League Standings: ![League Standings](URL_of_screenshot_here)

### Gym Membership System

- Comprehensive management of gym memberships allows for seamless sign-ups, renewals, and cancellations. Automated email notifications are sent to members before their subscription ends, ensuring continuous engagement and retention.

#### Screenshots
- Membership Management:![Screenshot 2024-02-23 234443](https://github.com/DotDevLB/Fitness-Center-Full-Management-/assets/161202454/5473abbd-eccc-4c53-8dfa-2fc5c496c2b7)


## Installation

```bash
git clone https://github.com/joe-hadchity/FitnessCenterFullManagement.git
cd fitness-center-app
npm install
npm start
