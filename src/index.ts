import "./css/main.css";
import {Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode"

const divResultZone: HTMLDivElement = document.querySelector("#resultZone");
const divScannedValue: HTMLDivElement = document.querySelector("#scannedValue");

let init = 0;

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  html5QrcodeScanner.pause(true);
  divScannedValue.innerText = `${decodedText}`;
  divResultZone.style.display = "flex";
}

function hideResult(ev: MouseEvent) {
  divResultZone.style.display = "none";
  if ((ev?.currentTarget as HTMLElement)?.id === "resumeButton") {
    html5QrcodeScanner.resume();
    console.log("resume");
  } else if (ev === null) {
    console.log("fail");
  } else {
    console.log("stop");
  }
}

function onScanFailure(error) {
  if (divResultZone.style.display === "flex") {
    divScannedValue.innerText = "";
    hideResult(null);
  }

  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  //console.warn(`Code scan error = ${error}`);
  if (!init) {
    init++;
    const buttonStop: HTMLButtonElement = document.querySelector("#html5-qrcode-button-camera-stop");
    buttonStop.addEventListener("click", hideResult);
    const buttonResume: HTMLButtonElement = document.querySelector("#resumeButton");
    buttonResume.addEventListener("click", hideResult);
  }
}



divResultZone.style.display = "none";
let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 600, height: 500}, supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ] },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


