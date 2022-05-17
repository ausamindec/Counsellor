# Counsellor #

### Problem Statement ###
A lot of people are having problems with taking decisions in their life or with their career. So, build a portal where users can opt for counsellors and take sessions with them as required to them. 

### About The Counsellor ###
Counsellor is a demo web app build using MERN stack where user can book sessions with verfied counsellors and get counselling at very minimal rate.

### Deployed On ###
Counsellor is deployed on heroku platform and live at - 

## Live Deployment: 
### [Counsellor](https://app-counsellor.herokuapp.com/home)

## Link to Presentation
### [Counsellor Presentation](https://docs.google.com/presentation/d/1y21UwBR0CpOnyFues3zWWbgBE9zFDTXG3K9Wxq_dlrs/edit?usp=sharing)

## Walkthrough over the project:

### Booking Walkthrough

![Booking](./assets/booking_page.gif)

### Login Page Walkthrough

![Login](./assets/Login_page.gif)

### User Profiling Walkthrough

![UserProfile](./assets/user_profile.gif)

### Home Page

[HomePage](./assets/Home.png)


### Use Cases ###
1. User and Counsellors can create profile.
2. User and Counsellors can login.
3. User and Counsellor can update their profile details including their profile pic. 
4. Counsellor can list their sessions.
5. Counsellor can update and delete their sessions.
6. User can book session only on working days of the Counsellor.
7. User can pay the asked amount to book the session.
8. User can view and track their orders.
9. Counsellor can view and mark the booking as Completed/Pending/Cancelled.
10. User can add review.

Forgot password and change password are not implemented for app security reasons.

### Env Variables for Reference ###

1. JWT_SECRET(jwt secret key)
2. JWT_EXPIRY(eg-1d)
3. COOKIE_TOKEN_NAME(eg-token)
4. COOKIE_DAY(eg-1)
5. DB_URL(DB URL)
6. CLOUDINARY_NAME(Cloudinary name)
7. CLOUDINARY_API_KEY
8. CLOUDINARY_API_SECRET
9. RAZORPAY_SECRET
10. RAZORPAY_KEY

### Notable Dependancies ###
#### Frontend ####
* React
* React-router-dom
* Redux - Application State Manager
* MUI - For UI Stuffs
* Axios
* Formik - Handling Forms
* React-toastify

#### Backend ####
* bcryptjs - Encrypring Passwords
* cloudinary - Picture Uploads
* cookie-parser
* express
* jsonwebtoken - Handling JWT Tokens
* mongoose - Handling DB connection and requests
* morgan - Logger
* razorpay - Handling Payments
* swaggerui - Documenting Application


