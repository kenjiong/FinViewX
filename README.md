![FinViewXlogo](/public/colorlogo.svg)
---
# FinViewX - Your Finances in View

## Table of Contents

1. [Description](#description)
2. [Planning](#planning)
3. [Technologies](#technologies)
4. [Deployment](#deployment)
5. [App Interface](#app-interface)
6. [Future Developments](#future-developments)

---

## Description

Tired of trying to track your net worth using an Excel sheet? Don't want to surrender data to the banks by using their financial planner functionalities in their app? Look no further, because FinViewX is here! Keep track of your finances, save for rainy days and plan your retirement all in one place.

The name FinViewX was inspired by the meme of tech companies slapping "X" on every product they can find/create.

---

## Planning

- **Trello Board**: I listed out various user stories for the app on the [Trello board](https://trello.com/b/UQFs8dHH/finviewx). User stories are categorized as MVP and Icebox items. As progress was made, the completed user stories were moved to the completed section.

![Trello board](https://github.com/kenjiong/FinViewX/assets/129886906/0e571a6c-807c-433b-91a9-30382fb74afd)

- **Wireframe**: Based on the user stories, I created a [Figma wireframe](https://www.figma.com/file/Q0i9HxjLDia0S2mK8mZE9g/FinViewX?type=whiteboard&node-id=0-1&t=FaqslyV1DZclSZLi-0) to conceptualize the design of the website. The wireframe served as a guide for me to build my app and helped me to visualise the pages/components that I needed.

![Figma wireframe](https://github.com/kenjiong/FinViewX/assets/129886906/81cd7db6-cb66-4f4f-9791-bd0a5ec23c0b)

- **ERD**: I also drafted an [Entity Relationship Diagram](https://lucid.app/lucidchart/d2a32737-afe3-4a54-994d-375f7c107f04/edit?beaconFlowId=0BCB4CCEF62581CF&invitationId=inv_bf32efa2-d149-4903-903a-655e4710e08c&page=0_0#) for the relationships between the various models that are contained in the app.

![ERD](https://github.com/kenjiong/FinViewX/assets/129886906/becf1f8a-cffa-4e4f-9ecd-30570a9299f1)

---

## Technologies

- **Frontend**: ReactJS, react-daisyui
- **Backend**: Nodejs, Express, Mongoose
- **Database**: MongoDB
- **Other Technologies**: JWT, recharts, momentjs

---

## Deployment

Start your FinViewX journey [here](https://finviewx.onrender.com/).

---

## App Interface

### Landing Page

![Landing Page](https://github.com/kenjiong/FinViewX/assets/129886906/c571a4bb-6880-4afa-a355-4902bf5bfcbe)

### Auth Page

![Auth Page](https://github.com/kenjiong/FinViewX/assets/129886906/293fc388-fbb7-4423-a1e4-85aab4cb3a6a)

### Dashboard Page

![Dashboard Page](https://github.com/kenjiong/FinViewX/assets/129886906/526a69a3-5f23-4f01-90f4-c0e3e6cf8f46)

### Save Page

![Save Page](https://github.com/kenjiong/FinViewX/assets/129886906/65a88ad0-589d-4479-94f1-4d4e1cec7eb1)

### Retire Page

![Retire Page](https://github.com/kenjiong/FinViewX/assets/129886906/4bef66aa-22c7-4d5a-a5af-43b7b09f0730)

### Premium Subscription Page

![Premium Subscription Page](https://github.com/kenjiong/FinViewX/assets/129886906/a63d73bf-9941-4fa2-8506-7552fbfdd5b4)

---

## Future Developments

- **Sorting Assets/Liabilites**: Users will be able to sort their assets and liabilities under each type in either alphabetical order or by value.
- **Integration with SGFindex**: Users will be able to authorise through SingPass such that the app can obtain the users' financial info without having the users manually enter the info.
- **Subscription Payment**: Users will be directed to make payment if they want to subscribe for the premium features.
- **More Premium Features**: Users will be able to use the app to project the future values of their investments/properties.
- **More Robust Formulas**: CPF calculations will take into account more factors, like increased interest rates for the first 20k and the user's monthly income.

