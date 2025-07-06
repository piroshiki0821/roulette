const cells = document.querySelectorAll("#student-table td");

function getRandomColor() {
    return "#ffff99"; // 強調色（薄い黄色など）
}

function clearAll() {
    cells.forEach(cell => {
        cell.style.backgroundColor = '';
    });
}

function startRoulette(onFinish) {
    let index = 0;
    let totalRounds = 50 + Math.floor(Math.random() * 10); // 30〜40回回る
    let interval = 50; // スピード（ms）
    let count = 0;

    const spin = setInterval(() => {
        clearAll();
        cells[index].style.backgroundColor = getRandomColor();
        index = (index + Math.floor(Math.random() * 10)) % cells.length;
        count++;

        if (count >= totalRounds) {
            clearInterval(spin);
            clearAll();
            const finalIndex = (index - 1 + cells.length) % cells.length;
            cells[finalIndex].style.backgroundColor = '#ff9999'; // 最終色（赤）

            if(typeof onFinish === 'function'){
                onFinish(finalIndex);
            }
        }
    }, interval);
}

// ボタンクリック時のイベント設定
function callback(index) {
    const resultDiv = document.getElementById("winner");
    const selectedName = cells[index].textContent.trim();
    resultDiv.textContent = selectedName;

    document.getElementById("reloadBtn").style.display = "inline-block";


    fetch("/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: selectedName })
    })

    .then(response => response.json())
    .then(data => {
        console.log("サーバーからの応答:", data);
    });
}