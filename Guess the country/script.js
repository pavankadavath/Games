document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    const options = Array.from(document.getElementsByClassName("option"));
    const result = document.getElementById("result");
    const startGameButton = document.getElementById("start-game");

    let correctOption;
    let data;
    async function fetchLogoData() {
        try {
            const response = await fetch('Api.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            data = await response.json();
            startGame();
        } catch (error) {
            console.error("Error fetching logo data:", error);
        }
    }

    function startGame() {
        const correctCountryData = data[Math.floor(Math.random() * data.length)];
        correctOption = correctCountryData.country;
        logo.src = correctCountryData.flag;
        const optionsCountries = [correctCountryData];

        while (optionsCountries.length < 4) {
            const randomCountryData = data[Math.floor(Math.random() * data.length)];
            if (!optionsCountries.some(option => option.country === randomCountryData.country)) {
                optionsCountries.push(randomCountryData);
            }
        }
        optionsCountries.sort(() => Math.random() - 0.5);

        options.forEach((option, index) => {
            option.textContent = optionsCountries[index].country;
            option.onclick = () => checkAnswer(optionsCountries[index].country,option);
        });
    }

    function checkAnswer(selectedOption,option) {
        if (selectedOption === correctOption) {
            result.textContent = `Correct! Answer is ${correctOption}`;
            result.style.color = "green";
            option.style.border='4px solid green'
        } else {
            result.textContent = `Wrong!Answer is ${correctOption}.`;
            result.style.color = "red";
            option.style.border='4px solid red'
        }

        setTimeout(() => {
            result.textContent = "";
            option.style.border='none'
            startGame();
        }, 3000);
    }

    startGameButton.addEventListener("click", fetchLogoData);
});
