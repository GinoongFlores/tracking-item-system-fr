<!--# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
 --> 

>[!TIP]
> Read my weekly journal about my progress at my [hashnode blog](https://ginooongflores.hashnode.dev/internship-journal).

# Project Title 📛

**Item Tracker - Fligno**

# About the Project 📚

## Overview

The **Item Tracker Project** is an internship initiative designed to address the company's need for efficient and accurate tracking and transferring of items between various entities within the organization. This system is aimed at streamlining the process, ensuring accountability, and providing transparency in the transfer operations.

## Purpose

The primary goal of this project is to create a Minimum Viable Product (MVP) that facilitates the seamless transfer of items from one company to another within the organization. The system ensures that all item transfers are properly documented and tracked, providing vital information about the sender, receiver, and the items being transferred.

## Features

The MVP of the Item Tracker Project includes the following key features:

- **Item Transfer**: Enable users to initiate and complete the transfer of items between different companies within the organization.
- **Transfer Receipts**: Generate a detailed receipt for each transfer, including:
    - **Sender Information**: Details of the company or individual initiating the transfer.
    - **Receiver Information**: Details of the company or individual receiving the item.
    - **Item Details**: Description, quantity, and other relevant information about the items being transferred.
- **Tracking and Logging**: Maintain a comprehensive log of all item transfers, allowing for easy tracking and auditing of the movement of items.

## Benefits

By implementing the Item Tracker Project, the company will benefit from:

- **Improved Efficiency**: Streamlined transfer processes reduce the time and effort required to move items between companies.
- **Enhanced Accountability**: Clear documentation of each transfer ensures that all parties are accountable for the items they handle.
- **Increased Transparency**: Detailed receipts and transfer logs provide transparency, making it easier to track and verify item movements.

# Screenshots 📷

|                                              |                                          |                                          |
| -------------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ![](https://i.imgur.com/FlAkEbE.png)<br><br> | ![](https://i.imgur.com/7OnuAlb.png)<br> | ![](https://i.imgur.com/Jpuw0X2.png)<br> |
| ![](https://i.imgur.com/ekAZDSK.png)<br>     | ![](https://i.imgur.com/8yFI0Uj.png)<br> | ![](https://i.imgur.com/qs6sZFE.png)<br> |


# Setup/Installation 💻
>[!NOTE]
>Ensure you have Node.js and npm installed on your machine. Back-end repo is separated on https://github.com/GinoongFlores/tracking-item-system

1. Clone this repositor
   `git clone <https> or <ssh>`
   `cd tracking-item-system-fr`
2. Install dependencies
   - using npm
     `npm install`
   - using yarn
     `yarn install`
3. Start the Development Server
   - using npm
     `npm run dev`
   - using yarn 
     `yarn dev`
4. Build for Production
   - using npm
     `npm run build`
   - using yarn
     `yarn build`
5. Preview the Production Build 
   - using npm
     `npm run preview`
   - using yarn
     `yarn preview`

# Technology ☕️ ⚛️
- [ReactJs](https://react.dev/) with [vite](https://vitejs.dev/guide/) (front-end)
- [Laravel PHP](https://laravel.com/) (back-end)

# Workflow ♾️
## Fligno -> Erudite

### Fligno 
- lor@email.com (user/sender)
- cha@email.com (admin/approver)
### Erudite
- rain@email.com (user/receiver)
- yen@email.com  (admin/approver)

## Creating an account
1. Sign up/Register
2. Wait for super admin activation & role attachement

## Sending an Item (sender) 
1. User add Item (if none)
2. fill transaction form (item, description, message, receiver's name & address) 

## Receiving an Item (receiver)
Sender admin -> Approved -> Delivered -> Receiver can receive

# Enhancement 🛠️
## Item 
- Avoid item duplication between admin within the same company
- Select card of items for multiple items use case
## Admin 
- Admin can enable/disable their respective users
## Authentication
- Email verification
  
# Status 📶
Accomplished MVP, yet unfinished the web version layout and enhancements.  



