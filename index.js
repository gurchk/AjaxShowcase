window.addEventListener('load', function (event) {
    const btn = document.getElementById('btn');


    btn.addEventListener('click', function () {
        let numberOfWords = document.getElementById('input');
        let numB = numberOfWords.value;
        const req = new XMLHttpRequest();
        const ulE = document.getElementById('log').firstElementChild;

        req.onreadystatechange = function (event) {
            console.log("readyState:" + req.readyState);
            console.log("status:" + req.status);
            console.log("responseText:" + req.responseText);
            if (req.readyState == 4) {
                let y = document.createElement('li');
                y.innerHTML = req.responseText;
                ulE.appendChild(y);
            }
        }
        req.open('GET', `http://mardby.se/AJK15G/lorem_text_random.php?numberOfWords=${numB}`);
        req.send();
    })
    // Bridge Data
    const bridge = document.getElementById('bridge');
    const bridgeReq = new XMLHttpRequest();
    bridgeReq.onreadystatechange = function (event) {
        if (bridgeReq.readyState === 4) {
            const bridgeText = JSON.parse(bridgeReq.responseText);
            const value = bridgeText.value;
            bridge.innerHTML = `Göta Älvbron är nuvarande: ${value == true ? "Öppen" : "Stängd"}`;

        }
    }
    bridgeReq.open('GET', `http://data.goteborg.se/BridgeService/v1.0/GetGABOpenedStatus/%7B806b123b-3475-450b-a9ce-3bb2588d1673%7D?format=json`);
    bridgeReq.send();

    // Camera Data

    const cameraLog = document.getElementById('cameraLog');
    const cameraReq = new XMLHttpRequest();
    cameraReq.onreadystatechange = function (event) {
        if (cameraReq.readyState === 4) {
            const cameras = cameraReq.responseText;
            const fixed = JSON.parse(cameras);
            cameraLog.innerHTML += `Antal aktiva kameror: ${fixed.length} <br>`;
            let cameraNum = 0;
            for (let camera of fixed) {
                cameraNum++;
                const newElement = document.createElement('a');
                newElement.setAttribute('href', `http://data.goteborg.se/TrafficCamera/v0.2/CameraImage/%7B806b123b-3475-450b-a9ce-3bb2588d1673%7D/${cameraNum}`)
                newElement.innerHTML = `${camera.Description} ${camera.Lat}, ${camera.Long}<br>`;
                cameraLog.appendChild(newElement);
            }
        }
    }
    cameraReq.open('GET', "http://data.goteborg.se/TrafficCamera/v0.2/TrafficCameras/%7B806b123b-3475-450b-a9ce-3bb2588d1673%7D?format=json");
    cameraReq.send();



})
