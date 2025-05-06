# 🦉 Duolingo Keyboard Input Assistant (Puppeteer)

This project is a simple browser automation script designed to **enhance the Duolingo learning experience** for users who prefer typing over clicking tiles.

## ✨ Motivation

While Duolingo's tile-based exercises are great for beginners, I personally found that **typing out the translations using a physical keyboard** felt more natural and effective for reinforcing vocabulary and grammar. Since Duolingo doesn't offer this as a standard option for all exercise types, I built this tool to bridge that gap and tailor the learning process to my preferred style.

This project is a demonstration of how browser automation can be used to customize existing web applications for personal needs and preferences.

## 🖼️ Demo
![demo](https://github.com/user-attachments/assets/61bb24ce-e782-4953-81b5-78a77267af6b)



## ⚙️ How It Works

The script utilizes **Puppeteer.js** to control a headless (or headful) browser instance. It navigates to Duolingo, identifies the word tiles presented in exercises, and then **translates your keyboard input into the necessary clicks** on the corresponding tiles within the Duolingo interface.

Essentially, you type the answer, and the script automatically "clicks" the correct tiles for you in the right order.

## 🚀 Technologies Used

*   **Puppeteer.js:** The core library for browser automation and control.
*   **Node.js:** The runtime environment for executing the script.
