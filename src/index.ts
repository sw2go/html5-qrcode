import "./css/main.css";
import {Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode"

const divResultZone: HTMLDivElement = document.querySelector("#resultZone");
const divScannedValue: HTMLDivElement = document.querySelector("#scannedValue");
const buttonResume: HTMLButtonElement = document.querySelector("#resumeButton");

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
  html5QrcodeScanner.pause(true);
  divScannedValue.innerText = `${decodedText}`;
  divResultZone.style.display = "flex";
}

function onScanFailure(error) {
  divResultZone.style.display = "none";
  divScannedValue.innerText = "";
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  //console.warn(`Code scan error = ${error}`);
}

divResultZone.style.display = "none";
buttonResume.onclick = () => {
  divResultZone.style.display = "none";
  html5QrcodeScanner.resume();
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: {width: 250, height: 250}, supportedScanTypes: [ Html5QrcodeScanType.SCAN_TYPE_CAMERA ] },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);


