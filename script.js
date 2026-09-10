/* =====================================================
   RCCG CITY OF PRAISE TEENS DEPARTMENT
===================================================== */


/* =====================================================
   LOADER
===================================================== */

const loader =
    document.getElementById("loader");


window.addEventListener(
    "load",
    function () {

        setTimeout(
            function () {

                if (loader) {

                    loader.classList.add("hide");

                }

            },
            400
        );

    }
);


/*
   Safety:
   the loading screen will disappear after
   2 seconds even if something goes wrong.
*/

setTimeout(
    function () {

        if (loader) {

            loader.classList.add("hide");

        }

    },
    2000
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.getElementById("menuButton");


const navMenu =
    document.getElementById("navMenu");


if (menuButton && navMenu) {


    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("open");

            const isOpen =
                navMenu.classList.contains("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}



/* =====================================================
   SCROLL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );


} else {


    revealElements.forEach(
        function (element) {

            element.classList.add("visible");

        }
    );

}



/* =====================================================
   FOOTER YEAR
===================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =====================================================
   CHECK-IN SYSTEM
===================================================== */

const STORAGE_KEY =
    "cityOfPraiseTeensCheckins";


const checkinForm =
    document.getElementById("checkinForm");


const recordsList =
    document.getElementById("recordsList");


const checkinMessage =
    document.getElementById("checkinMessage");


const clearRecords =
    document.getElementById("clearRecords");



/* ================= GET RECORDS ================= */

function getRecords() {

    try {

        return JSON.parse(
            localStorage.getItem(
                STORAGE_KEY
            ) || "[]"
        );

    } catch (error) {

        return [];

    }

}



/* ================= SAVE RECORDS ================= */

function saveRecords(records) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                records.slice(-30)
            )
        );

    } catch (error) {

        console.log(
            "Could not save check-ins."
        );

    }

}



/* ================= SECURITY ================= */

function escapeHTML(text) {

    return String(text).replace(
        /[&<>"']/g,
        function (character) {

            const characters = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return characters[character];

        }
    );

}



/* ================= DISPLAY RECORDS ================= */

function renderRecords() {

    if (!recordsList) return;


    const records =
        getRecords()
            .slice()
            .reverse();


    if (records.length === 0) {

        recordsList.innerHTML = `

            <p class="empty-records">

                No check-ins yet.
                Be the first!

            </p>

        `;

        return;

    }


    recordsList.innerHTML =
        records
            .map(
                function (record) {

                    const bible =
                        record.bible
                        ? "Bible ✓"
                        : "Bible —";


                    const prayer =
                        record.prayer
                        ? "Prayer ✓"
                        : "Prayer —";


                    return `

                        <div class="record">

                            <strong>
                                ${escapeHTML(record.name)}
                            </strong>

                            <span>
                                ${bible} · ${prayer}
                            </span>

                        </div>

                    `;

                }
            )
            .join("");

}



/* ================= SUBMIT CHECK-IN ================= */

if (checkinForm) {


    checkinForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("teenName")
                    .value
                    .trim();


            const bible =
                document
                    .getElementById("bibleCheck")
                    .checked;


            const prayer =
                document
                    .getElementById("prayerCheck")
                    .checked;


            if (!name) {

                return;

            }


            if (!bible && !prayer) {

                checkinMessage.textContent =
                    "Please tick at least one activity.";

                checkinMessage.style.color =
                    "#a26b00";

                return;

            }


            const records =
                getRecords();


            records.push({

                name: name,

                bible: bible,

                prayer: prayer,

                date:
                    new Date().toISOString()

            });


            saveRecords(records);


            renderRecords();


            checkinMessage.textContent =
                "Check-in saved successfully. Well done! 🙏";


            checkinMessage.style.color =
                "#145536";


            checkinForm.reset();

        }
    );

}



/* =====================================================
   CLEAR CHECK-INS
===================================================== */

if (clearRecords) {


    clearRecords.addEventListener(
        "click",
        function () {

            const answer =
                confirm(
                    "Clear all check-ins saved on this device?"
                );


            if (!answer) return;


            localStorage.removeItem(
                STORAGE_KEY
            );


            renderRecords();


            if (checkinMessage) {

                checkinMessage.textContent =
                    "Check-ins cleared.";

                checkinMessage.style.color =
                    "#d4af37";

            }

        }
    );

}


renderRecords();



/* =====================================================
   DANIEL GPT
===================================================== */

const chatForm =
    document.getElementById("chatForm");


const chatInput =
    document.getElementById("chatInput");


const chatArea =
    document.getElementById("chatArea");



/* ================= ADD MESSAGE ================= */

function addMessage(text, type) {

    if (!chatArea) return;


    const message =
        document.createElement("div");


    message.className =
        "chat-message " + type;


    const avatar =
        type === "user"
        ? "Y"
        : "D";


    const name =
        type === "user"
        ? "You"
        : "Daniel GPT";


    message.innerHTML = `

        <div class="chat-avatar">
            ${avatar}
        </div>

        <div class="chat-bubble">

            <strong>
                ${name}
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    chatArea.appendChild(message);


    chatArea.scrollTop =
        chatArea.scrollHeight;

}



/* ================= DANIEL RESPONSE ================= */

function getDanielResponse(question) {

    const q =
        question.toLowerCase();


    if (
        q.includes("pray") ||
        q.includes("prayer")
    ) {

        return (
            "Prayer is talking to God. " +
            "You can begin by thanking Him, " +
            "asking for His help and praying for other people."
        );

    }


    if (
        q.includes("bible") ||
        q.includes("scripture")
    ) {

        return (
            "A good place to start is the Gospel of John. " +
            "Read slowly and think about what the passage " +
            "teaches you about Jesus."
        );

    }


    if (
        q.includes("blessing")
    ) {

        return (
            "Our theme is BLESSING. " +
            "God wants us to grow in Him and also " +
            "become a blessing to other people."
        );

    }


    if (
        q.includes("hebrews") ||
        q.includes("13:8")
    ) {

        return (
            "Hebrews 13:8 reminds us that Jesus Christ " +
            "is the same yesterday, today and forever."
        );

    }


    if (
        q.includes("school") ||
        q.includes("exam") ||
        q.includes("study")
    ) {

        return (
            "Do your best, create a study plan, " +
            "pray for wisdom and ask a parent, teacher " +
            "or trusted adult when you need help."
        );

    }


    if (
        q.includes("god") ||
        q.includes("jesus")
    ) {

        return (
            "Keep learning about Jesus through the Bible, " +
            "prayer and fellowship with other believers."
        );

    }


    return (
        "That is a good question. " +
        "Think about it prayerfully, check what the Bible says " +
        "and speak with Pastor Kingsley, your parents or " +
        "another trusted Christian adult when you need guidance."
    );

}



/* ================= CHAT FORM ================= */

if (chatForm) {


    chatForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const question =
                chatInput.value.trim();


            if (!question) return;


            addMessage(
                question,
                "user"
            );


            chatInput.value = "";


            setTimeout(
                function () {

                    addMessage(
                        getDanielResponse(question),
                        "bot"
                    );

                },
                450
            );

        }
    );

}